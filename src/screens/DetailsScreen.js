import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Chip, withTheme, lightColors } from '@rneui/themed';
import { Icon } from '@rneui/themed';

const DetailsScreen = ({ navigation, route }) => {

    const [Resturant, setResturant] = useState(null)
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (route.params?.resturantDetails)
            setResturant(route.params?.resturantDetails)
        setLoading(false);
    }, [])

    return (
        <View style={{ flex: 1, padding: 20 }}>
            {isLoading ? <ActivityIndicator /> : (
                <View>
                    <Text style={styles.item}>Name: {Resturant.name}</Text>
                    <Text style={styles.item}>Address: {Resturant.name}</Text>
                    <Text style={styles.item}>Phone(s)</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {Resturant.phones.map((phNo, i) => {
                        return <Chip
                            title={phNo}
                            key={i}
                            type="outline"
                            containerStyle={{ marginVertical: 15, marginHorizontal: 5 }}
                        />

                    })}
                    </View>
                    <Text style={styles.item}>Description: {Resturant.name}</Text>
                    <Text style={styles.item}>TAGs</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {Resturant.tags.map((tag, i) => {
                            return <Chip
                                title={tag}
                                key={i}
                                type="outline"
                                containerStyle={{ marginVertical: 15, marginHorizontal: 5 }}
                            />

                        })}
                    </View>
                    <Button
                        title="View on Map"
                        onPress={() =>
                            navigation.navigate('Map', { resturantDetails: Resturant })
                        }
                    />
                </View>
            )}
        </View>
    )
}

export default DetailsScreen

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