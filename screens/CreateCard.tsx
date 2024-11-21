import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Modal,
  Portal,
  Surface,
  TextInput,
} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import CardComponent from '../components/Card';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import colors from '../static/colorData';
import firestore from '@react-native-firebase/firestore';
import {collection, addDoc} from 'firebase/firestore';
import storage from '@react-native-firebase/storage';
import CardData from '../static/cardInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import aacCategoriesWithColors from '../static/categories';
import SettingsModal from '../components/SettingsModal';

const placeholderImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAAPFBMVEX///+rq6unp6fMzMykpKTp6enx8fHU1NS0tLS6urr6+vqwsLDHx8fPz8/w8PD19fXa2trh4eHl5eXAwMAzrysnAAADpklEQVR4nO2c2ZKDIBAAE6KJmsPr//91c69yKKREHav7dctl6YVhGJTdDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZqE5LMU1XbrvVupELUe9dO9t5PsFyZfuvY1FjWRL994GRnQeRs5NOj+rNpIVCzSMER2M6GBEByM6GNHBiI4cI+mhbdtLE12SFCO3XKnH36ryJnLDQoxU/xm2usZtWIaRWu1nUyLCSNnfh6moE0eEkYvqK4lavpBgpNA368ktYsMSjKSJbqSK2LAEI7VuRB0iNizBSGUYuURsWIIRc4zEXH8lGDkacSTm6YEEI7tMX2zKiA2LMFL185HAMJJWdcj2UIQRfZCEDJEyT5JkH7BcyzBSnrujJORY9r0BSPzXaxlGHv/pz5TJQoQUn4Mw5T1KhBi5x5LseUadnYJKRlcVPLLEGNkVt7qq0rASWtOZa7nno3KM/EB5/mGF2rSRvLdqe+Z1WzZy0Moq6ujz1IaNNJoQz1CyXSO9IPIeJD5ZyXaN6KXIJx6hZLNGKpuQ/Xl8A7BVI6nNx+MAbPTJjRopjAKCdyjZqJHWOmeeSsay+W0asQcRv1CySSM3t4/7IGmHH96ikW8JwKHkNPj0Fo3o2bvBYCiRayRt84u1a/WYkOHfK9bISam92lvW0qOZvRvzZqgwINXI+5zP0rd8dIgMHxwLNdI4+zYaRF643y6QaaT4nxlaxtXo538O3LJlGmk7fetlXKW9/ybuUCLSSC8l7WZchTt7N5S4QolEI1pK2sm4Tt5C7mPLEUoEGjH3tZ++OUoAjkHiKAwINGIWx86vHxTjmUhPib0wIM+IZV/7DpOhn/bZjyvEGbHOjGffQoLIG1thQJoRV3HsFhZEXqjWolyaEUdKqvLyl89hbYUBYUbcKWlYVP1i7p5lGfFOSb05G9JlGfHZ14ZhZiWijFwnF2IJJZKM1NP7eKCFEkFGLEfbk5D1sxJBRvz3tWFohQE5Rk6etaAflPQKA2KMpJFGyJNuYUCKkdJ1tD0JXfVSjFjfj5mMbigRYmToaHsSJf+FARlGftjXhvJ9j1GEEef7MdOhvu8xijASN4i8lXy+dJNgxPhOLw7vL80FGDnO4uN7FCbAyGx3xb0KA+s3cpntysnkGUpWb6Q8zcjjP7B6I7ODEZ1VGznfjrNzW7WRfbIA6zayFBjRWeWtxhU3X+vUi92Ofoh9CR0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMA2+AN7/TZH3Ls1kQAAAABJRU5ErkJggg==';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  surface: {
    padding: 8,
    marginBottom: 10,
    height: 80,
    backgroundColor: 'gray',
    width: (Dimensions.get('window').width * 6) / 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 20,
    flexDirection: 'row',
  },
  createButton: {
    height: 50,
    justifyContent: 'center',
  },

  cardPreview: {
    width: Dimensions.get('window').width,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  cardPreviewText: {
    color: 'gray',
    fontSize: 30,
    paddingBottom: 5,
    fontWeight: 'bold',
    fontStyle: 'italic',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },

  cardColorText: {
    color: 'gray',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },

  inputContainer: {
    width: (Dimensions.get('window').width * 6) / 8,
    // paddingBottom: 10,
  },

  colorsContainer: {
    width: Dimensions.get('window').width,
  },
});

export default function CreateCard({navigation}: any) {
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');

  const [colorIndex, setColorIndex] = useState(-1);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [cardCreationData, setCardCreationData] = useState<CardData>({
    id: 0,
    uid: '',
    backgroundColor: 'gray',
    text: 'New Card',
    title: 'New title',
    image: placeholderImage,
    width: 300,
    category: '',
  });

  const getSafeModeData = async () => {
    const storedSafeModeData = await AsyncStorage.getItem('safeModeData');
    if (storedSafeModeData) {
      openModal();
    } else {
      handleCreateCard();
    }
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = (isAllowedAccess: string) => {
    setModalVisible(false);
    if (isAllowedAccess) {
      handleCreateCard();
    }
  };

  const CreateCardImageless = async () => {
    setLoading(true);
    const newDocRef = firestore().collection('CustomCard').doc();

    const storedUser = await AsyncStorage.getItem('user');

    if (storedUser !== null) {
      await firestore()
        .collection('CustomCard') // Firestore collection name
        .add({
          ...cardCreationData,
          image: '',
          id: newDocRef.id,
          uid: JSON.parse(storedUser).uid,
        }) // Upload the card object
        .then(() => {
          console.log('CustomCard successfully added to Firestore!');
        })
        .catch(error => {
          console.error('Error adding card to collection:', error);
        })
        .finally(() => {
          setLoading(false);
          navigation.navigate('HomeScreen'); // End loading
        });
    } else {
      Alert.alert(
        'Error',
        'There was an issue adding the card without image.',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
      setLoading(false);
    }
  };

  const CreateCard = async () => {
    setLoading(true);

    const storedUser = await AsyncStorage.getItem('user');

    if (storedUser !== null) {
      const fileName = cardCreationData.image.substring(
        cardCreationData.image.lastIndexOf('/') + 1,
      );
      const storageRef = storage().ref(`images/${fileName}`);

      const task = storageRef.putFile(cardCreationData.image);

      // Monitor upload progress
      task.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });

      // Handle successful upload
      task
        .then(async () => {
          const downloadURL = await storageRef.getDownloadURL();
          console.log('Image uploaded to Firebase successfully:', downloadURL);

          // Set the image URL in the state after upload

          //Getting reference for the custom unique id
          const newDocRef = firestore().collection('CustomCard').doc();

          setCardCreationData(prevData => ({
            ...prevData,
            image: downloadURL,
          }));

          await firestore()
            .collection('CustomCard') // Firestore collection name
            .add({
              ...cardCreationData,
              image: downloadURL,
              id: newDocRef.id,
              uid: JSON.parse(storedUser).uid,
            }) // Upload the card object
            .then(() => {
              console.log('CustomCard successfully added to Firestore!');
            })
            .catch(error => {
              console.error('Error adding card to collection:', error);
            });
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        })
        .finally(() => {
          setLoading(false);
          navigation.navigate('HomeScreen'); // End loading
        });
    } else {
      Alert.alert('Error', 'There was an issue adding the card with image. ', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      setLoading(false);
    }
  };

  const handleCreateCard = () => {
    if (
      cardCreationData.image === undefined ||
      cardCreationData.image === '' ||
      cardCreationData.image === placeholderImage
    ) {
      Alert.alert(
        'Warning', // Title of the alert
        'You are about to create a card without a picture! Your text will be shown as a substitute.', // Message to display
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
          {
            text: 'OK',
            onPress: () => {
              CreateCardImageless();
            },
          },
        ],
      );
    } else {
      CreateCard();
    }
  };

  const handlePressGallery = () => {
    ImagePicker.openPicker({
      width: 1000,
      height: 1000,
      cropping: true,
    }).then(image => {
      console.log(image);
      setCardCreationData({...cardCreationData, image: String(image.path)});
    });
  };
  const handlePressCamera = () => {
    console.log('camera');
    ImagePicker.openCamera({
      width: 1000,
      height: 1000,
      cropping: true,
    }).then(image => {
      setCardCreationData({...cardCreationData, image: String(image.path)});
    });
  };

  return (
    <KeyboardAwareScrollView>
      <ScrollView>
        <SettingsModal visible={modalVisible} onClose={closeModal} />
        <View style={{flex: 1}}>
          <View style={styles.cardPreview}>
            <View style={{alignItems: 'center', marginVertical: 20}}>
              <Text style={styles.cardPreviewText}>New card preview:</Text>
              <CardComponent data={cardCreationData}></CardComponent>
            </View>
            <View
              style={{
                gap: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.inputContainer}>
                <TextInput
                  label="Card Title"
                  placeholder="Input your card text here..."
                  placeholderTextColor={'gray'}
                  selectionColor="red"
                  dense={true}
                  value={title}
                  onChangeText={title => {
                    setTitle(title);
                    setCardCreationData({...cardCreationData, title});
                  }}
                  mode="flat"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  label="Card Text"
                  placeholder="Input your card text here..."
                  placeholderTextColor={'gray'}
                  selectionColor="red"
                  dense={true}
                  value={text}
                  onChangeText={text => {
                    setText(text);
                    setCardCreationData({...cardCreationData, text});
                  }}
                  mode="flat"
                />
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {cardCreationData.image === '' ||
                cardCreationData.image === placeholderImage ? (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        handlePressGallery();
                      }}>
                      <View
                        style={[
                          styles.surface,
                          {
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: 'lightgray',
                          },
                        ]}>
                        <Icon name="picture" size={30} color="gray" />
                        <Text style={{color: 'gray'}}>
                          Choose image from gallery
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handlePressCamera();
                      }}>
                      <View
                        style={[styles.surface, {backgroundColor: 'tomato'}]}>
                        <Icon name="camerao" size={30} color="white" />
                        <Text style={{color: 'white'}}>
                          Take image from camera
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setCardCreationData({
                          ...cardCreationData,
                          image: placeholderImage,
                        });
                      }}>
                      <View
                        style={[
                          styles.surface,
                          {
                            backgroundColor: 'tomato',
                            height: 50,
                            justifyContent: 'center',
                            gap: 10,
                            alignItems: 'center',
                          },
                        ]}>
                        <Icon name="close" size={20} color="white" />
                        <Text style={{color: 'white', fontSize: 20}}>
                          Clear Image
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
                <View style={{marginTop: 20}}>
                  <Text style={styles.cardColorText}>
                    Choose card category and color
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.colorsContainer}>
            {aacCategoriesWithColors.map((category, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: '100%',
                    paddingVertical: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setColorIndex(index);
                      setCardCreationData({
                        ...cardCreationData,
                        backgroundColor: category.at(1)!!,
                        category: category.at(0)!!,
                      });
                    }}
                    style={{
                      width: (Dimensions.get('window').width * 6) / 8,
                      height: 50,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 20,
                        width: '80%',
                      }}>
                      <View
                        style={[
                          {
                            height: '90%',
                            aspectRatio: 1 / 1,
                            borderRadius: 1000,
                            backgroundColor: category[1],
                          },
                          colorIndex === index
                            ? {
                                borderWidth: 4,
                                borderColor: 'gray',
                                height: '100%',
                              }
                            : {},
                        ]}></View>
                      <View
                        style={{
                          height: 1,
                          width: 10,
                          backgroundColor: 'gray',
                        }}></View>
                      <View>
                        <Text
                          style={{
                            color: 'gray',
                            textTransform: 'uppercase',
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                          }}>
                          {category.at(0)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            onPress={() => {
              getSafeModeData();
            }}>
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                paddingVertical: 5,
                marginTop: 20,
                backgroundColor: 'red',
              }}>
              <View style={[styles.createButton]}>
                {loading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  <Text
                    style={{color: 'white', fontSize: 20, fontWeight: '700'}}>
                    CREATE AND SAVE CARD
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}
