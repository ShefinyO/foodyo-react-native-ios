
import React, { useState } from "react";
import { View,FlatList, Image, Text, TouchableOpacity } from "react-native";

export default function Categories(props){
    const [selectItem, setSelectedItem] = useState("");
    const foodCategories = [{
        image: require("../assets/icons/burger.png"),
        name: "Burgers",
        id:'1'
    },
    {
        image: require("../assets/icons/slice.png"),
        name: "pizza",
        id:'2'
    },
    {
        image: require("../assets/icons/noodle2.png"),
        name: "noodles",
        id:'3'
    },
    {
        image: require("../assets/icons/seafood.png"),
        name: "seafood",
        id:'4'
    },
    ]
    //all of the above images were downloaded from --> https://www.pngwing.com/
    return(

        <View style={{marginTop:20,marginBottom:14, backgroundColor:"white"}}>

            <FlatList keyExtractor={(item)=>item.id}
                      data={foodCategories}
                      horizontal 
                      showsHorizontalScrollIndicator = {false} 
                      scrollEnabled = {true}
                      renderItem = {({item})=>(
                    <TouchableOpacity style={{
                        paddingBottom:20,
                        padding:5,
                        alignItems:"center",
                        justifyContent:"center",
                        backgroundColor: selectItem === item.id?"black": "white",
                        borderRadius:30,
                        marginLeft:30
                        }} 
                        onPress={()=>{
                            setSelectedItem(item.id)
                            props.setCategory(item.name)
                            }}>
                        <View style={{alignItems:"center",
                                      justifyContent:"center",
                                      backgroundColor:"white",
                                      height:50,
                                      width:50,
                                      borderRadius:25,
                                      marginTop:3,
                                      shadowOffset: { width: 0, height: 0.5 },
                                      shadowOpacity: 0.3,
                                      shadowRadius: 2
                                      }}>
                        <Image source={item.image} 
                               style={{height:50, width:47, resizeMode:"contain"}}/>
                        </View>
                        <Text style={{color:selectItem === item.id?"white":"black",
                                      marginTop:2}}>
                             {item.name}
                        </Text>
                    </TouchableOpacity>
                      )}>

            </FlatList>
            
        </View>
    )
}