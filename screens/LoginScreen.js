import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import LoginForm from '../components/loginScreen/LoginForm';

const INSTAGRAM_LOGO = 'https://i.ibb.co/0jMHQN6/instagram.png';

const LoginScreen = ({navigation}) => (
  <View style={styles.container}>
    <View style={styles.logoContainer}>
      <Image source={{uri: INSTAGRAM_LOGO, height: 100, width: 100}} />
    </View>
    <LoginForm navigation={navigation}  />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 80,
  },
});

export default LoginScreen;
