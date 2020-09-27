import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DiscoveryScreen } from './components/discovery/DiscoveryScreen'
import { SubmitScreen } from './components/submit/SubmitScreen'
import { data } from './mockData';

const Tab = createBottomTabNavigator()

export default function App () {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Find a Bin" component={DiscoveryScreen}/>
        <Tab.Screen name="Submit a Bin" component={SubmitScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}
