import React, { useEffect, useState } from "react";
import { View, Text,SafeAreaView,Image, ScrollView } from "react-native";
import { authentication, db, getPastOrders } from "../firebase";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { Divider } from "react-native-elements";
 

export default function Orders(){
    const [pastOrders,setPastOrders] = useState([])
    const [load,setLoad] = useState(true)

    const orderState = useSelector((state)=>state.cartReducer.orderCompleted)

    useEffect(()=>{
        getPastOrders(authentication,setPastOrders,setLoad)
    },[orderState])
    if(!load){
    return(
        <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
            <Text style={{marginLeft:15, fontSize:20, fontWeight:"600", marginBottom:7}}>Past Orders</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
            <OrderComponent pastOrders={pastOrders}/>
            </ScrollView>
        </SafeAreaView>
    )}
    else{
        return(
            <Loader/>
        )
    }
}

const OrderComponent=({pastOrders})=>{

  const day=(orderDate)=>{
     orderDate = orderDate.toDate().toString()
     const ar = orderDate.split(' ')
     return `${ar[1]} ${ar[2]}`

  }
    return(
        <View>
            {pastOrders.map((pastOrder,index)=>(
                <View key={index} >
                <View style={{marginLeft:15,flexDirection:"row", alignItems:"center"}}>
                <View>
                    <Image style={{width:70,height:70, borderRadius:10}} source={{uri:pastOrder.shopImage}}/>
                </View>
                <View style={{alignItems:"flex-start", paddingLeft:15}}>
                    <View style={{padding:2}}>
                        <Text style={{fontSize:16, fontWeight:"700"}}>{pastOrder.shopName}</Text>
                    </View>
                    <View style={{padding:2,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                        <Text style={{fontSize:15}}>{`${pastOrder.numItems} items •`} </Text>
                        <Text style={{fontSize:15}}>{`${pastOrder.totalPrice}`}</Text>
                    </View>
                    <View style={{padding:2,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                        <Text style={{fontSize:15}}>{`${day(pastOrder.orderedAt)} • ` }</Text>
                    </View>
                </View>
                </View>
                <Divider width={0.5} orientation='vertical' style={{marginVertical:10}}/>
                </View>
            ))}
        </View>
    )
}
