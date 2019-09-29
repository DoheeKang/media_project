import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import MapView, { Callout, Marker } from 'react-native-maps';

export default function MapScreen() {
  const latlng = {
    latitude: 37.2852555,
    longitude: 127.0466507
  };
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={['#62cdaa', '#79d19b', '#90d392']}
        style={{ flex: 1 }}
      ></LinearGradient>
      <View style={{ flex: 7, paddingLeft: 20, paddingRight: 20 }}>
        <View style={{ flex: 1 }}></View>
        <MapView
          style={{ flex: 6 }}
          initialRegion={{
            latitude: 37.2852555,
            longitude: 127.0466507,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <Marker coordinate={latlng}>
            <Callout>
              <View>
                <Text>장소 이름</Text>
                <Text>구체적인 장소</Text>
              </View>
            </Callout>
          </Marker>
        </MapView>
      </View>
    </View>
  );
}

MapScreen.navigationOptions = {
  header: null
};
