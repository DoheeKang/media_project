import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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

const weatherAPI =
  'http://api.openweathermap.org/data/2.5/weather?q=Seoul&APPID=9285169024c6d787301b9060e3bb2ed3';

const fineDustAPI =
  'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=서울&pageNo=1&numOfRows=10&ServiceKey=tSa88T5QB46%2Bx3bYTLNANgFJ7yXjFRCXtNnvFbVzEQYGwu33Grfr%2Fteoy7%2FJ%2BpN3KQtla8iSX0Tjr9AIcUGf9A%3D%3D&ver=1.3&_returnType=json';

export default function HomeScreen() {
  const [weather, setWeather] = useState({
    main: { temp: 100 },
    weather: [{ main: 'Mist' }]
  });
  const [dust, setDust] = useState({ pm10Grade: 1, pm25Grade: 1 });
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const getInfo = async () => {
      try {
        // weather api
        const res = await axios.get(weatherAPI);
        setWeather(res.data);
      } catch (e) {
        alert('날씨 정보 오류');
      }

      try {
        // dust api
        const res = await axios.get(fineDustAPI);
        setDust(res.data.list[0]);
      } catch (e) {
        alert('미세먼지 정보 오류');
      }
      setIsLoad(true);
    };
    getInfo();
  }, []);

  if (isLoad) {
    return (
      <View style={styles.container}>
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          colors={['#62cdaa', '#79d19b', '#90d392']}
          style={styles.weather}
        >
          {/* <MaterialCommunityIcons
            color="black"
            size={144}
            name={weatherCases[weather.weather[0].main].icon}
          ></MaterialCommunityIcons> */}
          <View>
            <Text>오늘</Text>
            <Text>서울 {Math.ceil(weather.main.temp - 273.15)}º</Text>
            <Text>미세먼지 {fineDustCases[dust.pm10Grade].condition}</Text>
            <Text>초미세먼지 {fineDustCases[dust.pm25Grade].condition}</Text>
          </View>
          <View>
            <Text>우우우</Text>
          </View>
        </LinearGradient>
        <View style={styles.contents}></View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Weather Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  weather: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contents: {
    flex: 5,
    backgroundColor: 'white'
  }
});

HomeScreen.navigationOptions = {
  header: null
};
