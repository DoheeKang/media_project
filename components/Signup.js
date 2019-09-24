import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import { firebaseApp } from '../firebase';

const FOCUS_GREEN = '#7dcaac';
const BLUR_GREEN = '#acc9be';
const LIGHT_GRAY = '#D3D3D3';

const SignupScreen = ({ setSignupPage, setData }) => {
  const [auth, users] = firebaseApp();
  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPW, setIsFocusedPW] = useState(false);
  const [isFocusedConfirmPW, setIsFocusedConfirmPW] = useState(false);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOnClickSignup = () => {
    if (userName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(auth => {
            const authData = auth.user;
            const data = { email, userName };
            users.doc(authData.uid).set(data);
            setData(data);
            setSignupPage(false);
            Alert.alert('가입을 축하합니다!');
          })
          .catch(error => Alert.alert(error.message));
      } else {
        Alert.alert('비밀번호를 확인해주세요');
      }
    } else {
      Alert.alert('정보를 입력해주세요');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled
      keyboardVerticalOffset={20}
    >
      <Header
        leftComponent={
          <Icon
            name="arrow-back"
            color="#fff"
            onPress={() => setSignupPage(false)}
            underlayColor={FOCUS_GREEN}
          />
        }
        centerComponent={{ text: '회원가입', style: { color: '#fff' } }}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ['#62cdaa', '#79d19b', '#90d392'],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 }
        }}
      />
      <ScrollView>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="이름"
            selectionColor={FOCUS_GREEN}
            underlineColorAndroid={isFocusedName ? FOCUS_GREEN : BLUR_GREEN}
            onFocus={() => setIsFocusedName(true)}
            onBlur={() => setIsFocusedName(false)}
            style={styles.textInput}
            value={userName}
            autoCapitalize="none"
            placeholderTextColor={LIGHT_GRAY}
            onChangeText={e => setUserName(e)}
          />
          <Text></Text>
          <TextInput
            placeholder="이메일"
            selectionColor={FOCUS_GREEN}
            underlineColorAndroid={isFocusedEmail ? FOCUS_GREEN : BLUR_GREEN}
            onFocus={() => setIsFocusedEmail(true)}
            onBlur={() => setIsFocusedEmail(false)}
            style={styles.textInput}
            value={email}
            autoCapitalize="none"
            placeholderTextColor={LIGHT_GRAY}
            onChangeText={e => setEmail(e)}
          />
          <Text></Text>
          <TextInput
            placeholder="비밀번호"
            selectionColor={FOCUS_GREEN}
            underlineColorAndroid={isFocusedPW ? FOCUS_GREEN : BLUR_GREEN}
            onFocus={() => setIsFocusedPW(true)}
            onBlur={() => setIsFocusedPW(false)}
            style={styles.textInput}
            value={password}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholderTextColor={LIGHT_GRAY}
            onChangeText={e => setPassword(e)}
          />
          {password && confirmPassword && password !== confirmPassword ? (
            <Text style={styles.error}>비밀번호가 일치하지 않습니다</Text>
          ) : (
            <Text></Text>
          )}
          <TextInput
            placeholder="비밀번호 확인"
            selectionColor={FOCUS_GREEN}
            underlineColorAndroid={
              isFocusedConfirmPW ? FOCUS_GREEN : BLUR_GREEN
            }
            onFocus={() => setIsFocusedConfirmPW(true)}
            onBlur={() => setIsFocusedConfirmPW(false)}
            style={styles.textInput}
            value={confirmPassword}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholderTextColor={LIGHT_GRAY}
            onChangeText={e => setConfirmPassword(e)}
          />

          <View style={styles.buttonBox}>
            <Button
              buttonStyle={{ backgroundColor: FOCUS_GREEN }}
              title="완료"
              onPress={handleOnClickSignup}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputBox: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    width: 300,
    padding: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginVertical: 10
  },
  error: {
    color: 'red'
  },
  buttonBox: {
    width: 300,
    paddingTop: 30,
    elevation: 0
  }
});

export default SignupScreen;
