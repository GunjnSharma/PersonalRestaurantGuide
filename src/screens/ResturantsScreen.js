import { FlatList, StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResturantsScreen = ({ navigation }) => {

    const [Resturants, setResturants] = useState([])

    useEffect(() => {
        try {
            AsyncStorage.getItem('resturantList').then((value)=>{
                const jsonValue = value ? JSON.parse(value) : null;
                if(jsonValue?.data){
                    setResturants(jsonValue.data)
                }
            })
        } catch (error) {
            console.log(error)
        }
       
    }, [])

    const removeResturant = (id) => {
        const remainingResturants = Resturants.filter((r)=> r.id !== id)
        setResturants(remainingResturants)
        const updatedJsonValue = JSON.stringify({data: remainingResturants})
        AsyncStorage.setItem('resturantList', updatedJsonValue).then((v)=>{
            
        })
    }
    

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding:8 }}>
            <FlatList
                data={Resturants}
                renderItem={({ item }) => (
                    <TouchableHighlight onPress={() => navigation.navigate('Details', { resturantDetails: item })} underlayColor="white">
                        <View style={{ flex: 1, flexDirection: 'row', margin: 5, justifyContent: 'space-between' }}>
                            <Text style={styles.item}>{item.name}</Text>
                            <Button title='EDIT' onPress={() =>
                                navigation.navigate('Edit Resturant', { resturantDetails: item })} />
                            <Button title='REMOVE' onPress={() =>{console.log("remove"); removeResturant(item.id)}
                                } />
                        </View>

                    </TouchableHighlight>
                )}
            />

        </View>
    )
}

export default ResturantsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: 'black'
    },
});