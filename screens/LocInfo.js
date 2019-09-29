import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

/* Image */
import locInfoIcon from '../assets/images/locInfo.png';
import locDesIcon from '../assets/images/locDes.png';
import locBabyIcon from '../assets/images/locBaby.png';

export default function LocInfo({ contentInfo }) {
  const [infoList, setInfoList] = useState([]);
  const [facList, setFacList] = useState([]);
  useEffect(() => {
    const tempInfo = contentInfo.info;
    const tempBaby = contentInfo.facilities;
    const tempArr = [];

    if (tempInfo.length) {
      setInfoList(
        tempInfo.map((i, idx) => {
          return <Text key={idx}>{i}</Text>;
        })
      );
      for (const key in tempBaby) {
        tempArr.push(
          <View style={{ flexDirection: 'row' }}>
            <Text>{key}</Text>
            <Text>{tempBaby[key] ? 'O' : 'X'}</Text>
          </View>
        );
      }
      setFacList(tempArr);
    }
  }, [contentInfo]);
  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={locDesIcon} style={{ width: 30, height: 30 }} />
        <Text>장소소개</Text>
      </View>
      <Text>{contentInfo.description}</Text>
      <Text></Text>
      <View style={{ flexDirection: 'row' }}>
        <Image source={locInfoIcon} style={{ width: 30, height: 30 }} />
        <Text>기본정보</Text>
      </View>
      <View>{infoList}</View>
      <Text></Text>
      <View style={{ flexDirection: 'row' }}>
        <Image source={locBabyIcon} style={{ width: 30, height: 30 }} />
        <Text>유아편의시설</Text>
      </View>
      <View>{facList}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
