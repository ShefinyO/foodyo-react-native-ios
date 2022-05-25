import React,{ useEffect, useState } from "react";
import {View,  StyleSheet, ActivityIndicator,LogBox} from 'react-native';
import { TabStack } from "./Appscreens/CustomNavigation";
import { NavigationContainer } from '@react-navigation/native';
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {onAuthStateChanged } from "firebase/auth";
import { authentication, getCurrentUserDetails } from "./firebase";
import SelectedRestaurantInfo from "./Appscreens/SelectedRestaurantInfo";
import { Provider, useDispatch } from "react-redux";
import Store from "./redux/store";
import OrderPlaced from "./Appscreens/OrderPlaced";
import Loader from "./Appscreens/Loader";




export default function App() {


 const [signedIn, isSignedIn] = useState(false);
 const [Loaded, setLoaded] = useState(false);

 LogBox.ignoreLogs([`AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage`,
 `[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!`]);
 
  const Stack = createNativeStackNavigator();
  const StackHome = createNativeStackNavigator();




useEffect(()=>{
  const unsubscribe = onAuthStateChanged(authentication, (user) => {
    if (user) {
      isSignedIn(true)
      setLoaded(true)
      console.log(user)      
      // ...
    } else{
      isSignedIn(false)
      setLoaded(true)
    }
  })
  return unsubscribe;
},[])

if (!Loaded){
  return(
    <Loader/>
  )
}
else{
 return(
   

        <Provider store={Store}>
        <NavigationContainer>
          {!signedIn?(
          <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown:false}}>
            <Stack.Screen name = "SignIn" component={SignIn} headerShown={false}/>
            <Stack.Screen name = "SignUp" component={SignUp} headerShown={false}/>
          </Stack.Navigator>):(

          <StackHome.Navigator initialRouteName="TabStack" screenOptions={{headerShown:false}}>
            <StackHome.Screen name="TabStack" component={TabStack}/>
            <StackHome.Screen name="SelectedRestaurantInfo" component={SelectedRestaurantInfo}/>
            <StackHome.Screen name="OrderPlaced" component={OrderPlaced}/>
          </StackHome.Navigator>
          )}
        </NavigationContainer>
        </Provider>
    )
}}
