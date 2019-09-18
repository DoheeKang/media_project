import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { firebaseApp } from '../firebase';
import Content from './Content';
export default function ContentScreen() {
  const [auth, users, contents] = firebaseApp();
  const [list, setList] = useState(undefined);
  const dataList = [];

  useEffect(() => {
    contents
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          dataList.push({ id: doc.id, data: doc.data() });
        });
      })
      .then(() => {
        setList(
          dataList.map(info => (
            <Content key={info.id} data={info.data}></Content>
          ))
        );
      });
  }, []);

  if (list) {
    return <View style={styles.container}>{list}</View>;
  } else {
    return (
      <View style={styles.container}>
        <Text>Contents Screen</Text>
      </View>
    );
  }
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
