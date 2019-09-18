import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function ContentDetailScreen(props) {
  return (
    <View style={styles.container}>
      <Text>{props.name}</Text>
      <Button title="X" onPress={() => props.setIsDetail(false)} />
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

ContentDetailScreen.navigationOptions = {
  header: null
};
