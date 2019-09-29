import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import logoIcon from '../assets/images/logo.png';
import mainIcon from '../assets/images/mainIcon.png';

export default function Loading() {
  return (
    <LinearGradient
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      colors={['#62cdaa', '#79d19b', '#90d392']}
      style={styles.container}
    >
      <Image source={mainIcon} style={{ width: 80, height: 80 }} />
      <Image source={logoIcon} style={{ width: 90, height: 90 }} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

Loading.navigationOptions = {
  header: null
};
