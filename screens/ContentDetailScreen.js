import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import { firebaseApp, ContextSet } from '../firebase';
import firebase from 'firebase/app';

export default function ContentDetailScreen(props) {
  const [auth, users, contents] = firebaseApp();
  const [comment, setComment] = useState(undefined);
  const [data, setData] = useContext(ContextSet.DataContext);
  const [reLoad, setReload] = useState(false);
  const [commentList, setCommentList] = useState(undefined);

  const handleOnComment = () => {
    const com = { id: JSON.stringify(data.userName), comment };
    contents.doc(props.detailInfo).update({
      comments: firebase.firestore.FieldValue.arrayUnion(com)
    });
    setComment('');
    setReload(!reLoad);
  };

  useEffect(() => {
    contents
      .doc(props.detailInfo)
      .get()
      .then(function(doc) {
        const dataList = doc.data().comments;
        setCommentList(
          dataList.map(info => (
            <Text>
              {info.id} : {info.comment}
            </Text>
          ))
        );
      });
  }, [reLoad]);

  return (
    <View style={styles.container}>
      <Text>{props.detailInfo}</Text>
      <Button title="X" onPress={() => props.setIsDetail(false)} />
      <TextInput
        onChangeText={e => setComment(e)}
        value={comment}
        placeholder="댓글을 입력하세요"
      ></TextInput>
      <Button title="입력" onPress={handleOnComment}></Button>
      {commentList}
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
