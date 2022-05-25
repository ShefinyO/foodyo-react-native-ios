import React from 'react';
import Home from './Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Orders from './Orders';
import Account from './Account';
import Ionicons from "react-native-vector-icons/Ionicons";


const Tab = createBottomTabNavigator();

const TabStack=()=>{
    return(

        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown:false,  
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-home'
                  : 'ios-home-outline';
              } else if (route.name === 'Orders') {
                iconName = focused ? 'ios-book' : 'ios-book-outline';
              } else if (route.name === 'Account') {
                iconName = focused ? 'ios-person' : 'ios-person-outline';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'black',
          })}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Orders" component={Orders} />
            <Tab.Screen name="Account" component={Account} />
          </Tab.Navigator>
    )
}

export {TabStack}