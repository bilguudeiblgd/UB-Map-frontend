import React, {useState, useEffect, useRef} from 'react';
import data from '../Data/station_details.json';
import {SearchBar, Button} from 'react-native-elements';
import {
  TouchableOpacity,
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
} from 'react-native';
import {ScreenHeight} from 'react-native-elements/dist/helpers';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Station = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  let searchBarStart = null;
  let searchBarEnd = null;
  const [active, setActive] = useState(false);
  const [startStation, setStartStation] = useState('');
  const [startStationID, setStartStationID] = useState('');
  const [endStationID, setEndStationID] = useState('');
  const [endStation, setEndStation] = useState('');
  const [chosenStart, setChosenStart] = useState(false);
  const [chosenEnd, setChosenEnd] = useState(false);
  const [startSearchOnFocused, setStartSearchOnFocus] = useState(false);
  const [endSearchOnFocused, setEndSearchOnFocus] = useState(false);
  const stationData = data;
  // initializing the stations
  let stationListIni = [];
  for (let station of stationData) {
    stationListIni.push({
      id: station.id,
      name: station.name,
      longitude: station.longitude,
      latitude: station.latitude,
    });
  }
  const [stationList, setStationList] = useState(stationListIni);

  const updateStartSearch = text => {
    setStartStation(text);
    updateStationList(text);
  };
  const updateEndSearch = text => {
    setEndStation(text);
    updateStationList(text);
  };
  const updateStationList = text => {
    console.log(text);
    if (text == '') {
      setStationList(stationListIni);
    } else {
      let newArr = [];
      stationData.map(station => {
        if (station.name.startsWith(text)) {
          newArr.push({
            id: station.id,
            name: station.name,
            longitude: station.longitude,
            latitude: station.latitude,
          });
        }
      });

      setStationList(newArr);
    }
  };

  const cardClicked = (id, name) => {
    if (!chosenStart || startSearchOnFocused) {
      setStartStation(name);
      setStartStationID(id);
      setChosenStart(true);
      setStartSearchOnFocus(false);
      updateStationList("");
      searchBarEnd.focus();
    } else if (!chosenEnd || endSearchOnFocused) {
      if (startStation === endStation) return;
      setEndStation(name);
      setEndStationID(id);
      setChosenEnd(true);
      searchBarEnd.blur();
    } else {
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.search_bar_container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginRight: 32,
            alignItems: 'center',
          }}>
          <TextInput
            ref={search => (searchBarStart = search)}
            style={{
              borderWidth: 1,
              borderColor: '#A6A6A7',
              backgroundColor: 'white',
              borderRadius: 12,
              color: 'black',
              height: 40,
              padding: 10,
              width: '97%',
            }}
            placeholder="Суух буудал"
            placeholderTextColor={'grey'}
            onChangeText={updateStartSearch}
            value={startStation}
          />
          {startStation != '' ? (
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 0,
                zIndex: 1,
                marginRight: 12,
                alignSelf: 'center',
              }}
              onPress={() => {
                setChosenStart(false);
                searchBarStart.clear();
                setStartStation('');
                updateStationList('');
              }}>
              <MaterialIcon name="close" size={24} color={'black'} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity></TouchableOpacity>
          )}

          <MaterialIcon
            style={{marginLeft: 4, marginBottom: -12}}
            name="arrow-down-right"
            size={30}
            color={'#FFFFFF'}
          />
        </View>

        <View style={{margin: 8}}></View>

        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TextInput
            ref={search => (searchBarEnd = search)}
            style={styles.search_bar}
            placeholder="Очих буудал"
            placeholderTextColor={'grey'}
            onChangeText={updateEndSearch}
            value={endStation}
            clearButtonMode={'always'}
            clearTextOnFocus={true}
          />
          {endStation !== '' ? (
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 0,
                zIndex: 1,
                marginRight: 4,
                alignSelf: 'center',
              }}
              onPress={() => {
                setChosenEnd(false);
                searchBarEnd.clear();
                setEndStation(''), updateStationList('');
              }}>
              <MaterialIcon name="close" size={24} color={'black'} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity></TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{padding: 16}}>
        <View style={styles.card_container}>
          <FlatList
            data={stationList}
            renderItem={station => (
              <TouchableOpacity
                key={station.item.id}
                onPress={() => {
                  cardClicked(station.item.id, station.item.name);
                }}>
                <View style={styles.item_container}>
                  <Text
                    style={active ? styles.item_active : styles.item_notactive}>
                    {station.item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      {/* Check whether to sumnmon the bottom or not */}

      <View style={styles.direction_button_container}>
        <Button
          disabled={chosenEnd && chosenStart ? false : true}
          onPress={() => {
            navigation.navigate('Options', {startStationID, endStationID});
          }}
          containerStyle={{
            marginHorizontal: 16,
            marginBottom: 8,
          }}
          buttonStyle={{
            paddingVertical: 10,
            borderRadius: 12,
          }}
          title="Хайх"
          type="solid"
          icon={{
            name: 'arrow-right',
            type: 'font-awesome',
            color: 'white',
            size: 16,
          }}
          iconRight
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'grey',
    flex: 1,
    padding: 16,
  },
  search_bar_container: {
    backgroundColor: '#ffae00',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  search_bar: {
    borderWidth: 1,
    borderColor: '#A6A6A7',
    backgroundColor: 'white',
    borderRadius: 12,
    color: 'black',
    height: 40,
    width: '100%',
    padding: 10,
  },
  search_bar_text: {
    fontSize: 16,
  },

  card_container: {
    // padding: 16,
    backgroundColor: 'FFFFFF',
    height: ScreenHeight * 0.6,
    borderWidth: 0.5,
    borderColor: '#A6A6A7',
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomTopRadius: 10,
    overflow: 'hidden',
  },
  item_container: {
    padding: 16,
    borderColor: '#A6A6A7',
    borderBottomWidth: 0.5,
  },
  item_active: {
    color: 'green',
  },
  item_notactive: {
    color: 'black',
  },

  direction_button_container: {
    
    justifyContent: 'flex-end',

    marginBottom: 24,
  },
});

export default Station;
