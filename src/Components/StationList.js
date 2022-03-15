import React, {useState} from 'react'
import data from '../Data/station_details.json';
import { SearchBar } from 'react-native-elements';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

const StationList = () => {
    const[search, setSearch] = useState("");

    const updateSearch = (search) => {
        setSearch(search);
    }

    const stationList = data;

    return (
        <View style={styles.container} >
            <SearchBar
                placeholder='Баянмонгол хороолол'
                onChangeText={updateSearch}
                value={search}
            />
            
            <ScrollView>
                {stationList.map(
                    function (station, index) {
                        if(station.name.startsWith(search)){
                            return <Text key={index}>{station.name}</Text>
                        }
                    }
                )
                }
            </ScrollView>


        </View>


    )
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: 'black'
    }
})

export default StationList;

// (station) => {
//     <Text key={station.id}>
//         {station.name};
//     </Text>
// }