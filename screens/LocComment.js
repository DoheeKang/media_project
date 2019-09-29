import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { Button, AirbnbRating } from 'react-native-elements';

const gray = '#f2f2f2';

export default function LocComment({
  comment,
  commentRating,
  setComment,
  handleOnComment,
  commentList
}) {
  return (
    <View style={styles.container}>
      <View style={{ paddingLeft: 20, backgroundColor: gray }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>별점 입력</Text>
          <AirbnbRating
            onFinishRating={r => (commentRating.current = r)}
            showRating={false}
            size={25}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
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
        </View>
      </View>
      <ScrollView>{commentList}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    width: 300,
    backgroundColor: '#fff'
  }
});