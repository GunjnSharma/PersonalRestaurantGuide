import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Input } from '@rneui/themed';
import { AirbnbRating } from '@rneui/themed';
import { Button } from '@rneui/base';
import { Icon } from '@rneui/themed';
import { Chip, withTheme, lightColors } from '@rneui/themed';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';


const AddEditResturant = ({ navigation, route }) => {

    const initialResturant = {
        id: "",
        name: "",
        address: "",
        phones: [],
        description: '',
        tags: [],
        rating: 0,
        location:null
    }

    const [Rating, setRating] = useState(0)
    const [TagValue, setTagValue] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [Resturant, setResturant] = useState(initialResturant)

    const removeTag = (tagName) => {
        const remainingTags = Resturant.tags.filter((v) => v !== tagName)
        setResturant({ ...Resturant, tags: remainingTags })
    }

    const addTags = () => {
        if (TagValue)
            setResturant({ ...Resturant, tags: Resturant.tags.concat([TagValue]) })
        setTagValue('')
    }

    const removePhone = (phoneNo) => {
        const remainingPhoneNos = Resturant.phones.filter((v) => v !== phoneNo)
        setResturant({ ...Resturant, phones: remainingPhoneNos })
    }

    const addPhoneNo = () => {
        if (phoneNo)
            setResturant({ ...Resturant, phones: Resturant.phones.concat([phoneNo]) })
        setPhoneNo('')
    }

    const addEditResturant = async () => {
        if (!Resturant.id) {
            const idAdded = { ...Resturant, id: uuid.v4() }
            console.log(idAdded)
            // await AsyncStorage.removeItem('resturantList1')
            try {
                const value = await AsyncStorage.getItem('resturantList')
                const jsonValue = value ? JSON.parse(value) : null;
                console.log(jsonValue?.data)
                console.log(value)

                const updatedJsonValue = JSON.stringify({ data: jsonValue?.data ? jsonValue?.data.concat(idAdded) : [idAdded] })
                await AsyncStorage.setItem('resturantList', updatedJsonValue)
                navigation.navigate('Resturants')
            } catch (e) {
                // saving error
                console.log(e)
            }
        } else {
            // const editedResturant = Resturant
            try {
                const value = await AsyncStorage.getItem('resturantList')
                const jsonValue = value ? JSON.parse(value) : null;
                console.log(jsonValue?.data)
                console.log(value)

                const filteredResturants = jsonValue?.data.filter((v) => v.id !== Resturant.id)

                const updatedJsonValue = JSON.stringify({ data: jsonValue?.data ? filteredResturants.concat(Resturant) : [Resturant] })
                AsyncStorage.setItem('resturantList', updatedJsonValue).then((v) => {
                    navigation.navigate('Resturants')
                })
            } catch (e) {
                // saving error
                console.log(e)
            }
            console.log(Resturant)
        }
    }

    useEffect(() => {
        if (route.params?.resturantDetails)
            setResturant(route.params?.resturantDetails)
    }, [])

    const [currentLocation, setCurrentLocation] = useState({
        latitude: 35.6700,
        longitude: 139.6503,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    })

    useEffect(() => {
        Geolocation.getCurrentPosition((info) => {
            console.log(info)
            setCurrentLocation({ ...currentLocation, latitude: info.coords.latitude, longitude: info.coords.longitude })
            if (route.params?.resturantDetails){
                setResturant({...route.params?.resturantDetails, location:{ ...currentLocation, latitude: info.coords.latitude, longitude: info.coords.longitude }})
            } else {
               setResturant({...Resturant, location:{ ...currentLocation, latitude: info.coords.latitude, longitude: info.coords.longitude }})
            }
        });
    }, [])


    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 10 }}>
                <Input
                    placeholder='Name'
                    value={Resturant.name}
                    onChangeText={(v) => setResturant({ ...Resturant, name: v })}
                />
                <Input
                    placeholder='Address'
                    value={Resturant.address}
                    onChangeText={(v) => setResturant({ ...Resturant, address: v })}
                />
                <View style={{ display: 'flex', flexDirection: 'row', paddingLeft: 10, paddingRight: 15 }}>
                    <View style={{ flex: 2 }}>
                        <Input
                            placeholder='Phone(s)'
                            value={phoneNo}
                            onChangeText={(v) => setPhoneNo(v)}
                        />
                    </View>
                    <View style={{ flex: 1 }}><Button style={{ flex: 2 }} title="ADD" onPress={() => addPhoneNo()} /></View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {Resturant.phones.map((phNo, i) => {
                        return <Chip
                            title={phNo}
                            key={i}
                            icon={<Icon
                                name='close'
                                type='font-awesome'
                                color={lightColors.primary2}
                                iconProps={{ size: 20 }}
                                onPress={() => { removePhone(phNo) }} />}

                            iconRight
                            type="outline"
                            containerStyle={{ marginVertical: 15, marginHorizontal: 5 }}
                        />

                    })}
                </View>
                <Input
                    placeholder='Description'
                    value={Resturant.description}
                    onChangeText={(v) => setResturant({ ...Resturant, description: v })}
                />
                <View style={{ display: 'flex', flexDirection: 'row', paddingLeft: 10, paddingRight: 15 }}>
                    <View style={{ flex: 2 }}>
                        <Input
                            placeholder='TAGs'
                            value={TagValue}
                            onChangeText={(v) => setTagValue(v)}
                        />
                    </View>
                    <View style={{ flex: 1 }}><Button style={{ flex: 2 }} title="ADD" onPress={() => addTags()} /></View>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {Resturant.tags.map((tag, i) => {
                        return <Chip
                            title={tag}
                            key={i}
                            icon={<Icon
                                name='close'
                                type='font-awesome'
                                color={lightColors.primary2}
                                iconProps={{ size: 20 }}
                                onPress={() => { removeTag(tag) }} />}

                            iconRight
                            type="outline"
                            containerStyle={{ marginVertical: 15, marginHorizontal: 5 }}
                        />

                    })}
                </View>
                <AirbnbRating count={5} defaultRating={Resturant.rating} onFinishRating={(r) => { setRating(r); setResturant({ ...Resturant, rating: r }) }} />
                <View style={{ margin: 20 }}></View>
                <View style={{flex: 1,backgroundColor:'gray', width:'80%', height:150}}>
                    <MapView
                        initialRegion={Resturant.location}
                        style={styles.map}
                    >
                        <Marker coordinate={Resturant.location} />
                    </MapView>
                </View>
                <View style={{ margin: 20 }}></View>
                <Button title={'SUBMIT'} onPress={() => addEditResturant()} />
            </View>
        </ScrollView>
    )
}

export default AddEditResturant

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1, //the container will fill the whole screen.
      justifyContent: "flex-end",
      alignItems: "center",
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });