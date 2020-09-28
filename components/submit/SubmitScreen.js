import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, Dimensions, Alert } from 'react-native'
import { COLORS } from '../../Colors'
import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps'
import { regionFrom } from '../../utils/MapUtils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.PASTEL_TEAL
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    color: COLORS.DARK_TEAL,
    marginBottom: 10,
    marginTop: 15
  },
  subheader: {
    fontSize: 15,
    color: COLORS.MUTE_TEAL,
    textAlign: 'center',
    marginBottom: 10
  },
  mapContainer: {
    margin: 20,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

export const SubmitScreen = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [pinLocation, setPinLocation] = useState(undefined)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
      }

      let location = await Location.getCurrentPositionAsync({})

      const transformedCoords = regionFrom(location.coords.latitude, location.coords.longitude, 80)

      setLocation(transformedCoords)
      setIsLoading(false)
    })()
  }, [])

  const onDragEnd = (e) => {
    setPinLocation(e.nativeEvent.coordinate)
  }

  const onSubmitPress = () => {
      Alert.alert('Sent!', 'Thank you for contributing, every bin you find increases the chances of less litter on our streets.')
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
        <Marker draggable
                coordinate={location}
                title={"The bin I found"}
                description={"Happy? Press submit above!"}
                onDragEnd={(e) => onDragEnd(e)}
        />
      </MapView>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}> {'Near a bin but we haven\'t recorded it?'}</Text>
      <Text style={styles.subheader}> {'Drag and drop the marker below as close to the bin as possible, then just press Submit!'}</Text>
      <Button title={'Submit'} color={COLORS.LIGHT_RED} onPress={onSubmitPress} disabled={typeof pinLocation == 'undefined'}/>
      {renderMap()}
    </View>
  )
}