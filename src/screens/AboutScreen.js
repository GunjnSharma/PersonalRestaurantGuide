import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const AboutScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <View>
                <Text style={{ fontSize: 18, color: 'black' }}>Member: Gunjan Sharma</Text>
                <Text style={{ fontSize: 18, color: 'black' }}>ID: 101377804</Text>
                {/* <Text style={{ fontSize: 18, color: 'black' }}>Member: Name</Text>
                <Text style={{ fontSize: 18, color: 'black' }}>Member: Name</Text> */}
            </View>
        </View>
    )
}

export default AboutScreen

const styles = StyleSheet.create({})