
import React, { useEffect, useRef, useState } from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, Modal} from 'react-native';
import { Button } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from 'react-redux';
import { addDeliveryAddressToFirestore, authentication, getDeliveryAddressFromFirestore, deleteAddress } from '../firebase';
import { setModalVisible1,setModalVisible2, addFirstLine, addPostCode, addContact, cleanUpAddress, selectedAddress } from '../redux/actions';




export default function DeliveryAddress(){
    const [values, setValues] = useState({
        firstLine:"",
        postCode:"",
        contact:""
    })
    const [firstLineErr, setFIrstLineErr] =useState(null)
    const [postCodeErr, setPostCodeErr] =useState(null)
    const [contactErr, setContactErr] =useState(null)
    const [addressList, setAddressList] = useState([])
    const [addressLimit, setAddressLimit] = useState(false)
    const [firestoreUpdated, setFirestoreUpdated] = useState(false)
    const textinput = useRef(null);


    const modal1Visibility = useSelector((state)=>state.cartReducer.modalVisible1)
    const deliveryAddressData = useSelector((state)=>state.cartReducer.deliveryAddress)
    const dispatch = useDispatch();

    

    const addFL = (value)=>{
        if(value.length<6){
            setFIrstLineErr(true)
        }else{
            
            setFIrstLineErr(false)
        }
        setValues({...values,firstLine:value})
        dispatch(addFirstLine(value))
    }

    const addPC = (value)=>{
        if(value.length<6){
            setPostCodeErr(true)
        }else{
           
            setPostCodeErr(false)
        
        }
        setValues({...values,postCode:value})
        dispatch(addPostCode(value))
       
       
    }

    const addC = (value)=>{
        if(value.length<12){
            setContactErr(true)
        }else{
            setContactErr(false)
        }
        setValues({...values,contact:value})
        dispatch(addContact(value))
       
    }

    const disabledOrNot = () =>{
        if(firstLineErr===false&&postCodeErr===false&&contactErr===false){
            return false
        }
        return true
    }

    const onSubmition=()=>{
        const {firstLine, postCode, contact} = deliveryAddressData
        if(addressList.length<3){ 
        addDeliveryAddressToFirestore(authentication, firstLine,postCode,contact)
        dispatch(cleanUpAddress())
        setFIrstLineErr(null)
        setContactErr(null)
        setPostCodeErr(null)
        setFirestoreUpdated(!firestoreUpdated)
        setAddressLimit(false)
        setValues({firstLine:"",postCode:"",contact:""})
        }else{
            setAddressLimit(true)
        }

    }

    useEffect(()=>{
         getDeliveryAddressFromFirestore(authentication, setAddressList, addressList, setAddressLimit)
    },[firestoreUpdated])



    return(
        <View>
        <Modal animationType="slide" visible={modal1Visibility} transparent={true} onRequestClose={()=>setModal()}>
            <View style={{flex:1,
                            backgroundColor:"rgba(0,0,0,0.7)",
                            alignItems:"center"
                            }}>
            <View style={{backgrounColor:"white",width:"90%",justifyContent:"center", alignItems:"center", position:"relative", top:70}}>
            <View style={styles.box}>
                <Text style={{textAlign:"center",fontSize:20,fontWeight:"700"}}>Add new Address</Text>
                    <View style={styles.input}>
                        <TextInput  onChangeText={text=>addFL(text)} placeholder='First line of Address' value={values.firstLine}/>
                    </View>
                <View style={{position:"absolute",top:80, left:22}}>
                {firstLineErr?<Text style={{marginTop:10, color:"red"}}>characters must be more than 5</Text>:<></>}
                </View>
                <View style={styles.input}>
                    <TextInput  onChangeText={text=>addPC(text)} placeholder='Postcode' value={values.postCode}/>
                </View>
                <View style={{position:"absolute",top:145, left:22}}>
                {postCodeErr?<Text style={{marginTop:10, color:"red"}}>characters must be more than 5</Text>:<></>}
                </View>
                 <View style={styles.input}>
                     <TextInput onChangeText={text=>addC(text)} placeholder='Contact Number' value={values.contact}/>   
                 </View>
                 <View style={{position:"absolute",top:210, left:22}}>
                 {contactErr?<Text style={{marginTop:10, color:"red"}}>should be 10 digits</Text>:<></>}
                </View>
                <View style={{marginTop:20}}>
                     <Button onPress={onSubmition} disabled={disabledOrNot()} 
                        title="Submit"/>
                        {addressLimit?<Text>please remove existing address before adding new one</Text>:<></>}
                </View>
            </View>
            </View>
            {addressList.map((address, index,input)=>(
                <AddressComp firestoreUpdated={firestoreUpdated} setFirestoreUpdated={setFirestoreUpdated} dispatch={dispatch} address={address} key={index} firstLine={address.firstLine} postCode={address.postCode} contact={address.contact}/>
            ))
            }
            </View>
        
        </Modal>
        </View>
    )
}


const AddressComp=({dispatch,...props})=>{

    
    return(
        <View  style={{backgroundColor:"white",width:"80%", flexDirection:"row", justifyContent:"space-between", marginTop:10,borderRadius:5,
        padding:15,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3}}>
            <View style={{width:"70%"}}>
                <Text style={{fontSize:17,marginBottom:8}}>{props.firstLine}</Text>
                <Text style={{fontSize:17,marginBottom:8}}>{props.postCode}</Text>
                <Text>{props.contact}</Text>
            </View> 
            <View>
                <TouchableOpacity onPress={()=>{
            dispatch(selectedAddress(props.address))
            dispatch(setModalVisible1())
            dispatch(setModalVisible2())
            }} style={{paddingVertical:6,backgroundColor:"black", alignItems:"center",justifyContent:"center", borderRadius:10, paddingHorizontal:10}}><Text style={{color:"white", fontSize:17}}>select</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    deleteAddress(props.address.id)
                    props.setFirestoreUpdated(!props.firestoreUpdated)
                    }} style={{paddingVertical:6,backgroundColor:"black", alignItems:"center",justifyContent:"center",marginTop:12, borderRadius:10, paddingHorizontal:10}}><Text style={{color:"white", fontSize:17}}>remove</Text></TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
      height: 40,
      margin:12,
      borderBottomWidth: 1,
      borderColor:"black",
      padding: 10,
    },
    box:{
        backgroundColor:"white",
        width:"95%", 
        padding:10,
        marginBottom:75, 
        borderRadius:5,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3
    }
  });