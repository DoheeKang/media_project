import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ContentScreen from './ContentScreen';

import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

/* Images */
import sunnyIcon from '../assets/images/sunny.png';
import dustIcon from '../assets/images/dust.png';
import fineDustIcon from '../assets/images/fineDust.png';

import good from '../assets/images/good.png';

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

const newDate = new Date();
const date = newDate.getDate();
const month = newDate.getMonth() + 1;

export default function HomeScreen() {
  const [weather, setWeather] = useState({
    main: { temp: 100 },
    weather: [{ main: 'Mist' }]
  });
  const [dust, setDust] = useState({ pm10Grade: 1, pm25Grade: 1 });
  const [isLoad, setIsLoad] = useState(false);
  const [isHomeDetail, setIsHomeDetail] = useState(false);

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

  return (
    <View style={styles.container}>
      {isHomeDetail ? (
        <></>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          colors={['#62cdaa', '#79d19b', '#90d392']}
          style={styles.weather}
        >
          {isLoad ? (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 2 }}></View>
              <View
                style={{
                  flex: 5,
                  flexDirection: 'row',
                  paddingLeft: 30,
                  paddingRight: 30
                }}
              >
                <View
                  style={{
                    flex: 1
                  }}
                >
                  <Text style={styles.date}>
                    {month}월 {date}일
                  </Text>
                  <View style={styles.row}>
                    <Image
                      source={sunnyIcon}
                      style={{ width: 30, height: 30 }}
                    />
                    <Text style={styles.text}>
                      서울 {Math.ceil(weather.main.temp - 273.15)}º
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Image
                      source={dustIcon}
                      style={{ width: 30, height: 30 }}
                    />
                    <Text style={styles.text}>
                      미세먼지 {fineDustCases[dust.pm10Grade].condition}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Image
                      source={fineDustIcon}
                      style={{ width: 30, height: 30 }}
                    />
                    <Text style={styles.text}>
                      초미세먼지 {fineDustCases[dust.pm25Grade].condition}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Image source={good} style={{ width: 120, height: 120 }} />
                  <Text style={styles.text}>나들이하기 좋아요!</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.container}>
              <Text>Weather Loading...</Text>
            </View>
          )}
        </LinearGradient>
      )}

      <View style={styles.contents}>
        <ContentScreen
          isHome={true}
          setIsHomeDetail={setIsHomeDetail}
        ></ContentScreen>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
  date: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 15
  },
  text: {
    color: 'white',
    fontSize: 15,
    paddingHorizontal: 6,
    paddingVertical: 6
  },
  weather: {
    flex: 4
  },
  contents: {
    flex: 5,
    backgroundColor: 'white'
  }
});

HomeScreen.navigationOptions = {
  header: null
};
