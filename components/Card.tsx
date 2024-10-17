import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

interface CardProps {
  data: {
    backgroundColor: string;
    text: string;
    image: string;
    width: number; // TODO: use this to change grid size
  };
}

const styles = StyleSheet.create({});

export default function Card({data}: CardProps) {
  const [imageHeight, setImageHeight] = useState(data.width);

  useEffect(() => {
    // Fetch the actual width and height of the image from the URL
    Image.getSize(data.image, (width, height) => {
      // Calculate the new height based on the provided width and the image's aspect ratio
      const aspectRatio = height / width;
      const newHeight = data.width * aspectRatio;
      setImageHeight(newHeight);
    });
  }, [data]);

  return (
    <View
      style={{
        backgroundColor: data.backgroundColor,
        width: data.width - (data.width / 30) * 2,
        height: data.width - (data.width / 30) * 2,
        borderRadius: data.width / 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden',
        margin: data.width / 30,
      }}>
      <Text
        style={{
          color: 'white',
          paddingVertical: data.width / 40,
          fontSize: data.width / 10,
        }}>
        {data.text}
      </Text>
      {imageHeight && (
        <Image
          source={{uri: data.image}} // For remote images
          style={{
            width: data.width,
            height: data.width,
          }}
        />
      )}
    </View>
  );
}
