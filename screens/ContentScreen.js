import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { firebaseApp } from '../firebase';

export default function ContentScreen() {
  const [auth, users, contents] = firebaseApp();

  contents.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      console.log(doc.id, ' => ', doc.data());
    });
  });

  return (
    <View style={styles.container}>
      <Text>Content Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

ContentScreen.navigationOptions = {
  header: null
};
