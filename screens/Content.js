import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card } from 'react-native-elements';

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
          <Text>{data.title}</Text>
          <Text>{data.location}</Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  content: {
    width: 300,
    borderRadius: 10,
    overflow: 'hidden'
  }
});
