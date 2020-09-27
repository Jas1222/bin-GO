import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../../Colors'
import * as Location from 'expo-location'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PASTEL_TEAL
  },
  header: {
    fontSize: 30,
    // alignSelf: 'center',
    color: COLORS.DARK_TEAL
  }
})

export const SubmitScreen = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0 })

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
      }

      let location = await Location.getCurrentPositionAsync({})

      setLocation(location)
    })()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}> {"Submit a bin location!"}</Text>
    </View>
  )
}