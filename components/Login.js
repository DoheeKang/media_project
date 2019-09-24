import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { Button } from 'react-native-elements';

import { ContextSet } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';

const WHITE = '#FFF';
const GREEN = '#7dcaac';
const LIGHT_GRAY = '#D3D3D3';

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
          selectionColor={WHITE}
          underlineColorAndroid={isfocusedEmail ? WHITE : LIGHT_GRAY}
          onFocus={() => setIsFocusedEmail(true)}
          onBlur={() => setIsFocusedEmail(false)}
          style={styles.textInput}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={LIGHT_GRAY}
          onChangeText={e => setEmail(e)}
        />
        <TextInput
          placeholder="PASSWORD"
          selectionColor={WHITE}
          underlineColorAndroid={isfocusedPW ? WHITE : LIGHT_GRAY}
          onFocus={() => setIsFocusedPW(true)}
          onBlur={() => setIsFocusedPW(false)}
          style={styles.textInput}
          value={password}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          placeholderTextColor={LIGHT_GRAY}
          onChangeText={e => setPassword(e)}
        />
        <View style={styles.buttonBox}>
          <Button
            buttonStyle={{ backgroundColor: WHITE, borderRadius: 15 }}
            titleStyle={{ color: GREEN }}
            title="LOGIN"
            onPress={handleOnClickLogin}
          />
        </View>
        <Button
          title="SIGN UP"
          type="clear"
          titleStyle={{ color: LIGHT_GRAY }}
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
  textInput: {
    width: 250,
    padding: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginVertical: 10,
    color: WHITE
  }
});

export default LoginScreen;
