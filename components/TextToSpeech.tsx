import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
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
            overflow: 'hidden',
          },
          data.isDisabled ? {opacity: 0.5} : {},
        ]}>
        {data.isAiGenerated ? (
          <ImageBackground
            source={{
              uri: 'data:image/jpeg;base64,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',
            }} // For remote images
            style={{
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="controller-play" size={30} color="#fff" />
          </ImageBackground>
        ) : (
          <Icon name="controller-play" size={30} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TextToSpeech;
