import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";


export default function Search(props){
return(
    <View style={{
        marginTop: 10,
        flexDirection: "row",
        width:"100%",
    }}>
        <GooglePlacesAutocomplete placeholder="search" 
        query={{key:"AIzaSyDhzKk6j79G92oTfsQu25mTxhbTYuEn5fQ"}}
        onPress={(data, description)=>{
            const place = data.description.split(',')[0]
            props.setPlace(place);
        }}
        styles={{
            textInput:{
                backgroundColor: "#fffdd0",
                fontWeight:"500",
                marginTop: 7,
                borderRadius:10, 
                width:50
            },
            textInputContainer:{
                flexDirection:"row",
                borderColor:"#fffdd0",
                alignItems:"center",
                backgroundColor: "#fffdd0",
                borderRadius:50,
                marginRight:10,
                
            },
        }}
        renderLeftButton={()=>(
            <View style={{  backgroundColor:"white",marginLeft:10,borderRadius:30, padding:5}}>
                <Ionicons name="locate-outline" size={24}/>
            </View>
         ) }

         renderRightButton={()=>(
            <View style={{
                flexDirection:"row",
                alignItems:"center",
                backgroundColor:"white",
                padding:3,
                marginRight:10,
                borderRadius:30
                
            }}>
                <Ionicons name="navigate-circle-outline" size={33} />
               
            </View>
         )}
        />
    </View>
)
}
