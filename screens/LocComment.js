import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';

export default function LocComment({
  comment,
  setComment,
  handleOnComment,
  commentList
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={e => setComment(e)}
        placeholder="text"
      ></TextInput>
      <Button
        title="입력"
        type="clear"
        titleStyle={{ color: '#7dcaac' }}
        onPress={handleOnComment}
      ></Button>
      <View>{commentList}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    paddingTop: 30
  }
});
