import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text>Map Screen</Text>
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

MapScreen.navigationOptions = {
  header: null
};
