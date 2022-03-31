import React from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const DetailedOption = ({ route, navigation }) => {
    // const routes = 
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <TouchableOpacity style={{ marginRight: 8 }}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={32} color={"black"} />

                </TouchableOpacity>
                <Text style={{ color: "grey", fontSize: 16 }}>
                    Шууд очих автобус
                </Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <MaterialIcon name='bus' color={"#C0C0C0"} size={32} />
            </View>

            <View style={{marginHorizontal: 32, marginVertical: 12, borderWidth: 1, borderRadius:10, padding: 12}}>
                <View style={styles.sub_header_container}>
                    <Text style={styles.sub_header_text}>
                        Суух автобус
                    </Text>

                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        color: 'black',
        paddingVertical: 20,
        paddingHorizontal: 6
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

    card_container_text: {
        color: 'black',
        fontSize: 18
    },

})


export default DetailedOption