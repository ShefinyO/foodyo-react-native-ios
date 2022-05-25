import React, { useEffect, useState } from "react";
import {View, Text, SafeAreaView, TouchableOpacity} from "react-native";
import MenuComponent from "../Components/MenuComponent";
import { authentication, getLastOrder } from "../firebase";
import { useDispatch } from "react-redux";
import { clearItemState } from "../redux/actions";
import Loader from "./Loader";
import LottieView from 'lottie-react-native'


const OrderPlaced = ({route, navigation}) =>{
    const anim = require('../animations/99279-preparing-food.json')

    const{shopName, totalPrice} = route.params
    const [orders, setOrders] = useState([])
    const [load,setLoad] = useState(true)

    useEffect(()=>{
        const unsubscribe= getLastOrder(authentication, setOrders,setLoad)
        return unsubscribe
    },[])
    if(!load){
    return(
    <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
        <TouchableOpacity onPress={()=>{
            navigation.navigate("Home")
            }} style={{backgroundColor:"black", padding:10}}><Text style={{color:"white"}}>Back</Text></TouchableOpacity>
        <View style={{position:"relative", top:10}}>
            
            <Text style={{marginLeft:10, fontSize:20, fontWeight:"600"}}>{`your order has been placed at ${shopName} for ${totalPrice}`}</Text>
<LottieView style={{height:200, alignSelf:"center"}} source={anim} autoPlay speed={0.5} loop />
        <MenuComponent hideAddRemove={true} foods={orders}/>
        </View>
        
    </SafeAreaView>
    )}
    else{
        return(
            <Loader/>
        )
    }
}

export default OrderPlaced;