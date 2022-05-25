
import { useStripe } from "@stripe/stripe-react-native";
import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, Modal, Alert,Image} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import {useDispatch, useSelector} from 'react-redux';
import { authentication, addOrdersToFirestore,getCurrentUserDetails } from "../firebase";
import { clearItemState, setModalVisible1, setModalVisible2, setOrderCompleted} from "../redux/actions";




export default function CartButton({shopImage,shopName, navigation}){

    const [userDetails,setUserDetails] = useState('')
    const [load,setLoad] = useState(true)

    const stripe = useStripe();

    const modal2Visibility = useSelector((state)=>state.cartReducer.modalVisible2)
    const dispatch = useDispatch();
    const selectedItems = useSelector((state)=>state.cartReducer.selectedMenu.items)
    const selectedAddress = useSelector((state)=>state.cartReducer.selectAddress)

    let numItems = 0;
    let qty=0;
    let numb = 0
    const listOfItemPrices = selectedItems.map((item)=>Number(item.price.replace("$","")))

    const titleData = selectedItems.map((i)=>i.title)


    const unique = titleData.filter((v, i, a) => a.indexOf(v) === i);

    const uniqueItems = selectedItems.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.title === item.title
    ))
  )


    let total = 0
    

    for (var i in listOfItemPrices) {
        total += listOfItemPrices[i];
        }
        numb=total
    total = total.toString().split('')
    if(total.length>5){
        total = total.splice(0,5)
         total.push('£')
   }else{
    total.push('£')
   }

   total = total.join('')

   const setModal1 = () =>{
    dispatch(setModalVisible1())
}

   const setModal2 = () =>{
       dispatch(setModalVisible2())
   }
   const checkAddressEmpty=()=>{
       if(Object.keys(selectedAddress).length===0){
           return true
        }
        else{
           return false}
    }
    
    const paymentSubscription = async () => {
        try {
          // sending request
          const res = await fetch("http://localhost:8080/pay", {
            method: "POST",
            body: JSON.stringify({ name:userDetails.name, amount:numb }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          if (!res.ok) {
              return Alert.alert(data.message);
          }
          const clientSecret = data.clientSecret;
          const initPaymentSheet = await stripe.initPaymentSheet({
            paymentIntentClientSecret: clientSecret,
          });
          if (initPaymentSheet.error) {
              return Alert.alert(initPaymentSheet.error.message);
          }
          const presentPaymentSheet = await stripe.presentPaymentSheet({
            clientSecret,
          });
          if (presentPaymentSheet.error){
              return Alert.alert(presentPaymentSheet.error.message);
          }
        
          addOrdersToFirestore(uniqueItems,shopName,authentication, total,numItems, selectedAddress,shopImage,dispatch,setOrderCompleted)
          dispatch(clearItemState())                                                                                                                                                                                           
          setModal2()
          navigation.navigate("OrderPlaced",{
            shopName:shopName,
            totalPrice: total,
            orderedItems:uniqueItems,
        })

        } catch (err) {
          console.error(err);
          Alert.alert("Something went wrong, try again later!");
        }
      };


    useEffect(()=>{
        getCurrentUserDetails(authentication,setUserDetails,setLoad)
      },[])

    return(

    <View>
        <Modal animationType="slide" visible={modal2Visibility} transparent={true} onRequestClose={()=>setModalActive(false)}>
            <View style={{flex:1,
                            justifyContent:"flex-end",
                            backgroundColor:"rgba(0,0,0,0.7)",
                            }}>
                    <View style={{width:"100%", backgroundColor:"white", height:"75%", borderTopLeftRadius:15,borderTopRightRadius:15}}>
                        <TouchableOpacity onPress={()=>setModal2()} style={{position:"relative",top:10,left:15,height:30,width:30,borderRadius:60,backgroundColor:"white",justifyContent:"center",alignItems:"center"}}><Image source={require('../assets/icons/back.png')} style={{height:20, width:47, resizeMode:"contain"}}/></TouchableOpacity>
                        <DeliveryAdress selectAddress={selectedAddress} setModal1={setModal1} setModal2={setModal2}/>
                        <View style={{position:"relative" , width:"100%",top:5, alignItems:"center"}}>
                            <View style={{marginTop:10}}>
                                <Text style={{fontSize:20, fontWeight:"600"}}>{shopName}</Text>
                            </View>
                        {
                        uniqueItems.map((item, index,items)=>{
                            qty = selectedItems.filter((i)=>i.title===item.title).length
                            numItems = items.length
                            return <OrderedItem key={index} selectedItem={item} qty={qty}/>
                           })} 

                           <View style={{flexDirection:"row",justifyContent:"space-between", width:"90%", borderBottomColor:"gray", borderBottomWidth:1, marginTop:3, padding:6}}>
                               <Text  style={{fontSize:19,color:"black"}}>Subtotal</Text>
                               <Text  style={{fontSize:19,color:"black"}}>{total}</Text>
                            </View>
                            
                    <TouchableOpacity disabled ={checkAddressEmpty()} style={{backgroundColor:"black",
                    borderRadius:60,
                                          padding:12,
                                          alignItems:"center",
                                          justifyContent:"center", width:"50%", marginTop:30,
                                          opacity:checkAddressEmpty()?0.5:1}} onPress={()=>{paymentSubscription()}}>
                    <Text style={{fontSize:20, color:"white"}}>Confirm order</Text>
                </TouchableOpacity>
                </View>
                </View>
            </View>
        </Modal>
    {listOfItemPrices.length!=0?(
    <View style={{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
    }}>
        <TouchableOpacity onPress={()=>{setModal2()}} style={{
            marginTop:20,
            alignItems:"center",
            flexDirection:"row",
            justifyContent:"space-evenly",
            padding:12,
            position:"absolute",
            bottom:20,
            backgroundColor:"black",
            width:300,
        }}>
            <Text style={{fontSize:18, color:"white"}}>{`Go to Cart`}</Text>
            <Ionicons name="arrow-forward-circle-outline" size={30} color="white" />
            <Text style={{fontSize:18, color:"white"}}>{total}</Text>
        </TouchableOpacity>
        
    </View>
    ):(<></>)}
    </View>
    )
}



const OrderedItem=({selectedItem, qty})=>{
    return(
        <>
        <View style={{width:"90%",flexDirection:"row", justifyContent:"space-between", marginBottom:6, marginTop:20, padding:5 }} >
            <View style={{flexDirection:"row"}}>
                <Text style={{fontSize:20,color:"black"}}>{selectedItem.title}</Text>
                <View style={{marginLeft:8,backgroundColor:"black",borderRadius:60, height:30, width:30}} >
                    <Text style={{textAlign:"center" ,fontSize:20, fontWeight:"700", color:"white", padding:2, }}>{qty}</Text>
                </View>
            </View>
                <Text style={{fontSize:20,color:"black"}}>{selectedItem.price}</Text>
        </View>
        <View style={{width:"90%",flexDirection:"row", justifyContent:"center" ,borderTopWidth:1, borderTopColor:"gray"}}></View>
         </>

    )
    }
    


    const DeliveryAdress=({setModal1,setModal2, selectAddress})=>{
        if(Object.keys(selectAddress).length===0){
        return(
            <View style={{width:"100%", alignItems:"center"}}>
            <TouchableOpacity onPress={()=>{
                setModal2()
                setModal1()}} style={{padding:15,width:"70%",alignItems:"center",justifyContent:"center", marginTop:20,shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 3}}>
                <View>
                    <Text style={{fontSize:15}}>Add or select delivery address</Text>
                </View>
            </TouchableOpacity>
            </View>
        )}
        else{
            return(
            <View style={{width:"100%",alignItems:"center", marginTop:20}}>
                <View style={{paddingVertical:10,width:"90%", shadowOffset: { width: 1, height: 2 },
                                           shadowOpacity: 0.5,
                                           shadowRadius: 3}}>
                    <View style={{width:"100%", padding:10}}>
                        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                            <Text style={{fontSize:17}}>will be delivered to:</Text>
                            <TouchableOpacity onPress={()=>{
                                                        setModal2()
                                                        setModal1()}}
                                             ><Text style={{color:"blue",fontSize:18}}>change</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={{fontSize:20, fontWeight:"700"}}>{selectAddress.firstLine}</Text>
                            <Text style={{fontSize:17, fontWeight:"600"}}>{selectAddress.postCode}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )}
    }

    /*addOrdersToFirestore(uniqueItems,shopName,authentication, total,numItems, selectedAddress,shopImage,dispatch,setOrderCompleted)
                                                                                                        setModal2()
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        navigation.navigate("OrderPlaced",{
                                                                                                            shopName:shopName,
                                                                                                            totalPrice: total,
                                                                                                            orderedItems:uniqueItems,
                                                                                                        })*/ 