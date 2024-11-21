import {
  View,
  Text,
  Dimensions,
  FlatList,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  DeviceEventEmitter,
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
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardData from '../static/cardInterface';
import SettingsModal from '../components/SettingsModal';
import PasswordCreateModal from '../components/PasswordCreateModal';
import StaticTest from '../components/StaticTest';
import DropdownSort from '../components/DropdownSort';

export default function HomeScreen({navigation}: any) {
  const [customCards, setCustomCards] = useState<CardData[]>([]);
  const [commonCards, setCommonCards] = useState<CardData[]>([]);
  const [displayedCards, setDisplayedCards] = useState<CardData[]>([]);

  const [cardWidth, setCardWidth] = useState<number>(100);
  const [gridLayoutWH, setGridLayoutWH] = useState<number>(3);
  const [gridSize, setGridSize] = useState<any>('3');

  const [streamType, setStreamType] = useState<any>('1');
  const [streamClickedIcons, setStreamClickedIcons] = useState<CardData[]>([]);

  const [inputString, setInputString] = useState('');
  const [response, setResponse] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [isCardsLoading, setIsCardsLoading] = useState(true);
  const [cardsError, setCardsError] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const [safeModeData, setSafeModeData] = useState('');
  const [screenRequested, setScreenRequested] = useState('');
  const [cardClicked, setCardClicked] = useState<CardData>();

  useEffect(() => {
    setCardWidth(gridLayoutWH / Number(gridSize));
  }, [gridSize, gridLayoutWH]);

  useEffect(() => {
    // Emit the setState function to make it accessible in SettingsScreen
    DeviceEventEmitter.addListener('event.testEvent', eventData => {
      navigation.navigate('HomeScreen');
      setGridSize(eventData);
    });
  }, []);

  useEffect(() => {
    // Define a function to fetch user UID and set up Firestore listener
    const fetchAndSubscribe = async () => {
      try {
        // Get the stored user data
        const storedUser = await AsyncStorage.getItem('user');
        const storedSafeModeData = await AsyncStorage.getItem('safeModeData');

        // this is being set if i need it to popup for dev purpose
        // await AsyncStorage.setItem('safeModeData', '');
        if (!storedSafeModeData) {
          setPasswordModalVisible(true);
        } else {
          setSafeModeData(storedSafeModeData);
        }

        if (!storedUser) {
          setCardsError('No user found in storage');
          setIsCardsLoading(false);
          return;
        }

        console.log('passowrd storedData', storedSafeModeData);

        const user = JSON.parse(storedUser);
        const uid = user.uid;

        // Set up Firestore listener to get documents with matching UID
        const unsubscribe = firestore()
          .collection('CustomCard')
          .where('uid', '==', uid)
          .onSnapshot(
            querySnapshot => {
              const cardsArray: CardData[] = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                  id: data.id || 0,
                  uid: data.uid || '',
                  backgroundColor: data.backgroundColor || 'white',
                  text: data.text || '',
                  title: data.title || '',
                  image: data.image || '',
                  width: data.width || 100,
                  category: data.category || '',
                };
              });

              setCustomCards(cardsArray); // Update state with new data
              setIsCardsLoading(false); // Mark loading as complete
            },
            error => {
              console.error('Error fetching real-time data: ', error);
              setCardsError('Error fetching real-time data');
              setIsCardsLoading(false);
            },
          );

        // Unsubscribe from listener when component unmounts
        return unsubscribe;
      } catch (error) {
        console.error('Error retrieving user or setting up listener:', error);
        setCardsError('Error retrieving user or setting up listener');
        setIsCardsLoading(false);
      }
    };

    // Call the async function
    const unsubscribePromise = fetchAndSubscribe();

    // Clean up listener on component unmount
    return () => {
      unsubscribePromise.then(unsubscribe => {
        if (unsubscribe) {
          unsubscribe();
        }
      });
    };
  }, []);

  useEffect(() => {
    // Define a function to fetch user UID and set up Firestore listener
    const fetchAndSubscribe = async () => {
      try {
        // Get the stored user data
        const storedUser = await AsyncStorage.getItem('user');
        const storedSafeModeData = await AsyncStorage.getItem('safeModeData');

        // this is being set if i need it to popup for dev purpose
        // await AsyncStorage.setItem('safeModeData', '');

        if (!storedUser) {
          setCardsError('No user found in storage');
          setIsCardsLoading(false);
          return;
        }

        console.log('passowrd storedData', storedSafeModeData);

        const user = JSON.parse(storedUser);
        const uid = user.uid;

        // Set up Firestore listener to get documents with matching UID
        const unsubscribe = firestore()
          .collection('CommonCard')
          .onSnapshot(
            querySnapshot => {
              const cardsArray: CardData[] = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                  id: data.id || 0,
                  uid: data.uid || '',
                  backgroundColor: data.backgroundColor || 'white',
                  text: data.text || '',
                  title: data.title || '',
                  image: data.image || '',
                  width: data.width || 100,
                  category: data.category || '',
                };
              });

              setCommonCards(cardsArray); // Update state with new data
              setIsCardsLoading(false); // Mark loading as complete
            },
            error => {
              console.error('Error fetching real-time data: ', error);
              setCardsError('Error fetching real-time data');
              setIsCardsLoading(false);
            },
          );

        // Unsubscribe from listener when component unmounts
        return unsubscribe;
      } catch (error) {
        console.error('Error retrieving user or setting up listener:', error);
        setCardsError('Error retrieving user or setting up listener');
        setIsCardsLoading(false);
      }
    };

    // Call the async function
    const unsubscribePromise = fetchAndSubscribe();

    // Clean up listener on component unmount
    return () => {
      unsubscribePromise.then(unsubscribe => {
        if (unsubscribe) {
          unsubscribe();
        }
      });
    };
  }, []);

  useEffect(() => {
    if (streamType === '1') {
      setDisplayedCards(customCards);
    } else if (streamType === '2') {
      setDisplayedCards(commonCards);
    } else if (streamType === '3') {
      setDisplayedCards(cardsData);
    }
  }, [streamType, customCards]);

  useEffect(() => {
    const concatenatedTexts = streamClickedIcons
      .map(icon => icon.text)
      .join(' ');
    setInputString(concatenatedTexts);
  }, [streamClickedIcons]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = (isAllowedAccess: string) => {
    setModalVisible(false);
    if (isAllowedAccess) {
      if (screenRequested === 'EditScreen') {
        navigation.navigate('EditScreen', {cardData: cardClicked});
      } else if (screenRequested === 'SettingsScreen') {
        navigateToSettings();
      }
    }
  };

  const openPasswordModal = () => {
    setPasswordModalVisible(true);
  };

  const closePasswordModal = () => {
    setPasswordModalVisible(false);
  };

  const navigateToSettings = () => {
    navigation.navigate('SettingsScreen');
  };

  const handleLongPress = async (item: CardData) => {
    setCardClicked(item);
    if (streamType === '1') {
      const storedSafeModeData = await AsyncStorage.getItem('safeModeData');
      if (!storedSafeModeData) {
        navigation.navigate('EditScreen', {cardData: item});
      } else {
        setScreenRequested('EditScreen');
        openModal();
      }
    }
  };

  const handleOpenSettings = async () => {
    const storedSafeModeData = await AsyncStorage.getItem('safeModeData');
    if (!storedSafeModeData) {
      navigateToSettings();
    } else {
      setScreenRequested('SettingsScreen');
      openModal();
    }
  };

  const deleteClickedIcon = (id: number) => {
    setStreamClickedIcons(prevIcons =>
      prevIcons.filter(icon => icon.id !== id),
    );
  };

  const handleIconPress = (item: CardData) => {
    setStreamClickedIcons(prevIcons => [...prevIcons, item]);

    const concatenatedTexts = streamClickedIcons
      .map(icon => icon.text)
      .join(' ');
    setInputString(concatenatedTexts);
  };

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

  // console.log('inputString: ', inputString);

  return (
    <SafeAreaView style={{flex: 1}}>
      <PasswordCreateModal
        visible={passwordModalVisible}
        onClose={closePasswordModal}
      />
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
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            width: '100%',
            flexDirection: 'row',
            gap: '10%',
          }}>
          <View
            style={{
              width: '45%',
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'gray',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            <View
              style={{
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <DropdownListType
                setStreamType={setStreamType}></DropdownListType>
            </View>
          </View>
          <View
            style={{
              width: '45%',
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'gray',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            <View
              style={{
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <DropdownSort
                setDisplayedCards={setDisplayedCards}
                displayedCards={displayedCards}></DropdownSort>
            </View>
          </View>
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
              // console.log(width, height);
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
                    {
                      handleLongPress(item);
                    }
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

        {/* <View>
          {loading ? (
            <Text style={{color: 'black'}}>Loading...</Text>
          ) : (
            <Text style={{color: 'black'}}>Response: {response}</Text>
          )}
        </View> */}
        {/* <StaticTest></StaticTest> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '90%',
            alignSelf: 'center',
            paddingVertical: 10,
          }}>
          <View style={{width: '10%'}}>
            <TextToSpeech
              data={{
                text: response!!,
                isAiGenerated: true,
                isDisabled: inputString === '' ? true : false,
                handleGenerate: handlePressGenerate,
              }}></TextToSpeech>
          </View>

          {/* grid size comment */}
          {/* <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '20%',
            }}>
            <DropdownComponentGrid
              setGridSize={setGridSize}></DropdownComponentGrid>
          </View> */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '80%',
            }}>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 1000,
                alignItems: 'center',
                width: '60%',
                borderColor: 'tomato',
                borderWidth: 1,
              }}
              onPress={handleOpenSettings}>
              <Text
                style={{
                  color: 'tomato',
                  fontStyle: 'italic',
                  textTransform: 'uppercase',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Open Settings
              </Text>
            </TouchableOpacity>

            <SettingsModal visible={modalVisible} onClose={closeModal} />
          </View>

          <View style={{alignItems: 'flex-end', width: '10%'}}>
            <TextToSpeech
              data={{
                text: inputString,
                isAiGenerated: false,
                isDisabled: inputString === '' ? true : false,
                handleGenerate: null,
              }}></TextToSpeech>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
