import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function ContentScreen() {
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
