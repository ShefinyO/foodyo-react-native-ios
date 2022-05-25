
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';




export default function RestaurantInfo({navigation,...props}){
    
    return(
        <>
        {props.shopsData.length!==0?(props.shopsData.map((shop, index) =>(
            <TouchableOpacity key={index} onPress={()=> navigation.navigate('SelectedRestaurantInfo',
                                                                             {
                                                                                name:shop.name,
                                                                                image:shop.image_url,
                                                                                price:shop.price,
                                                                                reviews:shop.review_count,
                                                                                rating:shop.rating,
                                                                                categories:shop.categories
                                                                             }
            )}>
                <View style={{backgroundColor:"white", padding:15, marginBottom:0}}>
                    <View style={{borderRadius:30,
                                   shadowOffset: { width: 1, height: 2 },
                                   shadowOpacity: 4,
                                   shadowRadius: 3}}>
                      <Image 
                        source={{uri:shop.image_url}}
                        style={{height:200,
                                width:"100%",
                                borderRadius:30,
                                }}/> 
                    </View> 
                    <Info shopName={shop.name} shopRating={shop.rating}/>
                </View>
            </TouchableOpacity>))):<Text style={{alignSelf:"center", marginTop:20}}>No Restauarants Available</Text>}
                
        </>
    )}


    
           




const Info = ({shopRating, shopName})=>(
    <View style={{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginTop:5
    }}>
        <View style={{marginLeft:10}}>
            <Text style={{fontSize:20, fontWeight:"400"}}>{shopName}</Text>
            <Text>20-30 min</Text>
        </View>
        <View style={{
            backgroundColor:"grey",
            borderRadius:13,
            height:26,
            width:26,
            alignItems:"center",
            justifyContent:"center"}}>
            <Text style={{marginBottom:1}}>{shopRating}</Text>
        </View>
    </View>
)