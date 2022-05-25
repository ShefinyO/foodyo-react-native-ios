
import React, { useEffect, useState } from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native';
import { Divider, CheckBox } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../redux/actions';
import {connect} from 'react-redux'




const MenuComponent=({shopName, cartItems, hideAddRemove, foods, shopImage})=>{
   
      
    return(
        <>
        {foods.map((food, index)=>(
          
        <View key={index}>
            <View style ={{flexDirection:"row", justifyContent:"space-evenly", alignItems:'center', padding:10}}>
                <MenuImage shopImage={shopImage} image ={food.image} food={food} shopName={shopName} cartItems={cartItems} hideAddRemove={hideAddRemove}/>
                <MenuInfo title={food.title} description={food.description} price={food.price}/>
            </View>
            <Divider width={0.5} orientation='vertical' style={{marginHorizontal:15}}/>
            </View>
        ))}
        </>
        
    )
}

const mapStateToProps = (state) =>({cartItems:state.cartReducer.selectedMenu.items})

export default connect(mapStateToProps)(MenuComponent)


const MenuInfo=(props)=>(
    <View style={{justifyContent:"space-evenly",width:"55%", padding:10}}>
        <Text style={{fontWeight:"500", fontSize:20}}>{props.title}</Text>
        <Text>{props.description}</Text>
        <Text>{props.price}</Text>
    </View>
)

const MenuImage =({food, shopName, image, cartItems, hideAddRemove, shopImage}) =>{

 

  const dispatch = useDispatch();


  const checkItemInCart=()=>{
    const newCart  = cartItems.map((item)=>item.title)
    if(newCart.includes(food.title)){
      return false
    }else if(!newCart.includes(food.title)){
      return true
    }
  }




  

      const itemSelected=(item, shopName)=>{
        dispatch(addItemsToCart(item, shopName,shopImage))

      }

      const removeItems=(item)=>{
        dispatch(removeItemsFromCart(item))
      }

  return(

    <View  style={{flexDirection:"row",padding:10, alignItems:"center", justifyContent:"center"}}>
      {!hideAddRemove?(
      <View style={{paddingRight:20, justifyContent:"center", alignItems:"center"}}>
        <TouchableOpacity onPress={()=>itemSelected(food, shopName)} style={{flexDirection:"row", backgroundColor:"black", width:30, height:30, alignItems:"center", justifyContent:"center", borderRadius:60}}><Text style={{color:"white",fontSize:25, marginBottom:5}}>+</Text></TouchableOpacity>
        <TouchableOpacity disabled={checkItemInCart()} onPress={()=>removeItems(food, shopName)}  style={{ opacity:checkItemInCart()?0.5:1, marginTop:10,flexDirection:"row", backgroundColor:"black", width:30, height:30, alignItems:"center", justifyContent:"center", borderRadius:60}}><Text style={{color:"white",fontSize:25,  marginBottom:5}}>-</Text></TouchableOpacity>  
      </View>
      ):(<View></View>)}
    <Image source = {{uri:image}} style={{height:110, width:110, borderRadius:10}}/>
    </View>
  )
}