import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import Card from './Card';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CardData from '../static/cardInterface';

interface CardProps {
  data: {
    stream: CardData[];
    height: number;
    deleteClickedIcon: Function;
    setIconArray: Function; // TODO: use this to change grid size
  };
}

export default function CardStream({data}: CardProps) {
  const [stream, setStream] = useState<CardData[]>([]);
  useEffect(() => {
    setStream(data.stream);
  }, [data]);

  return (
    <View
      style={{
        height: (data.height * 2) / 3 + 10,
        width: Dimensions.get('window').width,
        borderBottomWidth: 10,
        borderColor: 'lightgray',
        position: 'relative',
      }}>
      {stream && (
        <FlatList
          data={stream} // Pass the cardsData array
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                data.deleteClickedIcon(item.id);
              }}>
              <Card data={{...item, width: (data.height * 2) / 3}}></Card>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          //   key={Number(gridSize)}
          //   numColumns={Number(gridSize)} // Use index as key
          horizontal={true}
        />
      )}
      <View
        style={{
          position: 'absolute',
          height: '70%',
          aspectRatio: 1 / 1,
          // backgroundColor: 'red',
          right: 0,
          top: '15%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            data.setIconArray(stream.slice(0, -1));
          }}>
          <Icon name="backspace" size={35} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
