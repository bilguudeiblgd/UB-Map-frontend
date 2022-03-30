import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import busRoutes from '../Data/bus_line_routes.json';
import graph from '../Data/station_graph.json';
import busInfo from '../Data/bus_line_detail_start.json';
import busInStation from '../Data/bus_in_stations.json';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

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
      if (foundStart && (station == endStationID)) {
        stops++;
        noTransitRoutes.set(busID, stops);
        break;
      }
      stops++;
    }
  }



  const stationGraph = new Map(Object.entries(graph));
  useEffect(() => {


  }, [])

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
          console.log("found it");
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

      <View>
        <View style={styles.sub_header_container}>
          <Text style={styles.sub_header_text}>
            Шууд очих автобус
          </Text>
        </View>

        <TouchableOpacity style={styles.card_container}
          onPress={() => { navigation.navigate('DetailedOption', {}) }
          }>
          {/* <Text style={styles.card_container_text}>{id}:{noTransitRoutes.get(id)}</Text> */}
          <MaterialIcon name='bus' color={"#C0C0C0"} size={32} />
          {
            [...noTransitRoutes.keys()].map((id, index) => {

              return (<View key={index} style={{ borderWidth: 1, padding: 4, marginRight: 8 }}>
                <Text style={styles.card_container_text}>{
                  ((busInfo[id].line_name).split(' '))[0]
                }</Text>
              </View>)
            })
          }

        </TouchableOpacity>




      </View>
      <View>
        <View style={styles.sub_header_container}>
          <Text style={styles.sub_header_text}>
            Нэг дамжих зам
          </Text>
        </View>
        <TouchableOpacity style={styles.card_container} onPress={() => { navigation.navigate('DetailedOption', {}) }
        }>
          {/* <Text style={styles.card_container_text}>{id}:{noTransitRoutes.get(id)}</Text> */}
          <MaterialIcon name='bus' color={"#C0C0C0"} size={32} />
          <View style={{ borderWidth: 1, padding: 4, marginRight: 8 }}>
            <Text style={styles.card_container_text}>Ч:01</Text>
          </View>
          <View style={{ borderWidth: 1, padding: 4, marginRight: 8 }}>
            <Text style={styles.card_container_text}>Ч:03</Text>
          </View>
          <View style={styles.line}></View>
          <MaterialIcon name='bus' color={"#C0C0C0"} size={32} />
          <View style={{ borderWidth: 1, padding: 4, marginRight: 8 }}>
            <Text style={styles.card_container_text}>Ч:01</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    color: 'black',
    padding: 20
    // flex: 1
  },
  sub_header_container: {
    backgroundColor: "#D4D4D4",
    borderRadius: 8,
    paddingHorizontal: 14,
    width: 200,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  sub_header_text: {
    color: 'black',
    fontSize: 16
  },
  card_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    height: 64,
    marginBottom: 24
  },
  card_container_text: {
    color: 'black',
    fontSize: 18
  },
  line: {
    width: 36,
    height: 1,
    color: 'black',
    borderBottomWidth: 1,
    marginRight: 12,
    marginLeft: 8
  }
})

export default Options