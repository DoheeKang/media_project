import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
import ContentScreen from './ContentScreen';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import logoIcon from '../assets/images/logo.png';

import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

/* Images */
import sunnyIcon from '../assets/images/weather/sunny.png';
import cloudyIcon from '../assets/images/weather/cloudy.png';
import fogIcon from '../assets/images/weather/fog.png';
import pouringIcon from '../assets/images/weather/pouring.png';
import rainIcon from '../assets/images/weather/rain.png';
import snowIcon from '../assets/images/weather/snow.png';
import thunderIcon from '../assets/images/weather/thunder.png';

import dustIcon from '../assets/images/weather/dust.png';
import fineDustIcon from '../assets/images/weather/fineDust.png';

import good from '../assets/images/mood/good.png';
import soso from '../assets/images/mood/soso.png';
import bad from '../assets/images/mood/bad.png';

const { white } = Colors;

const weatherCases = {
  Thunderstorm: {
    icon: thunderIcon
  },
  Drizzle: {
    icon: rainIcon
  },
  Rain: {
    icon: pouringIcon
  },
  Snow: {
    icon: snowIcon
  },
  Clear: {
    icon: sunnyIcon
  },
  Clouds: {
    icon: cloudyIcon
  },
  Mist: {
    icon: fogIcon
  },
  Smoke: {
    icon: fogIcon
  },
  Haze: {
    icon: fogIcon
  },
  Dust: {
    icon: cloudyIcon
  },
  Fog: {
    icon: fogIcon
  },
  Sand: {
    icon: cloudyIcon
  },
  Ash: {
    icon: cloudyIcon
  },
  Squall: {
    icon: cloudyIcon
  },
  Tornado: {
    icon: thunderIcon
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

const picCondition = {
  1: '좋음!',
  2: '보통!',
  3: '나쁨!',
  4: '마스크를 착용하세요',
  5: '날씨가 흐려요',
  6: '날씨가 안좋아요'
};

const moodCondition = {
  1: good,
  2: soso,
  3: bad
};

const weatherAPI =
  'http://api.openweathermap.org/data/2.5/weather?q=Seoul&APPID=9285169024c6d787301b9060e3bb2ed3';

const fineDustAPI =
  'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=서울&pageNo=1&numOfRows=10&ServiceKey=tSa88T5QB46%2Bx3bYTLNANgFJ7yXjFRCXtNnvFbVzEQYGwu33Grfr%2Fteoy7%2FJ%2BpN3KQtla8iSX0Tjr9AIcUGf9A%3D%3D&ver=1.3&_returnType=json';

const { fullDay } = Layout;

const checkConditon = ({ w, d, fd }) => {
  if (w == 'Clear') {
    // 날씨가 맑은 경우
    if (d <= 2 && fd <= 2) {
      // 미세먼지가 좋은 경우
      return 1;
    } else if (d == 4 || fd == 4) {
      // 미세먼지 또는 초미세먼지가 아주 나쁜 경우
      return [3, 4];
    } else {
      return [2, 4];
    }
  } else if (
    w == 'Mist' ||
    w == 'Fog' ||
    w == 'Haze' ||
    w == 'Clouds' ||
    w == 'Snow'
  ) {
    if (d <= 2 && fd <= 2) {
      // 미세먼지가 좋은 경우
      return [2, 5];
    } else if (d == 4 || fd == 4) {
      // 미세먼지 또는 초미세먼지가 아주 나쁜 경우
      return [3, 4];
    } else {
      return [3, 4];
    }
  } else {
    if (d <= 2 && fd <= 2) {
      // 미세먼지가 좋은 경우
      return 3;
    } else if (d == 4 || fd == 4) {
      // 미세먼지 또는 초미세먼지가 아주 나쁜 경우
      return [3, 4];
    } else {
      return [3, 4];
    }
  }
};

export default function HomeScreen() {
  const [weather, setWeather] = useState({
    main: { temp: 100 },
    weather: [{ main: 'Mist' }]
  });
  const [dust, setDust] = useState({ pm10Grade: 1, pm25Grade: 1 });
  const [isLoad, setIsLoad] = useState(false);
  const [isHomeDetail, setIsHomeDetail] = useState(false);
  const [condition, setCondition] = useState([]);
  useEffect(() => {
    let c = {};

    const getInfo = async () => {
      try {
        // weather api
        const res = await axios.get(weatherAPI);
        setWeather(res.data);
        c['w'] = res.data.weather[0].main;
      } catch (e) {
        alert('날씨 정보 오류');
      }

      try {
        // dust api
        const res = await axios.get(fineDustAPI);
        setDust(res.data.list[0]);
        c['d'] = res.data.list[0].pm10Grade;
        c['fd'] = res.data.list[0].pm25Grade;
      } catch (e) {
        alert('미세먼지 정보 오류');
      }
      setIsLoad(true);
      setCondition(checkConditon({ ...c }));
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
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Image source={logoIcon} style={{ width: 70, height: 70 }} />
              </View>
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
                    {fullDay.month}월 {fullDay.date}일 ({fullDay.day})
                  </Text>
                  <View style={styles.row}>
                    <Image
                      source={weatherCases[weather.weather[0].main].icon}
                      style={{ width: 30, height: 30 }}
                    />
                    <Text style={styles.text}>
                      서울 {Math.ceil(weather.main.temp - 273.15)}°
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
                  <Image
                    source={moodCondition[condition[0]]}
                    style={{ width: 120, height: 120 }}
                  />
                  <Text style={styles.text}>
                    나들이하기 {picCondition[condition[0]]}
                  </Text>
                  <Text style={styles.subtext}>
                    {picCondition[condition[1]]}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color={white}></ActivityIndicator>
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  date: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'BMDOHYEON',
    paddingHorizontal: 6,
    paddingVertical: 15
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'BMDOHYEON',
    paddingHorizontal: 6,
    paddingVertical: 6
  },
  subtext: {
    color: 'white',
    fontSize: 11,
    fontFamily: 'BMDOHYEON'
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
