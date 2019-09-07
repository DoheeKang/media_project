import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

export default function MapScreen() {
  const latlng = {
    latitude: 37.2852555,
    longitude: 127.0466507
  };
  return (
    <MapView
      style={{ flex: 1 }}
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
  );
}

MapScreen.navigationOptions = {
  header: null
};
