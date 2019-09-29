import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

const { textColor, focusGreen, lightGray } = Colors;

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
          return (
            <Text key={idx} style={[styles.text, styles.comment]}>
              {i}
            </Text>
          );
        })
      );
      for (const key in tempBaby) {
        tempArr.push(
          <View key={key} style={{ flexDirection: 'row' }}>
            <AntDesign
              size={15}
              name={tempBaby[key] ? 'closecircle' : 'checkcircle'}
              color={tempBaby[key] ? lightGray : focusGreen}
              style={{ paddingTop: 5 }}
            ></AntDesign>
            <Text style={[styles.text, styles.comment]}>{key}</Text>
          </View>
        );
      }
      setFacList(tempArr);
    }
  }, [contentInfo]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <Image source={locDesIcon} style={{ width: 25, height: 25 }} />
          <Text style={[styles.text, styles.title]}>장소안내</Text>
        </View>
        <Text style={[styles.text, styles.content]}>
          {contentInfo.description}
        </Text>
        <Text></Text>
        <View style={{ flexDirection: 'row' }}>
          <Image source={locInfoIcon} style={{ width: 25, height: 25 }} />
          <Text style={[styles.text, styles.title]}>기본정보</Text>
        </View>
        <View>{infoList}</View>
        <Text></Text>
        <View style={{ flexDirection: 'row' }}>
          <Image source={locBabyIcon} style={{ width: 25, height: 25 }} />
          <Text style={[styles.text, styles.title]}>유아편의시설</Text>
        </View>
        <View>{facList}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10
  },
  text: {
    paddingTop: 5,
    fontFamily: 'BMDOHYEON',
    color: textColor
  },
  title: {
    color: focusGreen,
    fontSize: 15,
    paddingLeft: 3
  },
  content: {
    fontSize: 13
  }
});
