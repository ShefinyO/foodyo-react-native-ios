import React, { useContext, useState } from 'react';
import {View, Text, TextInput, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TopComponent } from './SignIn';
import { authentication, db } from '../firebase';
import {collection, addDoc} from 'firebase/firestore'
import { createUserWithEmailAndPassword,} from 'firebase/auth';


export default function SignUp({navigation}){
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(null);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(null);

    const handleSignUp = () => {
        if((nameError===false)&&(emailError===false)&&(phoneError===false)&&(passwordError===false)){
        createUserWithEmailAndPassword(authentication,email, password)
        .then((userCredentials) => {
            addDoc(collection(db, "users"), {
                name,
                email,
                phone,
                id:authentication.currentUser.uid
              });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    // ..
  })} else{
      console.log("error")
      Alert.alert('Oops','Please fill in the required fields properly',
      [{text:'OK', onPress:()=>console.log('alert closed')}])
  }
  }
    

    const handleNameValid = (value) =>{
        !value.trim() ? setNameError(true): setNameError(false)
        setName(value)
        }

        const handleEmailValid = (value) =>{
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        !regex.test(value)? setEmailError(true): setEmailError(false)
        setEmail(value)
        }

        const handlePhoneValid = (value) =>{
            value.length < 10? setPhoneError(true): setPhoneError(false)
            setPhone(value)
           }

            const handlePasswordValid = (value) =>{
         value.length < 6 ? setPasswordError(true): setPasswordError(false)
         setPassword(value)
        }

    

    
    

    return(
        
        <SafeAreaView style={{backgroundColor:"#FAF9F6", flex:1}}>
            <TopComponent text1="Hungry?" text2="Sign Up and order on Foodyo!" />
            <View style={{alignItems:"center"}}>
                <View style={{backgroundColor:"white"}}>
                    <View style={{  
                        justifyContent:"center",
                        padding:30
                        }}> 

                        <View style={{marginBottom:20}}>
                            <Text style={{marginBottom:11}}>Username</Text>
                            <View style={{borderRadius:3, borderColor:nameError?"red":"#D3D3D3", borderBottomWidth:2}}>
                                <TextInput  style={{padding:5, paddingRight:90}}
                                onChangeText={(text)=>handleNameValid(text)}
                                />
                            </View>
                            {nameError?<Text style={{color:"red"}}>please enter a valid Username</Text>:null}
                        </View>

                        <View style={{marginBottom:20}}>
                            <Text style={{marginBottom:11}}>Email</Text>
                            <View style={{borderRadius:3, borderColor: emailError?"red":"#D3D3D3", borderBottomWidth:2}}>
                                <TextInput  style={{padding:5, paddingRight:90}}
                                 onChangeText={(text)=>handleEmailValid(text)}/>
                            </View>
                            {emailError?<Text style={{color:"red"}}>enter a valid email</Text>:null}
                        </View>

                        <View style={{marginBottom:20}}>
                            <Text style={{marginBottom:11}}>Mobile Number</Text>
                            <View style={{borderRadius:3, borderColor:"#D3D3D3", borderBottomWidth:2}}>
                                <TextInput  style={{padding:5, paddingRight:90}}
                                onChangeText={(text)=>handlePhoneValid(text)}
                                keyboardType='numeric'/>
                            </View>
                            {phoneError?<Text style={{color:"red"}}>enter a valid mobile number</Text>:null}
                        </View>

                       
                        <View style={{marginBottom:20}}>
                            <Text style={{marginBottom:11}}>Password</Text>
                            <View style={{borderRadius:3, borderColor:"#D3D3D3", borderBottomWidth:2}}>
                                <TextInput  style={{padding:5, paddingRight:90}}
                                onChangeText={(text)=>handlePasswordValid(text)}
                                secureTextEntry/>
                            </View>
                            {passwordError?<Text style={{color:"red"}}>password must be more than 5 characters</Text>:null}
                        </View>
                        
                        <View style={{ marginTop:20,alignItems:"center", flexDirection:"row"}}>
                        <Button icon={ <Icon
                                name="arrow-right"
                                size={20}
                                color="white" />}
                                title="Sign Up"
                                buttonStyle={{backgroundColor:"black", alignSelf:"center",
                                              marginRight:20,}}
                                onPress ={handleSignUp}/>
                        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                            <Text>Already a member? Log In</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                 </View>
            </View>
        </SafeAreaView>
    )
}

/*const InputText=(props)=>{
    return(
        <View style={{marginBottom:20}}>
            <Text style={{marginBottom:11}}>{props.text}</Text>
            <View style={{borderRadius:3, borderColor:"#D3D3D3", borderBottomWidth:2}}>
                <TextInput  style={{outlineStyle:"none",padding:5, paddingRight:90}}/>
            </View>
        </View>
    )
}*/