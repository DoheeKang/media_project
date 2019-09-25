import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { firebaseApp } from '../firebase';
import Content from './Content';
export default function ContentScreen({ detailInfo, setIsDetail }) {
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
            <TouchableHighlight
              onPress={() => {
                detailInfo.current = info.id;
                setIsDetail(true);
              }}
              underlayColor="white"
              key={info.id}
            >
              <Content key={info.id} data={info.data}></Content>
            </TouchableHighlight>
          ))
        );
      });
  }, []);

  if (list) {
    return (
      <ScrollView>
        <View style={styles.container}>{list}</View>
      </ScrollView>
    );
  } else {
    return <View style={styles.container}></View>;
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
