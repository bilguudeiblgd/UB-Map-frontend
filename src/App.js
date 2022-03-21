import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, ScrollView } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Map from './Pages/Map.js';
import Station from './Pages/Station';
import Options from './Pages/Options';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';




const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Station'>
          <Stack.Screen name = "Station" component={Station}/>
          <Stack.Screen name = "Options" component={Options}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>



  )
}

export default App;