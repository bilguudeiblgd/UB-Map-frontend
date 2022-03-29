import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import busRoutes from '../Data/bus_line_routes.json';
import graph from '../Data/station_graph.json';



const Options = ({ route, navigation }) => {
  const { startStationID, endStationID } = route.params;
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

  function BFS(start) {
    let queue = [start];


    let visited = new Set();

    while (queue.length > 0) {


      const station = queue.shift();
      const nextStations = stationGraph.get(station);

      for (const nextStation in nextStations) {

        if (nextStation == endStationID) {
          // console.log("found it ");

        }
        if (!visited.has(nextStation)) {
          visited.add(nextStation);
          queue.push(nextStation);
        }
      }
    }
  }


  return (
    <View style={styles.container}>
      <Text>Is it working</Text>
      <View>
        <Text>
          No Transit routes:
        </Text>
        {
          [...noTransitRoutes.keys()].map((id, index) => {
            console.log("shall be working")
            return <Text key={index}>{id}:{noTransitRoutes.get(id)}</Text>
          })
        }

      </View>
      <View>
        <Text>
          Two Transit routes:
        </Text>
        {
          [...possibleRoutes.keys()].map((key, index) => {

            return <Text key={index}>{key}:{possibleRoutes.get(key)}</Text>
          })
          // [...possibleRoutes.values()].map((value, index) => console.log(value))
        }
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    flex: 1
  }
})

export default Options