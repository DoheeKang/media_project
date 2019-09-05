import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function InfoScreen() {
  return (
    <View style={styles.container}>
      <Text>Info Screen</Text>
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

InfoScreen.navigationOptions = {
  header: null
};
