import React from 'react'
import { View, Text, ScrollView } from 'react-native';
import data from '../Data/bus_line_detail_start.json';

const Options = () => {
  let possibleRoutes = [];
  data.map((bus) => {
    for(let stations in bus.station_list)
    {

    }
  })

  return (
    <View>
        <Text>Welcome to options page</Text>
    </View>
  )
}

export default Options