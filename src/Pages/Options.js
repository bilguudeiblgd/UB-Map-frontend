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
  const stationGraph = new Map(Object.entries(graph));
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
  // one transit
  let oneTransit = findOneTransit();

  function findMinumumStep(start, end) {
    const queue = [start];
    const visited = new Set();

    let possibleBus = new Map();
    const edges = [];
    edges[start] = 0;
    const predecessors = [];
    predecessors[start] = null;
    const buildPath = (start, end, predecessors) => {

      const stack = [];
      stack.push(end);

      let u = predecessors[end];

      while (u != start) {
        stack.push(u);
        u = predecessors[u];
      }

      stack.push(start);

      let path = stack.reverse();

      return path;
    }

    while (queue.length > 0) {
      let stops = 0;
      const station = queue.shift();
      const nextStations = stationGraph.get(station);

      if (station == end) {
        return buildPath(start, end, predecessors);
      }


      for (const next in nextStations) {

        if (!visited.has(next)) {
          queue.push(next);
          visited.add(next);
          edges[next] = edges[station] + 1;
          predecessors[next] = station;
        }
      }

    }

  }

  function findOneTransit() {

    const path = findMinumumStep(startStationID, endStationID);

    // Go to graph
    // See the buses that goes to the stations
    // Go to next station. If eliminate bus that aren't there
    // We can get the MOST PROLONGED Bus later on

    // put it bus into a map;
    let currentBus = stationGraph.get(path[0])[path[1]];
    let possibleBus = new Map();
    currentBus.forEach((bus) => {
      possibleBus.set(bus, [0]);
    });
    let allBus = new Map(possibleBus);
    let busInStation = [currentBus];

    for (let i = 1; i < path.length - 1; i++) {

      let nextBus = stationGraph.get(path[i])[path[i + 1]];

      nextBus.forEach((bus) => {
        if (!busInStation[i]) busInStation[i] = []
        else busInStation[i].push(bus);
        if (allBus.has(bus)) {
          // console.log("bus:" + bus + ": to get from: " + path[i] + " to -> " + path[i + 1]);
          let pastRoute = allBus.get(bus);
          pastRoute.push(i);
          allBus.set(bus, pastRoute);
        }
        else {
          allBus.set(bus, [i]);
        }
        // preBus equals bus with the most score

      });

    }


    let oneTransitFuc = [];

    let allPath = new Set();
    for (let item of allBus) {
      // take two arrays

      const [key, arr] = item;
      if (arr.length == path.length - 1) {
        allBus.delete(key);
        continue;
      }
      arr.forEach((item) => {
        allPath.add(item);
      });
      for (let item1 of allBus) {
        const [key1, arr1] = item1;
        if (arr1.length == path.length - 1) {
          allBus.delete(key1);
          continue;
        }
        arr1.forEach((itema) => {
          allPath.add(itema);
        });

        if (item != item1) {
          if (allPath.size == path.length - 1) {
            oneTransitFuc.push(item);
            oneTransitFuc.push(item1);
          }
        }
        arr1.forEach((item) => {
          allPath.delete(item);
        })

      }
      // put them into a set

    }
    console.log(oneTransitFuc);
    return { data: oneTransitFuc, names: path };
  }

  // one transit start bus

  let oneStartBus = [];
  let len = oneTransit.data.length > 4 ? 4 : oneTransit.data.length
  for (let i = 0; i < len; i = i + 2) {

    if (oneTransit.data[i][1][0] == 0) {

      oneStartBus.push([oneTransit.data[i][0], oneTransit.data[i + 1][0]]);
    }
    else {
      oneStartBus.push([oneTransit.data[i + 1][0], oneTransit.data[i][0]]);
    }
  }
  console.log(":" + oneStartBus);



  return (
    <View style={styles.container}>
      <ScrollView>
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
              onPress={() => { console.log(stationInfo[endStationID].station_name); navigation.navigate('DetailedOption', { "startStationID": startStationID, "endStationID": endStationID, "transit": 0, "data": noTransitRoutes }) }
              }>
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <View
                  style={{
                    display: 'flex',
                    flex: 1,
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
                    if (index >= 3) return;
                    return (
                      <View key={index} style={styles.busSignBorder}>
                        <Text style={styles.card_container_text}>
                          {busInfo[id].line_name.split(' ')[0]}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <View>
                  <MaterialIcon name="arrow-right" size={32} style={styles.arrow} />
                </View>

              </View>
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.sub_header_container}>
              <Text style={styles.sub_header_text}>Нэг дамжих зам</Text>
            </View>
            {

              oneStartBus.map((busID, index) => {
                console.log(busID);
                return <TouchableOpacity
                  key={index}
                  style={styles.card_container}
                  onPress={() => {
                    navigation.navigate('DetailedOption', { "startStationID": startStationID, "endStationID": endStationID, "transit": 1, "data": oneTransit });
                  }}>
            <View
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialIcon
                name="bus"
                color={'#ff9300'}
                size={32}
                style={styles.busIcon}
              />
              {


              }
              <View style={styles.busSignBorder}>
                <Text style={styles.card_container_text}> {busInfo[busID[0]].line_name.split(' ')[0]}</Text>
              </View>

              <View style={styles.line}></View>
              <MaterialIcon name="bus" color={'#ff9300'} size={32} />
              <View style={styles.busSignBorder}>
                <Text style={styles.card_container_text}> {busInfo[busID[1]].line_name.split(' ')[0]}</Text>
              </View>
            </View>
            <MaterialIcon name="arrow-right" size={32} style={styles.arrow} />
          </TouchableOpacity>
              })
            }

        </View>

        <View>
          <View style={styles.sub_header_container}>
            <Text style={styles.sub_header_text}>Бага зам туулах</Text>
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
                if (index >= 3) return;
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
      </ScrollView >

    </View >
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
    textAlign: 'center',
    fontSize: 18,
  },
  busSignBorder: {
    borderColor: '#818181',
    width: 55,

    borderWidth: 1,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 8
  },
  busIcon: {
    marginLeft: 5,
  },
  line: {
    flex: 1,
    height: 1,
    color: 'black',
    borderBottomWidth: 1,
    marginRight: 12,
    marginLeft: 8,
  },
  arrow: {
    marginLeft: 12,
    color: '#ff9300',
  },
});

export default Options;
