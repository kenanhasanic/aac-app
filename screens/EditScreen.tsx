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
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Card {
  id: number;
  backgroundColor: string;
  text: string;
  title: string;
  image: string;
  width: number; // TODO: use this to change grid size
}

export default function EditScreen({route, navigation}: any) {
  const {cardData} = route.params;
  const initialImage = cardData.image;
  const [visible, setVisible] = useState(false);

  const [docId, setDocId] = useState('');

  const [text, setText] = React.useState('d');
  const [title, setTitle] = React.useState('d');

  const [colorIndex, setColorIndex] = useState(-1);

  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [cardCreationData, setCardCreationData] = useState<Card>({
    id: 0,
    backgroundColor: 'gray',
    text: 'New Card',
    title: 'New title',
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAAPFBMVEX///+rq6unp6fMzMykpKTp6enx8fHU1NS0tLS6urr6+vqwsLDHx8fPz8/w8PD19fXa2trh4eHl5eXAwMAzrysnAAADpklEQVR4nO2c2ZKDIBAAE6KJmsPr//91c69yKKREHav7dctl6YVhGJTdDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZqE5LMU1XbrvVupELUe9dO9t5PsFyZfuvY1FjWRL994GRnQeRs5NOj+rNpIVCzSMER2M6GBEByM6GNHBiI4cI+mhbdtLE12SFCO3XKnH36ryJnLDQoxU/xm2usZtWIaRWu1nUyLCSNnfh6moE0eEkYvqK4lavpBgpNA368ktYsMSjKSJbqSK2LAEI7VuRB0iNizBSGUYuURsWIIRc4zEXH8lGDkacSTm6YEEI7tMX2zKiA2LMFL185HAMJJWdcj2UIQRfZCEDJEyT5JkH7BcyzBSnrujJORY9r0BSPzXaxlGHv/pz5TJQoQUn4Mw5T1KhBi5x5LseUadnYJKRlcVPLLEGNkVt7qq0rASWtOZa7nno3KM/EB5/mGF2rSRvLdqe+Z1WzZy0Moq6ujz1IaNNJoQz1CyXSO9IPIeJD5ZyXaN6KXIJx6hZLNGKpuQ/Xl8A7BVI6nNx+MAbPTJjRopjAKCdyjZqJHWOmeeSsay+W0asQcRv1CySSM3t4/7IGmHH96ikW8JwKHkNPj0Fo3o2bvBYCiRayRt84u1a/WYkOHfK9bISam92lvW0qOZvRvzZqgwINXI+5zP0rd8dIgMHxwLNdI4+zYaRF643y6QaaT4nxlaxtXo538O3LJlGmk7fetlXKW9/ybuUCLSSC8l7WZchTt7N5S4QolEI1pK2sm4Tt5C7mPLEUoEGjH3tZ++OUoAjkHiKAwINGIWx86vHxTjmUhPib0wIM+IZV/7DpOhn/bZjyvEGbHOjGffQoLIG1thQJoRV3HsFhZEXqjWolyaEUdKqvLyl89hbYUBYUbcKWlYVP1i7p5lGfFOSb05G9JlGfHZ14ZhZiWijFwnF2IJJZKM1NP7eKCFEkFGLEfbk5D1sxJBRvz3tWFohQE5Rk6etaAflPQKA2KMpJFGyJNuYUCKkdJ1tD0JXfVSjFjfj5mMbigRYmToaHsSJf+FARlGftjXhvJ9j1GEEef7MdOhvu8xijASN4i8lXy+dJNgxPhOLw7vL80FGDnO4uN7FCbAyGx3xb0KA+s3cpntysnkGUpWb6Q8zcjjP7B6I7ODEZ1VGznfjrNzW7WRfbIA6zayFBjRWeWtxhU3X+vUi92Ofoh9CR0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMA2+AN7/TZH3Ls1kQAAAABJRU5ErkJggg==',
    width: 300,
  });

  useEffect(() => {
    const getDocId = async (cardId: any) => {
      firestore()
        .collection('CustomCard')
        .where('id', '==', cardId) // Query by the 'id' field in the document
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            const docId = querySnapshot.docs[0].id; // Get the Firestore document ID

            // Update the document using Firestore document ID

            setDocId(docId);
          } else {
            console.log('No matching documents found');
          }
        })
        .then(() => {
          console.log('Document successfully updated!');
        })
        .catch(error => {
          console.error('Error updating document:', error);
        });
    };
    setCardCreationData(cardData);
    setText(cardData.text);
    setTitle(cardData.title);
    getDocId(cardData.id);
  }, [cardData]);

  const handleUpdateCard = async () => {
    setLoading(true);
    // Only upload the image if it has changed
    if (cardCreationData.image !== initialImage) {
      const fileName = cardCreationData.image.substring(
        cardCreationData.image.lastIndexOf('/') + 1,
      );
      const storageRef = storage().ref(`images/${fileName}`);

      const task = storageRef.putFile(cardCreationData.image);

      task.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });

      await task
        .then(async () => {
          const downloadURL = await storageRef.getDownloadURL();
          console.log('Image uploaded to Firebase successfully:', downloadURL);

          // Update the image URL in state
          setCardCreationData(prevData => ({
            ...prevData,
            image: downloadURL,
          }));

          // Update Firestore with the new image URL
          await firestore()
            .collection('CustomCard')
            .doc(docId)
            .update({...cardCreationData, image: downloadURL})
            .then(() => {
              console.log('CustomCard successfully updated in Firestore!');
            })
            .catch(error => {
              console.error(
                'Error updating card in Firestore while images has been changed:',
                error,
              );
            });
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        })
        .finally(() => {
          setLoading(false);
          navigation.navigate('HomeScreen');
        });
    } else {
      console.log('NO IMAGE CHANGE');
      await firestore()
        .collection('CustomCard')
        .doc(docId)
        .update(cardCreationData)
        .then(() => {
          console.log('CustomCard successfully updated without image upload!');
        })
        .catch(error => {
          console.error(
            'Error updating card in Firestore while images has not been changed:',
            error,
          );
        })
        .finally(() => {
          setLoading(false);
          navigation.navigate('HomeScreen');
        });
    }
  };

  const handleDeleteCard = async () => {
    setLoadingDelete(true); // Start loading

    firestore()
      .collection('CustomCard')
      .doc(docId)
      .delete()
      .then(() => {})
      .catch(error => {
        console.error('Error deleting document:', error);
        Alert.alert('Error', 'There was an issue deleting the card.', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      })
      .finally(() => {
        setLoadingDelete(false); // End loading
        navigation.navigate('HomeScreen'); // Navigate back to HomeScreen after deletion
      });
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
                  <View style={[styles.surface, {backgroundColor: 'tomato'}]}>
                    <Icon name="camerao" size={30} color="white" />
                    <Text style={{color: 'white'}}>Take image from camera</Text>
                  </View>
                </TouchableOpacity>
                <View style={{marginTop: 20}}>
                  <Text style={styles.cardColorText}>Choose card color:</Text>
                </View>
                <View style={styles.colorsContainer}>
                  {colors.map((color, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          width: '25%',
                          paddingVertical: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            setColorIndex(index);
                            setCardCreationData({
                              ...cardCreationData,
                              backgroundColor: color,
                            });
                          }}>
                          <View
                            style={[
                              {
                                backgroundColor: color,
                                width: '75%',
                                aspectRatio: 1 / 1,
                                borderRadius: 1000,
                                borderWidth: 0,
                                borderColor: 'lightgray',
                              },
                              colorIndex === index
                                ? {
                                    borderWidth: 5,
                                    width: '100%',
                                  }
                                : {},
                            ]}></View>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                console.log('card id', cardCreationData.id);
                handleUpdateCard();
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 200,
                  paddingVertical: 5,
                  marginTop: 20,
                  backgroundColor: 'blue',
                }}>
                <View style={[styles.createButton]}>
                  {loading ? (
                    <ActivityIndicator size="large" color="white" />
                  ) : (
                    <Text
                      style={{color: 'white', fontSize: 20, fontWeight: '700'}}>
                      UPDATE CARD
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleDeleteCard();
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 200,
                  paddingVertical: 5,
                  marginTop: 20,
                  backgroundColor: 'red',
                }}>
                <View style={[styles.createButton]}>
                  {loadingDelete ? (
                    <ActivityIndicator size="large" color="white" />
                  ) : (
                    <Text
                      style={{color: 'white', fontSize: 20, fontWeight: '700'}}>
                      DELETE CARD
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}
