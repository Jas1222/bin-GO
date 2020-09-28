import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DiscoveryScreen } from './components/discovery/DiscoveryScreen'
import { SubmitScreen } from './components/submit/SubmitScreen'
import { initialiseFirebase } from './network/NetworkService'

const Tab = createBottomTabNavigator()

export default function App () {
  initialiseFirebase()

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Find a Bin" component={DiscoveryScreen}/>
        <Tab.Screen name="Submit a Bin" component={SubmitScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}
