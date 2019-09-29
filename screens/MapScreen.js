import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Callout, Marker } from 'react-native-maps';
import logoIcon from '../assets/images/logo.png';
import Colors from '../constants/Colors';
import { firebaseApp } from '../firebase';

import bottleIcon from '../assets/images/bottle.png';

const { focusGreen } = Colors;
export default function MapScreen() {
  const [auth, users, contents, location] = firebaseApp();
  const [list, setList] = useState(undefined);
  const dataList = [];

  useEffect(() => {
    location
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          dataList.push({ id: doc.id, data: doc.data() });
        });
      })
      .then(() => {
        setList(
          dataList.map(info => (
            <Marker key={info['id']} coordinate={info['data'].coordinate}>
              <Callout>
                <View>
                  <Text style={[styles.text, { color: focusGreen }]}>
                    {info['data'].name}
                  </Text>
                  <Text style={styles.text}>{info['data'].add}</Text>
                  <Text style={styles.text}>{info['data'].loc}</Text>
                  <Text style={styles.text}>{info['data'].who}</Text>
                  <Text style={styles.text}>{info['data'].tel}</Text>
                </View>
              </Callout>
            </Marker>
          ))
        );
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={['#62cdaa', '#79d19b', '#90d392']}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Image source={logoIcon} style={{ width: 70, height: 70 }} />
      </LinearGradient>
      <View style={{ flex: 7, paddingLeft: 20, paddingRight: 20 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image source={bottleIcon} style={{ width: 30, height: 30 }} />
          <Text
            style={{
              fontFamily: 'BMDOHYEON',
              fontSize: 20,
              color: focusGreen
            }}
          >
            서울 수유실 위치
          </Text>
        </View>
        <MapView
          style={{ flex: 6 }}
          initialRegion={{
            latitude: 37.5171,
            longitude: 127.0418,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {list}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'BMDOHYEON',
    fontSize: 10
  }
});

MapScreen.navigationOptions = {
  header: null
};
