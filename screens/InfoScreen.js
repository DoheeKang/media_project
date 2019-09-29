import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
  Alert
} from 'react-native';
import { Avatar, Divider, Card } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { firebaseApp, ContextSet } from '../firebase';

import { MaterialIcons } from '@expo/vector-icons';

import LogoutScreen from '../components/Logout';

const width = Dimensions.get('window').width;
const gray = '#f2f2f2';

export default function InfoScreen(props) {
  const [auth, users, contents] = firebaseApp();
  const [data, setData] = useContext(ContextSet.DataContext);
  const [likeList, setLikeList] = useState([]);

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
      const tempLikeList = data['like'];
      setLikeList(
        tempLikeList.map((li, idx) =>
          contents
            .doc(li)
            .get()
            .then(doc => {
              return (
                <Text>{doc.data().title}</Text>
                // <Card
                //   containerStyle={styles.content}
                //   image={{
                //     uri:
                //       'https://firebasestorage.googleapis.com/v0/b/media-e6082.appspot.com/o/photos%2Fphoto%2Fcat.jpg?alt=media&token=accdd002-422b-4fe5-b505-4b642cc5b780'
                //   }}
                // ></Card>
              );
            })
        )
      );
    }
  }, [data]);

  return data ? (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={['#62cdaa', '#79d19b', '#90d392']}
        style={{ flex: 1 }}
      ></LinearGradient>
      <View style={{ flex: 7 }}>
        <View style={{ flex: 1 }}>
          <TouchableHighlight onPress={checkLogout} underlayColor="white">
            <Text style={{ textAlign: 'right' }}>로그아웃</Text>
          </TouchableHighlight>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Avatar size="large" rounded icon={{ name: 'person' }} />
            <Text>{data['userName']}님</Text>
          </View>
        </View>
        <View style={{ width, height: 20, backgroundColor: gray }}></View>
        <View style={{ flex: 1 }}>
          <Text>내 정보</Text>
          <Divider style={{ height: 3, backgroundColor: gray }} />
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10
              }}
            >
              <Text style={{ paddingVertical: 10 }}>E-MAIL</Text>
              <Text>닉네임</Text>
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10
              }}
            >
              <Text style={{ paddingVertical: 10 }}>{data['email']}</Text>
              <Text>{data['userName']}</Text>
            </View>
          </View>
        </View>
        <View style={{ width, height: 20, backgroundColor: gray }}></View>
        <View style={{ flex: 2 }}>
          <MaterialIcons size={30} name="bookmark"></MaterialIcons>
          <Text>즐겨찾기</Text>
          <Divider style={{ height: 3, backgroundColor: gray }} />
        </View>
        {/* <View>{likeList}</View> */}
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
  content: {
    width: 100,
    borderRadius: 30,
    overflow: 'hidden'
  }
});

InfoScreen.navigationOptions = {
  header: null
};
