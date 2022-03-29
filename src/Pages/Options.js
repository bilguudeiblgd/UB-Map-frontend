import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import busRoutes from '../Data/bus_line_routes.json';
import graph from '../Data/station_graph.json';



const Options = ({ route, navigation }) => {
  const { startStationID, endStationID } = route.params;
  const { noTransitRoutes, setNoTransitRoutes} = useState([]);
  let possibleRoutes = new Map();
  
  // no transit

  noTransit = (start, end) => {

    for (let busID in busRoutes) {
      const routes = busRoutes[busID]
      let foundStart = false;
      let stops;

      for (let station of routes) {

        if (station === start) {
          foundStart = true;
          stops = 0;
        }
        if (foundStart && (station == end)) {
          stops++;
          let newArr = [...noTransitRoutes];
          newArr
          setNoTransitRoutes(arr => {});
          break;
        }
        stops++;
      }
    }
    return noTransitRoutes;
    // console.log(noTransitRoutes);
    // console.log([...noTransitRoutes])
  
  }

  const stationGraph = new Map(Object.entries(graph));
  useEffect(() => {
    let map = noTransit(startStationID, endStationID)
    console.log(map);
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
          console.log("rendering")
        }
        {
          [...noTransitRoutes].map((bus, index) => {
            console.log("shall be working")
            return <Text key={index}>{bus}:{noTransitRoutes.get(bus)}</Text>
          })
        }

      </View>
      {/* <View>
        <Text>
          Two Transit routes:
        </Text>
        {
          [...possibleRoutes.keys()].map((key, index) => {

            return <Text key={index}>{key}:{possibleRoutes.get(key)}</Text>
          })
          // [...possibleRoutes.values()].map((value, index) => console.log(value))
        }
      </View> */}

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