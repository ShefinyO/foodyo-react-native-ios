import React from 'react';
import { Divider } from 'react-native-elements';
import MainInfo from '../Components/MainInfo';
import {View, ScrollView} from 'react-native'
import MenuComponent from '../Components/MenuComponent';
import CartButton from '../Components/CartButton';
import { useSelector } from 'react-redux';
import DeliveryAddress from './DeliveryAddress';
import { StripeProvider } from '@stripe/stripe-react-native';

const foods = [
    {
      title: "Beef Burger",
      description: "Chicken Burger with golden fried chips and a drink",
      price: "$10",
      image:
        "https://media.istockphoto.com/photos/steakhouse-double-bacon-cheeseburger-picture-id617759204?k=20&m=617759204&s=612x612&w=0&h=NDaVBc-IW_kZAzGpiXMI8iLDT0WGW8Esj6AuV8P5350=",
    },
    {
      title: "Chicken Biriyani",
      description:
        "Delicious Biriyani with tender chicken mixed with Indian masala 🔥",
      price: "$19.20",
      image: "https://144f2a3a2f948f23fc61-ca525f0a2beaec3e91ca498facd51f15.ssl.cf3.rackcdn.com/uploads/food_portal_data/recipes/recipe/hero_article_image/3968/67a78a0ca8d93277f693/letterbox_chickenrice.jpg",
    },
    {
      title: "Spicy fried chicken ",
      description:
        "Spicy fried chicken with chips and drink as side",
      price: "$8.00",
      image:
        "https://media.istockphoto.com/photos/fried-chicken-and-fries-picture-id466937239?k=20&m=466937239&s=612x612&w=0&h=f3pMxAFoAhjFCjg6dEa4W3LcT8myTJjfDIxtD69ICvw=",
    },
    {
      title: "Veg Salad",
      description:
        "Healthy greens which are perfect after a heavy meal!",
      price: "$21.00",
      image:
        "https://media.istockphoto.com/photos/traditional-avocado-salad-with-quinoa-picture-id1292202102?k=20&m=1292202102&s=612x612&w=0&h=XvDbnZrhPNeX-PxcM76xoVL-0af5dVfIik8WbxGF8Rs=",
    },
    {
      title: "Al-Fahm",
      description: "Spicy tender Arabic styled grilled chicken with special sauce",
      price: "$13.50",
      image:
        "https://media.istockphoto.com/photos/juicy-grilled-chicken-breast-with-mayonnaise-and-salad-al-faham-picture-id1248774539?k=20&m=1248774539&s=612x612&w=0&h=tm1ZgO61a_pw2o8ThQMUrpoR60DudBQWB809ICD4Pzc=",
    },
  ];
//Reference --> The above image url's are from iStock website --> https://www.istockphoto.com/



export default function SelectedRestaurantInfo({route, navigation}){

    
    return(
        <View style={{flex:1}}>
          <StripeProvider publishableKey='pk_test_51KfiAeEHYf2kclxC6wUL5TkcHDJHBV0jPL13cjiPjPm1KP9FX1161UYOt0jP0mCXODLjPOhONGFV8knQxj03VOwc00IRMXU9eq'>
            <MainInfo route={route} navigation={navigation}/>
            <Divider width={1.8} style={{ marginVertical: 5 }}/>
            <ScrollView showsVerticalScrollIndicator={false}>
            <MenuComponent shopImage={route.params.image} shopName={route.params.name} hideAddRemove={false} foods={foods}/>
            </ScrollView>
            <CartButton shopImage={route.params.image} navigation={navigation} shopName= {route.params.name}/>
            <DeliveryAddress/>
          </StripeProvider>

        </View>
    )
}