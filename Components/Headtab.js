import React, { useState } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';


export default function HeadTab({activeHead, activeHeadSetter}){
    
    return(
        <View style={{flexDirection:"row", alignSelf:"center"}}>
            <HeadButton text="Delivery" activeHead={activeHead} activeHeadSetter={activeHeadSetter}/>
            <HeadButton text="Pickup" activeHead={activeHead} activeHeadSetter={activeHeadSetter}/>
        </View>
    )
}


const HeadButton=(props)=>{
    return(
    <TouchableOpacity 
    style={{
        paddingVertical:10, 
        backgroundColor: props.activeHead === props.text?"black":"white",
        paddingHorizontal:16,
        borderRadius: 30
        }}
    onPress={()=>props.activeHeadSetter(props.text)}
        >
        <Text style={{
            color: props.activeHead === props.text?"white":"black",
            fontSize:15,
            fontWeight: "700"
            }}>
            {props.text}
        </Text>
    </TouchableOpacity>)
}