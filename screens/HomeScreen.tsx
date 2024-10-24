import {
  View,
  Text,
  Dimensions,
  FlatList,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import cardsData from '../static/cardData';
import Card from '../components/Card';
import DropdownComponentGrid from '../components/DropdownGrid';
import CardStream from '../components/CardStream';
import Icon from 'react-native-vector-icons/Entypo';
import {AiGeneratedPhrase} from '../functions/AiGeneratedPhrase';
import TextToSpeech from '../components/TextToSpeech';
import DropdownListType from '../components/DropdownListType';
import firestore from '@react-native-firebase/firestore';

interface Card {
  id: number;
  backgroundColor: string;
  text: string;
  title: string;
  image: string;
  width: number; // TODO: use this to change grid size
}

export default function HomeScreen({navigation}: any) {
  const [customCards, setCustomCards] = useState<Card[]>([]);
  const [displayedCards, setDisplayedCards] = useState<Card[]>([]);

  const [cardWidth, setCardWidth] = useState<number>(100);
  const [gridLayoutWH, setGridLayoutWH] = useState<number>(3);
  const [gridSize, setGridSize] = useState<any>('3');

  const [streamType, setStreamType] = useState<any>('1');
  const [streamClickedIcons, setStreamClickedIcons] = useState<Card[]>([]);

  const [inputString, setInputString] = useState('');
  const [response, setResponse] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const deleteClickedIcon = (id: number) => {
    setStreamClickedIcons(prevIcons =>
      prevIcons.filter(icon => icon.id !== id),
    );
  };

  useEffect(() => {
    setCardWidth(gridLayoutWH / Number(gridSize));
  }, [gridSize, gridLayoutWH]);

  useEffect(() => {
    // Set up real-time listener for the 'CustomCard' collection
    const unsubscribe = firestore()
      .collection('CustomCard')
      .onSnapshot(
        querySnapshot => {
          const cardsArray: Card[] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: data.id || 0,
              backgroundColor: data.backgroundColor || 'white',
              text: data.text || '',
              title: data.title || '',
              image: data.image || '',
              width: data.width || 100,
            };
          });

          setCustomCards(cardsArray); // Update state with new data
        },
        error => {
          console.error('Error fetching real-time data: ', error);
        },
      );

    // Unsubscribe from the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // const getCards = async () => {
    //   console.log('uslo u getCards');
    //   const querySnapshot = await firestore().collection('CustomCard').get();

    //   // Extract the data from each document
    //   const customCards: Card[] = querySnapshot.docs.map(doc => {
    //     const data = doc.data(); // Extract the document data
    //     return {
    //       id: data.id || 0, // Defaulting to 0 if no id exists
    //       backgroundColor: data.backgroundColor || 'white', // Defaulting to 'white'
    //       text: data.text || '',
    //       title: data.title || '',
    //       image: data.image || '',
    //       width: data.width || 100, // Default width if not provided
    //     };
    //   });

    //   // Now you can use the customCards array
    //   console.log('customCards: ', customCards);

    //   return customCards;
    // };

    if (streamType === '1') {
      setDisplayedCards(customCards);
    } else if (streamType === '2') {
      setDisplayedCards(cardsData);
    }
  }, [streamType, customCards]);

  const handleIconPress = (item: Card) => {
    setStreamClickedIcons(prevIcons => [...prevIcons, item]);

    const concatenatedTexts = streamClickedIcons
      .map(icon => icon.text)
      .join(' ');
    setInputString(concatenatedTexts);
  };

  useEffect(() => {
    const concatenatedTexts = streamClickedIcons
      .map(icon => icon.text)
      .join(' ');
    setInputString(concatenatedTexts);
  }, [streamClickedIcons]);

  console.log('inputString: ', inputString);

  const handlePressGenerate = async () => {
    setLoading(true); // Set loading to true while awaiting the response
    try {
      const result = await AiGeneratedPhrase(inputString);
      setResponse(result); // Update the state with the response from the AI
    } catch (error) {
      console.error('Error generating AI response:', error);
    }
    setLoading(false); // Set loading to false once the response is received
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <View>
          <CardStream
            data={{
              stream: streamClickedIcons,
              height: cardWidth,
              deleteClickedIcon: deleteClickedIcon,
              setIconArray: setStreamClickedIcons,
            }}></CardStream>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: Dimensions.get('window').width,
            flex: 1,
          }}
          onLayout={event => {
            const {x, y, width, height} = event.nativeEvent.layout;
            {
              console.log(width, height);
              setGridLayoutWH(width);
            }
          }}>
          {cardWidth && (
            <FlatList
              data={displayedCards} // Pass the cardsData array
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    handleIconPress(item);
                  }}
                  onLongPress={() => {
                    navigation.navigate('EditScreen', {cardData: item});
                  }}>
                  <Card data={{...item, width: cardWidth}}></Card>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              key={Number(gridSize)}
              numColumns={Number(gridSize)} // Use index as key
            />
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '90%',
            alignSelf: 'center',
            paddingVertical: 10,
          }}>
          <View>
            <TextToSpeech
              data={{
                text: response!!,
                isAiGenerated: true,
                isDisabled: inputString === '' ? true : false,
                handleGenerate: handlePressGenerate,
              }}></TextToSpeech>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '20%',
            }}>
            <DropdownComponentGrid
              setGridSize={setGridSize}></DropdownComponentGrid>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '30%',
            }}>
            <DropdownListType setStreamType={setStreamType}></DropdownListType>
          </View>

          <View style={{alignItems: 'flex-end'}}>
            <TextToSpeech
              data={{
                text: inputString,
                isAiGenerated: false,
                isDisabled: inputString === '' ? true : false,
                handleGenerate: null,
              }}></TextToSpeech>
          </View>
        </View>
        <View>
          {loading ? (
            <Text style={{color: 'black'}}>Loading...</Text>
          ) : (
            <Text style={{color: 'black'}}>Response: {response}</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
