import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import cardsData from '../static/cardData';
import firestore from '@react-native-firebase/firestore';
import {collection, addDoc} from 'firebase/firestore';
import CardData from '../static/cardInterface';

const StaticTest = () => {
  const addCard = async (card: CardData) => {
    const newDocRef = firestore().collection('CustomCard').doc();
    await firestore()
      .collection('CommonCard') // Firestore collection name
      .add({
        ...card,
        id: newDocRef.id,
      }) // Upload the card object
      .then(() => {
        console.log('CustomCard successfully added to Firestore!');
      })
      .catch(error => {
        console.error('Error adding card to collection:', error);
      })
      .finally(() => {
        console.log('dodana', card.title);
      });
  };

  const populateStaticCards = async () => {
    const cardsArray = cardsData;

    cardsArray.map(card => {
      addCard(card);
    });
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          {
            backgroundColor: '#FF4C4C',
            marginTop: 30,
            padding: 15,
            borderRadius: 8,
            marginVertical: 10,
            alignItems: 'center',
          },
        ]}
        onPress={() => {
          // You can implement the logout functionality here
          populateStaticCards();
        }}>
        <Text>Populate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StaticTest;
