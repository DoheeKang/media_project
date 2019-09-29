import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';

import { ContextSet } from '../firebase';

const { white, lightGray, focusGreen } = Colors;

const LoginScreen = ({
  email,
  setEmail,
  password,
  setPassword,
  setSignupPage
}) => {
  const [isfocusedEmail, setIsFocusedEmail] = useState(false);
  const [isfocusedPW, setIsFocusedPW] = useState(false);

  const [_e, setLoginEmail] = useContext(ContextSet.EmailContext);
  const [_p, setLoginPassword] = useContext(ContextSet.PasswordContext);

  const handleOnClickLogin = () => {
    if (email && password) {
      setLoginEmail(email);
      setLoginPassword(password);
    } else {
      Alert.alert('아이디와 비밀번호를 입력해주세요');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={['#62cdaa', '#79d19b', '#90d392']}
        style={styles.inputBox}
      >
        <TextInput
          placeholder="E-MAIL"
          selectionColor={white}
          underlineColorAndroid={isfocusedEmail ? white : lightGray}
          onFocus={() => setIsFocusedEmail(true)}
          onBlur={() => setIsFocusedEmail(false)}
          style={styles.textInput}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={lightGray}
          onChangeText={e => setEmail(e)}
        />
        <TextInput
          placeholder="PASSWORD"
          selectionColor={white}
          underlineColorAndroid={isfocusedPW ? white : lightGray}
          onFocus={() => setIsFocusedPW(true)}
          onBlur={() => setIsFocusedPW(false)}
          style={styles.textInput}
          value={password}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          placeholderTextColor={lightGray}
          onChangeText={e => setPassword(e)}
        />
        <View style={styles.buttonBox}>
          <Button
            title="LOGIN"
            titleStyle={{ color: focusGreen }}
            buttonStyle={styles.button}
            onPress={handleOnClickLogin}
          />
        </View>
        <Button
          title="SIGN UP"
          type="clear"
          titleStyle={{ color: lightGray }}
          onPress={() => setSignupPage(true)}
        />
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonBox: {
    width: 150,
    paddingTop: 30
  },
  button: {
    backgroundColor: white,
    borderRadius: 15
  },
  textInput: {
    width: 250,
    padding: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginVertical: 10,
    color: white
  }
});

export default LoginScreen;
