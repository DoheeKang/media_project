import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import axios from 'axios';
export default function HomeScreen() {
  const [weather, setWeather] = useState({
    main: { temp: 100 },
    weather: [{ main: 'Sunny' }]
  });
  useEffect(() => {
    axios
      .get(
        'http://api.openweathermap.org/data/2.5/weather?q=Seoul&APPID=9285169024c6d787301b9060e3bb2ed3'
      )
      .then(res => {
        setWeather(res.data);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>날씨: {weather.weather[0].main}</Text>
      <Text>기온: {Math.ceil(weather.main.temp - 273.15)}℃</Text>
      <Text>습도: {weather.main.humidity}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

HomeScreen.navigationOptions = {
  header: null
};
