import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardData from '../static/cardInterface';

interface CardProps {
  data: CardData;
}

const styles = StyleSheet.create({});

export default function Card({data}: CardProps) {
  const [imageHeight, setImageHeight] = useState(data.width);

  useEffect(() => {
    // Fetch the actual width and height of the image from the URL
    if (data.image !== '') {
      Image.getSize(data.image, (width, height) => {
        // Calculate the new height based on the provided width and the image's aspect ratio
        const aspectRatio = height / width;
        const newHeight = data.width * aspectRatio;
        setImageHeight(newHeight);
      });
    }
  }, [data]);

  return (
    <View
      style={{
        width: data.width - (data.width / 30) * 2,
        height: data.width - (data.width / 30) * 2,
        borderRadius: data.width / 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden',
        margin: data.width / 30,
        position: 'relative',
      }}>
      <View
        style={{
          paddingVertical: data.width / 40,
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          zIndex: 10,
          backgroundColor: data.backgroundColor,

          width: '100%',
        }}>
        <Text style={{color: 'white', fontSize: data.width / 10}}>
          {data.title}
        </Text>
      </View>
      <View
        style={{
          paddingVertical: data.width / 40,
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          zIndex: -1,
          backgroundColor: data.backgroundColor,
          opacity: 0.5,

          width: '100%',
          aspectRatio: 1 / 1,
        }}></View>
      <View
        style={{
          paddingVertical: data.width / 40,
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          zIndex: 10,
          borderWidth: data.width / 50,
          borderColor: data.backgroundColor,
          borderRadius: data.width / 10,
          width: '100%',
          aspectRatio: 1 / 1,
        }}></View>

      {data.image === '' ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '95%',
          }}>
          <Text style={{color: 'white', fontSize: data.width / 8}}>
            {data.text}
          </Text>
        </View>
      ) : (
        imageHeight && (
          <Image
            source={{uri: data.image}} // For remote images
            style={{
              width: data.width,
              height: data.width,
            }}
          />
        )
      )}
    </View>
  );
}
