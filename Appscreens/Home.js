import React, { useEffect,useState } from 'react';
import {View,SafeAreaView, ScrollView} from 'react-native';
import Categories from '../Components/Categories';
import HeadTab from '../Components/Headtab';
import RestaurantInfo, { foodShops } from '../Components/RestaurantInfo';
import Search from '../Components/Search';
import Loader from './Loader';


const YELP_API_KEY = "C9NMc226FJ_UoOqLy0rPt2quvnYnxfbXlWRDQgOGAL0ORc7ghm9Cb8W5lau5OKbUzdIu4ueWxNYFA3u7X_pRLq9FnJiA_E5GS_PeufSXnATiraej823r-DHa8jIIYnYx"

export default function Home({navigation}){
    const [activeHead, activeHeadSetter] = useState("Delivery");
    const [category, setCategory] = useState("burgers");
    const [load, setLoad] = useState(false)

    const [shopsData, setShopsData] = useState([]);
    const [place, setPlace] = useState("sanDiego")
   
    const getShopsFromApi = async() => {
        const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${place}`;
    
        const apiOptions = {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
          },
        };
        try{
          setLoad(true)
          const res = await fetch(yelpUrl, apiOptions)
          const data = await res.json()
          setShopsData(data.businesses.filter((shop) =>{
            const categ = shop.categories.map((cat)=>{
              return cat.alias
            })
            return shop.transactions.includes(activeHead.toLowerCase())&&categ.includes(category.toLowerCase())
          }))
          setLoad(false)
        }catch(err){
          console.error(err)
        }
    };
    

    useEffect(() => {
        getShopsFromApi();
      },[place, activeHead,category])
    

    

    

    return(

        <SafeAreaView style={{backgroundColor:"white", flex:1}}>
            <View style={{backgroundColor: "white", padding:10, width:"100%"}}>
                <HeadTab activeHead={activeHead} activeHeadSetter={activeHeadSetter}/>
                <Search setPlace={setPlace}/>
            </View>
            <Categories category={category} setCategory={setCategory}/>
            {load?<Loader/>:(
            <ScrollView showsVerticalScrollIndicator={false}>
              <RestaurantInfo shopsData = {shopsData} navigation={navigation}/>
            </ScrollView>)}
        </SafeAreaView>

        
    )
}


