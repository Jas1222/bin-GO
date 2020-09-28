import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DiscoveryScreen } from './components/discovery/DiscoveryScreen'
import { SubmitScreen } from './components/submit/SubmitScreen'
import { initialiseFirebase } from './network/NetworkService'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from './Colors'
import { createStackNavigator } from '@react-navigation/stack'

const Tab = createBottomTabNavigator()

const DiscoveryStack = createStackNavigator()
const SubmitStack = createStackNavigator()

function MyDiscoveryStack () {
  return (
    <DiscoveryStack.Navigator>
      <DiscoveryStack.Screen name="Find a Bin" component={DiscoveryScreen}
                             options={{
                               title: 'BINS NEAR ME',
                               headerStyle: { backgroundColor: COLORS.PASTEL_TEAL },
                               headerTintColor: COLORS.DARK_TEAL,
                               headerTitleStyle: { fontWeight: 'bold' },
                               headerTitleAlign: 'center'
                             }}/>
    </DiscoveryStack.Navigator>

  )
}

function MySubmitStack () {
  return (
    <SubmitStack.Navigator>
      <SubmitStack.Screen name="Submit a Bin" component={SubmitScreen}
                          options={{
                            title: 'FOUND A BIN?',
                            headerStyle: { backgroundColor: COLORS.PASTEL_TEAL },
                            headerTintColor: COLORS.DARK_TEAL,
                            headerTitleStyle: { fontWeight: 'bold' },
                            headerTitleAlign: 'center'
                          }}/>
    </SubmitStack.Navigator>
  )
}

export default function App () {
  initialiseFirebase()

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {

            let iconName

            if (route.name === 'Find a Bin') {
              iconName = 'md-search'
            } else if (route.name === 'Submit a Bin') {
              iconName = 'ios-send'
            }
            return <Ionicons name={iconName} size={size} color={color}/>
          }
        })}
        tabBarOptions={{
          activeTintColor: COLORS.LIGHT_RED,
          inactiveTintColor: COLORS.DARK_TEAL,
        }}
      >
        <Tab.Screen name="Find a Bin" component={MyDiscoveryStack}/>
        <Tab.Screen name="Submit a Bin" component={MySubmitStack}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}
