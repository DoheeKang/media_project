import React, { useContext } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import { firebaseApp, ContextSet } from '../firebase';

const LogoutScreen = ({ setEmail, setPassword }) => {
  const [auth] = firebaseApp();
  const [data, setData] = useContext(ContextSet.DataContext);

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

  return (
    <View style={{ paddingTop: 50, alignItems: 'center' }}>
      <Button title="Logout" onPress={checkLogout}></Button>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LogoutScreen;
