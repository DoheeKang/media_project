import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { firebaseApp } from '../firebase';
import Content from './Content';
const GREEN = '#7dcaac';

export default function ContentScreen({
  isHome,
  setIsHomeDetail,
  detailInfo,
  setIsDetail
}) {
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
                if (isHome) setIsHomeDetail(true);
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
        <Text style={styles.text}>
          {isHome ? `오늘의 추천` : `나들이 장소`}
        </Text>
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
  },
  text: {
    color: GREEN,
    paddingLeft: 20,
    paddingTop: 20,
    fontSize: 20,
    fontWeight: 'bold'
  }
});

ContentScreen.navigationOptions = {
  header: null
};
