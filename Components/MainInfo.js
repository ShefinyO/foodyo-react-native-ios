import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearItemState } from "../redux/actions";


export default function MainInfo({route,navigation}){

    const {name, image, price, reviews, rating, categories} = route.params
    const newCategories = categories.map((category)=> category.title).join(' • ')
    const details = `${newCategories} • ${price?price:""} ${rating} * ${reviews}`

    const previousShopName = useSelector((state)=>state.cartReducer.selectedMenu.shopName)
    const dispatch = useDispatch()

    
    useEffect(()=>{
        if(previousShopName!=route.params.name){
            dispatch(clearItemState())
        }
    },[])
    
 

    
    return(
    <View>
        <InfoImage navigation={navigation}image = {image}/>
        <InfoTitle title={name}/>
        <InfoInDetail details={details}/>
    </View>
    )
}

const InfoImage=({navigation,...props})=>(
    <View style={{position:"relative"}}>
        <Image source={{uri:props.image}} style={{width:"100%", height:225}}/>
        <TouchableOpacity onPress={()=>navigation.navigate("Home")} style={{position:"absolute",top:35,left:15,height:30,width:30,borderRadius:60,backgroundColor:"white",justifyContent:"center", alignItems:"center",color:"white"}}><Image source={require('../assets/icons/back.png')} style={{height:20, width:47, resizeMode:"contain"}}/></TouchableOpacity>
    </View>
)

const InfoTitle=(props)=>(
    <Text style={{fontSize:20, fontWeight:"500", marginVertical:10, marginHorizontal:15}}>{props.title}</Text>
)

const InfoInDetail=(props)=>(
    <Text style={{marginBottom:15,marginHorizontal:15,fontWeight:"400"}}>{props.details}</Text>
)