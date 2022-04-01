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
import busInfo from '../Data/bus_line_detail_start.json';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import stationInfo from '../Data/bus_station_id_info.json';

const DetailedOption = ({ route, navigation }) => {
  const startStationID = route.params.startStationID;
  const endStationID = route.params.endStationID;
  const parameter = route.params.data;

  const transit = route.params.transit;
  console.log(parameter);
  return (
    <>
      <View style={styles.topNavBar}>

        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 0 }}>
          <TouchableOpacity
            style={{ marginRight: 8, marginLeft: 5, paddingTop: 12 }}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={32} color={'white'} />
          </TouchableOpacity>
          <Text style={styles.logotext}>Нэг дамжих зам</Text>
        </View>
      </View>
      {transit == 0 ?
        <ScrollView style={styles.container}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View
              style={{
                width: 30,
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: 8,
              }}>

              <MaterialIcon
                name="bus"
                color={'#000'}
                size={32}
                style={[styles.busIcon, styles.circle]}
              />
              <View style={{ backgroundColor: '#2594D1', flex: 1, height: 'auto', width: 20, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, }}>

              </View>
              <View style={{ position: 'absolute', bottom: 8, width: 14, height: 14, backgroundColor: "#ffffff", borderRadius: 12 }}></View>
            </View>
            {/* card */}
            <View style={{ flex: 1 }}>
              <Text style={styles.header_text}>{stationInfo[startStationID].station_name}</Text>
              {/* iterate */}
              {

                [...data.keys()].map((bus, index) => {
                  if (index > 4) return <View key={index}></View>
                  else return (<View key={index} style={{ marginTop: 8 }}>
                    <View style={{ borderBottomWidth: 0.5 }}></View>
                    <View style={{ flexDirection: 'row', marginTop: 12, alignItems: 'center' }}>

                      <LinearGradient colors={['#FFC200', "#FFBE00", '#FF9F00']} style={styles.direction_box}>
                        <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
                          {busInfo[bus].line_name.split(' ')[0]}
                        </Text>
                      </LinearGradient>
                      <Text style={{ color: 'black', marginLeft: 6, fontSize: 14 }}>
                        {(busInfo[bus].line_name.split(' ')).slice(1).join(' ')}
                      </Text>

                    </View>
                    <View style={{ marginTop: 4, marginLeft: 12 }}>
                      <Text style={{ color: '#3A8A22' }}>Ирэх хугацаа - {(Math.floor(Math.random() * 10))} мин</Text>
                    </View>
                  </View>)
                })
              }


              {/* End */}

              <View style={{ borderTopWidth: 0.5, marginTop: 16, paddingTop: 10 }}>
                <Text style={styles.header_text}>
                  {stationInfo[endStationID].station_name}
                </Text>
              </View>

            </View>
          </View>
          {/* Bottom navigation */}




        </ScrollView>
        // else
        :
        <ScrollView style={styles.container}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View
              style={{
                width: 30,
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: 8,
              }}>

              <MaterialIcon
                name="bus"
                color={'#000'}
                size={32}
                style={[styles.busIcon, styles.circle]}
              />
              <View style={{ backgroundColor: '#2594D1', flex: 1, height: 'auto', width: 20, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, }}>

              </View>
              <View style={{ position: 'absolute', bottom: 8, width: 14, height: 14, backgroundColor: "#ffffff", borderRadius: 12 }}></View>
            </View>
            {/* card */}
            <View style={{ flex: 1 }}>
              <Text style={styles.header_text}>{stationInfo[startStationID].station_name}</Text>
              {/* iterate */}
              {

                (parameter.data).map((item, index) => {
                  console.log(item);
                  if (index > 4) return <View key={index}></View>
                  else return (<View key={index} style={{ marginTop: 8 }}>
                    <View style={{ borderBottomWidth: 0.5 }}></View>
                    <View style={{ flexDirection: 'row', marginTop: 12, alignItems: 'center' }}>

                      <LinearGradient colors={['#FFC200', "#FFBE00", '#FF9F00']} style={styles.direction_box}>
                        <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
                          {busInfo[item[0]].line_name.split(' ')[0]}
                        </Text>
                      </LinearGradient>
                      <Text style={{ color: 'black', marginLeft: 6, fontSize: 14 }}>
                        {(busInfo[item[0]].line_name.split(' ')).slice(1).join(' ')}
                      </Text>

                    </View>
                    <View style={{ marginTop: 4, marginLeft: 12 }}>
                      <Text style={{ color: '#3A8A22' }}>Ирэх хугацаа - {(Math.floor(Math.random() * 10))} мин</Text>
                    </View>
                  </View>)
                })
              }


              {/* End */}

              <View style={{ borderTopWidth: 0.5, marginTop: 16, paddingTop: 10 }}>
                <Text style={styles.header_text}>
                  {stationInfo[endStationID].station_name}
                </Text>
              </View>



            </View>

          </View>
          
          <View style={{flexDirection: 'row', margin: 16}}>
            <FontAwesome5
              style={{
               
                marginRight: 12,

              }}
              name="exchange-alt"
              size={24}
              color={'black'}
            />
            <Text style={[styles.header_text, {fontSize: 20}]}>Дамжина</Text>
          </View>


        </ScrollView>

      }

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
  header_text: {
    color: '#252525',
    fontWeight: 'bold',
    fontSize: 24
  },
  direction_box: {
    borderRadius: 12,
    width: 46,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',

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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  busIcon: {
    textAlign: 'center',
    justifyContent: 'center',
    padding: 5,
    position: 'absolute',
    zIndex: 9999,
    top: 0,
  },
  circle: {
    width: 42,
    height: 42,
    borderRadius: 20,
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
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
