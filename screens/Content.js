import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Content({ data }) {
  return (
    <View style={styles.container}>
      <Text>{data.name}</Text>
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
