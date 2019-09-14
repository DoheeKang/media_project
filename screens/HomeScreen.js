import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

const weatherCases = {
  Thunderstorm: {
    icon: 'weather-lightning-rainy'
  },
  Drizzle: {
    icon: 'weather-rainy'
  },
  Rain: {
    icon: 'weather-pouring'
  },
  Snow: {
    icon: 'weather-snowy'
  },
  Clear: {
    icon: 'weather-sunny'
  },
  Clouds: {
    icon: 'weather-cloudy'
  },
  Mist: {
    icon: 'weather-fog'
  },
  Smoke: {
    icon: 'weather-fog'
  },
  Haze: {
    icon: 'weather-fog'
  },
  Dust: {
    icon: 'weather-fog'
  },
  Fog: {
    icon: 'weather-fog'
  },
  Sand: {
    icon: 'weather-fog'
  },
  Dust: {
    icon: 'weather-fog'
  },
  Ash: {
    icon: 'weather-fog'
  },
  Squall: {
    icon: 'weather-fog'
  },
  Tornado: {
    icon: 'weather-fog'
  }
};

const fineDustCases = {
  1: {
    condition: '좋음'
  },
  2: {
    condition: '보통'
  },
  3: {
    condition: '나쁨'
  },
  4: {
    condition: '아주나쁨'
  }
};

export default function HomeScreen() {
  const [weather, setWeather] = useState({
    main: { temp: 100 },
    weather: [{ main: 'Mist' }]
  });
  const [dust, setDust] = useState({ pm10Grade: 1, pm25Grade: 1 });
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
      <MaterialCommunityIcons
        color="black"
        size={144}
        name={weatherCases[weather.weather[0].main].icon}
      ></MaterialCommunityIcons>
      <Text>기온: {Math.ceil(weather.main.temp - 273.15)}℃</Text>
      <Text>습도: {weather.main.humidity} %</Text>
      <Text>미세먼지: {fineDustCases[dust.pm10Grade].condition}</Text>
      <Text>초미세먼지: {fineDustCases[dust.pm25Grade].condition}</Text>
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
