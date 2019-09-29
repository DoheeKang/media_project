import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { Button, AirbnbRating } from 'react-native-elements';
import Colors from '../constants/Colors';

const { white, textColor, gray } = Colors;

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
        <View
          style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 6 }}
        >
          <Text
            style={{
              fontFamily: 'BMDOHYEON',
              color: textColor
            }}
          >
            별점 입력
          </Text>
          <AirbnbRating
            onFinishRating={r => (commentRating.current = r)}
            showRating={false}
            size={22}
          />
        </View>
        <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={e => setComment(e)}
            placeholder="장소에 대한 평가를 남겨주세요"
          ></TextInput>
          <Button
            title="게시"
            type="clear"
            titleStyle={{
              color: '#7dcaac',
              fontSize: 13,
              fontFamily: 'BMDOHYEON'
            }}
            buttonStyle={{ height: 30 }}
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
    height: 30,
    fontSize: 12,
    fontFamily: 'BMDOHYEON',
    borderRadius: 10,
    backgroundColor: white
  }
});
