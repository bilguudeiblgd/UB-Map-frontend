import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIc from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DetailedOption = ({route, navigation}) => {
  return (
    <>
      <View style={styles.topNavBar}>
        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 0}}>
          <TouchableOpacity
            style={{marginRight: 8, marginLeft: 5, paddingTop: 12}}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={32} color={'white'} />
          </TouchableOpacity>
          <Text style={styles.logotext}>Нэг дамжих зам</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaterialIcon
            name="bus"
            color={'#000'}
            size={32}
            style={[styles.busIcon, styles.circle]}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'black',
    paddingVertical: 20,
    paddingHorizontal: 6,
    flex: 1,
  },
  logotext: {
    marginLeft: 20,
    paddingTop: 5,
    color: 'white',
    fontSize: 22,
    lineHeight: 45,
    textAlign: 'center',
  },
  topNavBar: {
    height: 60,
    backgroundColor: '#279cd4',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  busIcon: {
    textAlign: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  circle: {
    width: 42,
    height: 42,
    borderRadius: 20,
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  line: {
    width: 36,
    height: 1,
    color: 'black',
    borderBottomWidth: 1,
    marginRight: 12,
    marginLeft: 8,
  },
});

export default DetailedOption;
