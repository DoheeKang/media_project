import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import Colors from '../constants/Colors';
import Content from './Content';
import logoIcon from '../assets/images/logo.png';
import { Avatar, Divider, Card } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { firebaseApp, ContextSet } from '../firebase';
import { MaterialIcons } from '@expo/vector-icons';

const width = Dimensions.get('window').width;
const { textColor, gray, lightGray } = Colors;

export default function InfoScreen(props) {
  const [auth, users, contents] = firebaseApp();
  const [data, setData] = useContext(ContextSet.DataContext);
  const [likeList, setLikeList] = useState(undefined);

  const checkLogout = () => {
    Alert.alert(
      '알림',
      '정말 로그아웃 하시겠어요?',
      [
        {
          text: '취소',
          style: 'cancel'
        },
        { text: '확인', onPress: () => handleOnClickLogout() }
      ],
      { cancelable: false }
    );
  };

  const handleOnClickLogout = () => {
    auth
      .signOut()
      .then(() => {
        setData(null);
        setEmail('');
        setPassword('');
        Alert.alert('로그아웃 되었습니다.');
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!data) {
      props.navigation.navigate('Auth');
    } else {
      const tempLikeList = data['likes'];
      const t = [];
      if (tempLikeList.length) {
        tempLikeList.forEach(element => {
          contents
            .doc(element)
            .get()
            .then(doc => {
              t.push(<Content data={doc.data()}></Content>);
            })
            .then(() => {
              if (t.length === tempLikeList.length) {
                setLikeList(t);
              }
            });
        });
      }
    }
  }, [data]);
  return data ? (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={['#62cdaa', '#79d19b', '#90d392']}
        style={styles.header}
      >
        <Image source={logoIcon} style={{ width: 70, height: 70 }} />
      </LinearGradient>
      <View style={{ flex: 7 }}>
        <View style={{ flex: 1 }}>
          <TouchableHighlight onPress={checkLogout} underlayColor="white">
            <Text
              style={[
                styles.text,
                {
                  color: lightGray,
                  textAlign: 'right',
                  paddingRight: 10,
                  paddingTop: 5
                }
              ]}
            >
              로그아웃
            </Text>
          </TouchableHighlight>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Avatar size="large" rounded icon={{ name: 'person' }} />
            <Text style={[styles.text, { paddingTop: 5 }]}>
              {data['userName']}님
            </Text>
          </View>
        </View>

        <View style={{ width, height: 20, backgroundColor: gray }}></View>

        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.text,
              {
                flex: 1,
                paddingLeft: 15,
                textAlignVertical: 'center'
              }
            ]}
          >
            내 정보
          </Text>
          <Divider style={{ height: 3, backgroundColor: gray }} />
          <View style={{ flex: 3, flexDirection: 'row' }}>
            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10
              }}
            >
              <Text style={[styles.text, { paddingVertical: 10 }]}>E-MAIL</Text>
              <Text style={styles.text}>닉네임</Text>
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10
              }}
            >
              <Text style={[styles.text, { paddingVertical: 10 }]}>
                {data['email']}
              </Text>
              <Text style={styles.text}>{data['userName']}</Text>
            </View>
          </View>
        </View>

        <View style={{ width, height: 20, backgroundColor: gray }}></View>

        <View style={{ flex: 2 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10
            }}
          >
            <MaterialIcons size={30} name="bookmark"></MaterialIcons>
            <Text style={[styles.text, { textAlignVertical: 'center' }]}>
              즐겨찾기
            </Text>
          </View>
          <Divider style={{ height: 3, backgroundColor: gray }} />
          <View style={{ flex: 5 }}>
            <ScrollView>{likeList}</ScrollView>
          </View>
        </View>
      </View>
    </View>
  ) : (
    <View></View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    width: 100,
    borderRadius: 30,
    overflow: 'hidden'
  },
  text: {
    fontFamily: 'BMDOHYEON',
    color: textColor
  }
});

InfoScreen.navigationOptions = {
  header: null
};
