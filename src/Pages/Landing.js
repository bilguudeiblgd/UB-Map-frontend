import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';

const Landing = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/background.jpg')}
        resizeMode="cover"
        style={[styles.backCover]}></ImageBackground>
      <View style={{flex: 1, alignItems: 'center', marginTop: '15%'}}>
        <Image
          style={styles.logo1}
          source={require('../img/busifylogo.png')}></Image>
        <Text style={[styles.logotext]}>BUSIFY</Text>
      </View>

      <View style={styles.direction_button_container}>
        <Button
          onPress={() => {
            navigation.navigate('Station');
          }}
          containerStyle={{
            marginHorizontal: 16,
            marginBottom: 8,
          }}
          buttonStyle={{
            width: 200,
            paddingVertical: 10,
            borderRadius: 12,
          }}
          title="Аялал эхлүүлэх"
          type="solid"
          color="#279cd4"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    padding: 16,
  },

  backCover: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.3,
  },

  logotext: {
    top: -40,
    color: 'white',
    fontSize: 35,
    lineHeight: 84,
    textAlign: 'center',
  },
  logo1: {
    width: 150,
    height: 150,
  },

  direction_button_container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 24,
  },
});

export default Landing;
