import React from 'react';
import MapView from 'react-native-maps';

export default function MapScreen() {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 37.2852555,
        longitude: 127.0466507,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
    />
  );
}

MapScreen.navigationOptions = {
  header: null
};
