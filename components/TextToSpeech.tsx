import React, {useEffect, useState} from 'react';
import {Button, View, Text, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/Entypo';

// Path to your Google Cloud service account key
const GOOGLE_CLOUD_TTS_API_KEY = 'AIzaSyBWgNJNbd8ZotSbPpkz4XLvhyL4QXzWdNA';

interface TTSProps {
  data: {
    text: string;
    isAiGenerated: boolean;
    isDisabled: boolean;
    handleGenerate: Function | null;
  };
}

const TextToSpeech = ({data}: TTSProps) => {
  const [text, setText] = useState('');
  useEffect(() => {
    setText(data.text);
  }, [data]);

  useEffect(() => {
    if (
      text !== undefined &&
      text !== '' &&
      text !== null &&
      data.isAiGenerated === true
    )
      handleTTSRequest();
  }, [text]);

  const [audioPath, setAudioPath] = useState<string | null>(null);

  const handleTTSRequest = async () => {
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_CLOUD_TTS_API_KEY}`;

    const requestBody = {
      input: {
        text: text, // Input text
      },
      voice: {
        languageCode: 'sr-RS', // Serbian language
        name: 'sr-RS-Standard-A', // Specific voice
      },
      audioConfig: {
        audioEncoding: 'MP3', // MP3 format
        effectsProfileId: ['small-bluetooth-speaker-class-device'], // Optional audio effects
        pitch: 0, // Default pitch
        speakingRate: 1, // Default speaking rate
      },
    };

    try {
      // Send request to Google Cloud TTS API

      const response = await axios.post(url, requestBody);
      const audioContent = response.data.audioContent;

      if (audioContent) {
        console.log('uslo u if audio content');
        const audioPath = `${RNFS.DocumentDirectoryPath}/output.mp3`;

        // Save the audio file to local storage
        await RNFS.writeFile(audioPath, audioContent, 'base64');
        setAudioPath(audioPath);

        // Play the audio
        const sound = new Sound(audioPath, '', error => {
          if (error) {
            console.log('Failed to load sound', error);
            return;
          }
          sound.play(success => {
            if (!success) {
              console.log('Sound playback failed');
            }
          });
        });
      }
    } catch (error) {
      console.error('Error with TTS request:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        disabled={data.isDisabled}
        onPress={() => {
          if (data.handleGenerate === null) handleTTSRequest();
          else data.handleGenerate();
        }}
        style={[
          {
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 50,
            borderRadius: 1000,
          },
          data.isAiGenerated ? {backgroundColor: 'blue'} : {},
          data.isDisabled ? {opacity: 0.5} : {},
        ]}>
        <Icon name="controller-play" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default TextToSpeech;
