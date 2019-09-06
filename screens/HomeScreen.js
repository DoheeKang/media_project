import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
  const [weather, setWeather] = useState({
    main: { temp: 100 },
    weather: [{ main: 'Sunny' }]
  });
  const [dust, setDust] = useState({ pm10Grade: 0, pm25Grade: 0 });
  useEffect(() => {
    // weather api
    axios
      .get(
        'http://api.openweathermap.org/data/2.5/weather?q=Seoul&APPID=9285169024c6d787301b9060e3bb2ed3'
      )
      .then(res => {
        setWeather(res.data);
      });
    // dust api
    axios
      .get(
        'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=서울&pageNo=1&numOfRows=10&ServiceKey=tSa88T5QB46%2Bx3bYTLNANgFJ7yXjFRCXtNnvFbVzEQYGwu33Grfr%2Fteoy7%2FJ%2BpN3KQtla8iSX0Tjr9AIcUGf9A%3D%3D&ver=1.3&_returnType=json'
      )
      .then(res => {
        setDust(res.data.list[0]);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>날씨: {weather.weather[0].main}</Text>
      <Text>기온: {Math.ceil(weather.main.temp - 273.15)}℃</Text>
      <Text>습도: {weather.main.humidity}</Text>
      <Text>미세먼지: {dust.pm10Grade}등급</Text>
      <Text>초미세먼지: {dust.pm25Grade}등급</Text>
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
