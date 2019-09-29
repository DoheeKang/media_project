import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../constants/Colors';
import { Card } from 'react-native-elements';

const { focusGreen } = Colors;

export default function Content({ data }) {
  return (
    <View style={styles.container}>
      <Card
        containerStyle={styles.content}
        image={{
          uri:
            'https://firebasestorage.googleapis.com/v0/b/media-e6082.appspot.com/o/photos%2Fphoto%2Fcat.jpg?alt=media&token=accdd002-422b-4fe5-b505-4b642cc5b780'
        }}
      >
        <View>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.text}>{data.location}</Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  title: {
    fontSize: 14,
    fontFamily: 'BMDOHYEON',
    color: focusGreen,
    marginVertical: 2
  },
  text: {
    fontSize: 10,
    fontFamily: 'BMDOHYEON'
  },
  content: {
    width: 300,
    borderRadius: 30,
    overflow: 'hidden'
  }
});
