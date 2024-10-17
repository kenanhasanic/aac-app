import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import Card from './Card';

interface Card {
  id: number;
  backgroundColor: string;
  text: string;
  image: string;
  width: number; // TODO: use this to change grid size
}

interface CardProps {
  data: {
    stream: Card[];
    height: number;
    deleteClickedIcon: Function; // TODO: use this to change grid size
  };
}

export default function CardStream({data}: CardProps) {
  const [stream, setStream] = useState<Card[]>([]);
  useEffect(() => {
    setStream(data.stream);
  }, [data]);

  return (
    <View
      style={{
        height: (data.height * 2) / 3,
        width: Dimensions.get('window').width,
        backgroundColor: 'gray',
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
    </View>
  );
}
