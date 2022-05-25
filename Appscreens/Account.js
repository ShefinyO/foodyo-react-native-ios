import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Divider } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { authentication, getCurrentUserDetails, logOut } from "../firebase";
import Loader from "./Loader";

export default function Account(){


    const [userDetails,setUserDetails] = useState('')
    const [load,setLoad] = useState(true)
    const onSignOut=()=>{
        logOut()
    }

    useEffect(()=>{
        getCurrentUserDetails(authentication,setUserDetails,setLoad)
    },[])
    if(!load){
    return(
        <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
            <UserName userDetails={userDetails}/>
            <Divider width={1.8} style={{marginVertical:5}}/>
            <SignOutBtn onSignOut={onSignOut}/>
        </SafeAreaView>
    )}
    else{
        return(
        <Loader/>
        )
    }
}

const UserName = ({userDetails})=>(
    <View style={{flexDirection:"row",marginLeft:15, alignItems:"center", marginTop:20}}>
        <View>
            <Ionicons name="person-circle" size={25}/>
        </View>
        <Text style={{marginLeft:5,fontSize:15,fontWeight:"500"}}>{userDetails.name}</Text>
    </View>
)

const SignOutBtn=({onSignOut})=>(
    <View style={{marginLeft:17,flexDirection:"row", alignItems:"center"}}>
        <Ionicons name="log-out" size={25}/>
        <TouchableOpacity onPress={onSignOut}>
            <Text style={{marginLeft:5,fontSize:15,fontWeight:"500"}}>Sign out</Text>
        </TouchableOpacity>
   </View>
)
