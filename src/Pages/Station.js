import React, { useState, useEffect } from 'react'
import data from '../Data/station_details.json';
import { SearchBar, Button } from 'react-native-elements';
import { TouchableOpacity, Pressable, ScrollView, Text, View, StyleSheet } from 'react-native';

const Station = ({ navigation }) => {

    const [active, setActive] = useState(false);
    const [startStation, setStartStation] = useState("");
    const [startStationID, setStartStationID] = useState("");
    const [endStationID, setEndStationID] = useState("");
    const [endStation, setEndStation] = useState("");
    const [chosenStart, setChosenStart] = useState(false);
    const [chosenEnd, setChosenEnd] = useState(false);
    const updateStartSearch = (startStation) => {
        setStartStation(startStation);
    }
    const updateEndSearch = (endStation) => {
        setEndStation(endStation);
    }

    const stationList = data;



    const cardClicked = (id, name) => {
        if (!chosenStart) {
            setStartStation(name);
            setStartStationID(id);
            setChosenStart(true);
        }
        else if (!chosenEnd) {
            if(startStation === endStation) return;
            setEndStation(name);
            setEndStationID(id);
            setChosenEnd(true);
        }
        else {

        }
    }

    return (
        <View style={styles.container} >
            {/* <View  style={styles.search_bar_container}> */}
                <View style={styles.search_bar_container}>
                    <SearchBar
                        lightTheme
                        placeholder='Эхлэл'
                        onChangeText={updateStartSearch}
                        value={startStation}
                        showCancel
                        searchIcon={false}
                        inputStyle={styles.search_bar_text}
                        containerStyle={styles.search_bar_ind_container}
                        inputContainerStyle={{ height: 40, width: 260,borderRadius: 20 }}
                        onClear={() => setChosenStart(false)}
                    />
                    <SearchBar
                        lightTheme
                        placeholder='Төгсгөл'
                        onChangeText={updateEndSearch}
                        value={endStation}
                        showCancel
                        searchIcon={false}
                        inputStyle={styles.search_bar_text}
                        containerStyle={styles.search_bar_ind_container}
                        inputContainerStyle={{ height: 40, borderRadius: 20 }}
                        onClear={() => setChosenEnd(false)}
                    />
                {/* </View> */}
            </View>
            <ScrollView style={styles.card_container}>
                {stationList.map(
                    function (station, index) {

                        if (station.name.startsWith(chosenStart ? endStation : startStation)) {
                            return (
                                <TouchableOpacity
                                    key={index}

                                    onPress={() => {
                                        cardClicked(station.id, station.name);
                                    }}
                                >
                                    <View style={index == 0 ? {
                                        borderBottomWidth: 0.5,
                                        borderLeftWidth: 0.5,
                                        borderRightWidth: 0.5,
                                        borderTopWidth: 0.5,
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        padding: 16
                                    } : styles.item_container}>
                                        <Text style={active ? styles.item_active : styles.item_notactive}>{station.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    }
                )
                }
            </ScrollView>
            {/* Check whether to sumnmon the bottom or not */}

            <View style={(chosenEnd && chosenStart) ? styles.direction_button_container : { display: 'none' }}>
                <Button
                    onPress={() => {
                        navigation.navigate('Options', { startStationID, endStationID })
                    }}
                    containerStyle={{
                        width: 200,
                        marginBottom: 8

                    }}
                    buttonStyle={{
                        borderRadius: 30
                    }}
                    title="Direction" type="solid" icon={{ name: "arrow-right", type: 'font-awesome', color: 'white', size: 16 }} iconRight />
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'grey',
        flex: 1,
    },
    search_bar_container: {
        padding: 24,
        backgroundColor: "#4D96FF"
    },
    search_bar_ind_container: {
        backgroundColor: "transparent",
        border: "none",
        outline: "none"
    },
    card_container: {
        padding: 16
    },
    item_container: {
        padding: 16,
        borderBottomWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
       
    },
    item_active: {
        color: 'green'
    },
    item_notactive: {
        color: "black"
    },
    search_bar_container: {
        paddingTop: 10,
        paddingHorizontal: 24,
    },
    search_bar_text: {
        fontSize: 16,
    },
    search_bar: {

    },
    direction_button_container: {
        position: "absolute",
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },


})

export default Station;

