import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, ScrollView } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Map from './Components/Map.js';
import StationList from './Components/StationList';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Map") {
                iconName = "map"
              } else if(route.name === 'Stations')
              {
                iconName = "bus"
              }
              return <FontAwesome5 name={iconName} size={size} color={color}/>;
            }
          })
          }
        >
          <Tab.Screen name="Map" component={Map} />
          <Tab.Screen name="Stations" component={StationList} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>



  )
}

export default App;