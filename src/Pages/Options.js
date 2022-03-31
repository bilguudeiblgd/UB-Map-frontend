import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import busRoutes from '../Data/bus_line_routes.json';
import graph from '../Data/station_graph.json';
import busInfo from '../Data/bus_line_detail_start.json';
import stationInfo from '../Data/bus_station_id_info.json';
import busInStation from '../Data/bus_in_stations.json';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIc from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Options = ({ route, navigation }) => {
  const { startStationID, endStationID } = route.params;
  // dev
  // const startStationID = "000000004" // sapporo
  // const endStationID = "000000273" // ih delguur
  let noTransitRoutes = new Map();
  let possibleRoutes = new Map();

  // no transit
  for (let item of Object.entries(busRoutes)) {
    const [busID, routes] = item;

    let stops;
    let foundStart;
    for (let station of routes) {
      if (station === startStationID) {
        foundStart = true;
        stops = 0;
      }
      if (foundStart && station == endStationID) {
        stops++;
        noTransitRoutes.set(busID, stops);
        break;
      }
      stops++;
    }
  }

  const stationGraph = new Map(Object.entries(graph));
  useEffect(() => { }, []);

  function oneTransitRoutes(start, end) {
    // to find 1 transit routes
    // go to station graph
    // go to the starting node
    // check the next nodes
    // while checking the next nodes go to the each bus
    // when going through each bus, check whether they have the END route in their possible routes
    // if they have. Choose that bus
    const queue = [start];
    const visited = new Set();
    while (queue.length > 0) {
      const station = queue.shift();
      const nextStations = stationGraph.get(station);
      for (const next of nextStations) {
        if (next === endStationID) {
          console.log('found it');
        }
        if (!visited.has(next)) {
          queue.push(next);
          visited.add(next);
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity
          style={{ marginRight: 8 }}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={32} color={'black'} />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIc
              name="trip-origin"
              size={20}
              color={'#ffae00'}
              style={{ marginRight: 4 }}
            />
            <TextInput
              value={stationInfo[startStationID].station_name}
              style={{
                borderWidth: 1,
                borderColor: '#A6A6A7',
                backgroundColor: 'white',
                borderRadius: 12,
                color: 'black',
                height: 40,
                padding: 10,
                width: '80%',
              }}
            />
          </View>
          <TouchableOpacity>
            <FontAwesome5
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                marginRight: 12,
                transform: [{ rotate: '90deg' }],
              }}
              name="exchange-alt"
              size={16}
              color={'black'}
            />
          </TouchableOpacity>
          <View
            style={{
              marginVertical: -8,
              justifyContent: 'center',
              marginLeft: 2,
            }}>
            <Entypo
              style={{ marginVertical: -5 }}
              name="dot-single"
              size={16}
              color={'#818181'}
            />
            <Entypo
              style={{ marginVertical: -5 }}
              name="dot-single"
              size={16}
              color={'#818181'}
            />
            <Entypo
              style={{ marginVertical: -5 }}
              name="dot-single"
              size={16}
              color={'#818181'}
            />
            <Entypo
              style={{ marginVertical: -5 }}
              name="dot-single"
              size={16}
              color={'#818181'}
            />
            <Entypo
              style={{ marginVertical: -5 }}
              name="dot-single"
              size={16}
              color={'#818181'}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              name="md-location-sharp"
              size={20}
              color={'#ffae00'}
              style={{ marginRight: 4 }}
            />
            <TextInput
              value={stationInfo[endStationID].station_name}
              style={{
                borderWidth: 1,
                borderColor: '#A6A6A7',
                backgroundColor: 'white',
                borderRadius: 12,
                color: 'black',
                height: 40,
                padding: 10,
                width: '80%',
              }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#A6A6A7',
          marginBottom: 16,
        }}></View>
      <View style={{ paddingHorizontal: 8 }}>
        <View>
          <View style={styles.sub_header_container}>
            <Text style={styles.sub_header_text}>Шууд очих автобус</Text>
          </View>

          <TouchableOpacity style={styles.card_container}
            onPress={() => { navigation.navigate('DetailedOption', { noTransitRoutes }) }
            }>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <MaterialIcon
                  name="bus"
                  color={'#ff9300'}
                  size={32}
                  style={styles.busIcon}
                />
                {[...noTransitRoutes.keys()].map((id, index) => {
                  if (index >= 5) return;
                  return (
                    <View key={index} style={styles.busSignBorder}>
                      <Text style={styles.card_container_text}>
                        {busInfo[id].line_name.split(' ')[0]}
                      </Text>
                    </View>
                  );
                })}
              </View>

              <MaterialIcon name="arrow-right" size={32} style={styles.arrow} />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.sub_header_container}>
            <Text style={styles.sub_header_text}>Нэг дамжих зам</Text>
          </View>
          <TouchableOpacity
            style={styles.card_container}
            onPress={() => {
              navigation.navigate('DetailedOption', {});
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialIcon
                name="bus"
                color={'#ff9300'}
                size={32}
                style={styles.busIcon}
              />
              <View style={styles.busSignBorder}>
                <Text style={styles.card_container_text}>Ч:01</Text>
              </View>
              <View style={styles.busSignBorder}>
                <Text style={styles.card_container_text}>Ч:03</Text>
              </View>
              <View style={styles.line}></View>
              <MaterialIcon name="bus" color={'#ff9300'} size={32} />
              <View style={styles.busSignBorder}>
                <Text style={styles.card_container_text}>Ч:01</Text>
              </View>
            </View>
            <MaterialIcon name="arrow-right" size={32} style={styles.arrow} />
          </TouchableOpacity>
        </View>

        <View>
          <View style={styles.sub_header_container}>
            <Text style={styles.sub_header_text}>Хоёр дамжих зам</Text>
          </View>

          <TouchableOpacity
            style={styles.card_container}
            onPress={() => {
              navigation.navigate('DetailedOption', {});
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialIcon
                name="bus"
                color={'#ff9300'}
                size={32}
                style={styles.busIcon}
              />
              {[...noTransitRoutes.keys()].map((id, index) => {
                if (index >= 5) return;
                return (
                  <View key={index} style={styles.busSignBorder}>
                    <Text style={styles.card_container_text}>
                      {busInfo[id].line_name.split(' ')[0]}
                    </Text>
                  </View>
                );
              })}
            </View>

            <MaterialIcon name="arrow-right" size={32} style={styles.arrow} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    color: 'black',
    paddingVertical: 20,
    paddingHorizontal: 6,
    // flex: 1
  },
  sub_header_container: {
    backgroundColor: '#279cd4',
    borderRadius: 8,
    paddingHorizontal: 14,
    width: 200,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  sub_header_text: {
    color: 'white',
    fontSize: 16,
  },
  card_container: {
    backgroundColor: 'white',
    borderColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    height: 64,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 5,
  },
  card_container_text: {
    color: 'black',
    fontSize: 18,
  },
  busSignBorder: {
    borderColor: '#818181',
    width: 50,
    borderWidth: 1,
    padding: 4,
    marginLeft: 5,
    borderRadius: 10,
  },
  busIcon: {
    marginLeft: 5,
  },
  line: {
    width: 36,
    height: 1,
    color: 'black',
    borderBottomWidth: 1,
    marginRight: 12,
    marginLeft: 8,
  },
  arrow: {
    color: '#ff9300',
  },
});

export default Options;
