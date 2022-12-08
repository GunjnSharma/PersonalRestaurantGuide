import { StyleSheet, Text, View, Button,Dimensions } from 'react-native'
import React,{useState,useEffect} from 'react'
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';

const MapScreen = ({ navigation, route }) => {

  const [currentLocation, setCurrentLocation]=useState({
    latitude: 35.6700,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  })

      useEffect(() => {
        Geolocation.getCurrentPosition((info) => {
          console.log(info)
          setCurrentLocation({...currentLocation, latitude:info.coords.latitude,longitude:info.coords.longitude})
        });
      }, [])
      

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <MapView
              initialRegion={route.params?.resturantDetails.location}
                style={styles.map}
            >
                <Marker coordinate={route.params?.resturantDetails.location} />
            </MapView>
            {/* <Text style={{position: "absolute", bottom: 50, fontSize:20, color:'black'}}>{currentLocation.latitude}</Text> */}
        </View>
    )
}

export default MapScreen

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