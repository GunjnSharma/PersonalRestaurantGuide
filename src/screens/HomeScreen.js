import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Button
                title="About"
                onPress={() =>
                    navigation.navigate('About')
                }
            />
            <Button
                title="Resturants"
                onPress={() =>
                    navigation.navigate('Resturants')
                }
            />
            <Button
                title="Add Resturant"
                onPress={() =>
                    navigation.navigate('Add Resturant', { resturantDetails: null })
                }
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})