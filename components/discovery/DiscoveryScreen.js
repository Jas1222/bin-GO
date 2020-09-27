import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { data } from '../../mockData'
import * as Location from 'expo-location'
import { COLORS } from '../../Colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.PASTEL_TEAL
  },
  header: {
    fontSize: 30,
    marginTop: 50,
    color: COLORS.DARK_TEAL,
  },
  mapContainer: {
    margin: 20,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
})

// Extract into a utility
const regionFrom = (lat, lon, accuracy) => {
  const oneDegreeOfLongitudeInMeters = 111.32 * 1000
  const circumference = (40075 / 360) * 1000

  const latDelta = accuracy * (1 / (Math.cos(lat) * circumference))
  const lonDelta = (accuracy / oneDegreeOfLongitudeInMeters)

  return {
    latitude: lat,
    longitude: lon,
    latitudeDelta: Math.max(0, latDelta),
    longitudeDelta: Math.max(0, lonDelta)
  }
}

export const DiscoveryScreen = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
      }

      let location = await Location.getCurrentPositionAsync({})

      const transformedCoords = regionFrom(location.coords.latitude, location.coords.longitude, 150)

      setLocation(transformedCoords)
      setIsLoading(false)
    })()
  }, [])

  const renderBinLocations = () => {

    return data.map( (marker, index) => (
      <Marker coordinate={marker} key={index} pinColor={'green'} />
    ))
  }

  const renderMap = () => {
    if (isLoading) return (<Text> {'Loading'}</Text>)

    return (
      <MapView style={styles.mapContainer}
                     initialRegion={
                       {
                         latitude: location.latitude,
                         longitude: location.longitude,
                         latitudeDelta: location.latitudeDelta,
                         longitudeDelta: location.longitudeDelta
                       }
                     }>
        <Marker coordinate={{latitude: location.latitude, longitude: location.longitude}} />
        {renderBinLocations()}

      </MapView>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {'Bins Near Me'}
      </Text>

      {renderMap()}
    </View>
  )
}