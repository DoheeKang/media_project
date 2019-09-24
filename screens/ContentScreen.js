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
import ContetnDetailScreen from './ContentDetailScreen';
export default function ContentScreen(props) {
  const [auth, users, contents] = firebaseApp();
  const [list, setList] = useState(undefined);
  const [isDetail, setIsDetail] = useState(false);
  const detailInfo = useRef('');
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

  if (!isDetail) {
    if (list) {
      return (
        <ScrollView>
          <View style={styles.container}>{list}</View>
        </ScrollView>
      );
    } else {
      return <View style={styles.container}></View>;
    }
  } else {
    return (
      <ContetnDetailScreen
        detailInfo={detailInfo.current}
        setIsDetail={setIsDetail}
      />
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
