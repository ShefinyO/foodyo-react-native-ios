
import React, {useState } from 'react';
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import { Button } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from '../firebase';



export default function SignIn({navigation}){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');

    const handleSignIn=()=>{
        signInWithEmailAndPassword(authentication, email, password)
        .then((userCredential) => {
            // Signed in 
        const user = userCredential.user;
        console.log(user)
    // ...
        })
        .catch((error) => {
    let errorMessageFormated = error.code.replace('auth/','').replace(/-/g, " ")
            errorMessageFormated = errorMessageFormated.charAt(0).toUpperCase() + errorMessageFormated.slice(1) 
            console.log(errorMessageFormated)
            setAuthError(errorMessageFormated);
  })
    }

    return(
    
    <SafeAreaView style={{backgroundColor:"#FAF9F6", 
                        flex:1,
                        justifyContent:"center",
                        alignItems:"center" 
                        }}>
        <TopComponent text1="Welcome to Foodyo" text2="Log In to continue"/>
        <View style={{ alignItems:"center", marginTop:100}}>
            <View style={{
                        borderRadius:10,
                        paddingHorizontal:30,
                        paddingBottom:30,
                        backgroundColor:"white"
                         }}>
                <View style={{marginTop:5, marginBottom:12}}>
                    <Text style={{textAlign:"center", marginVertical:25, fontSize:30, fontWeight:"bold"}}>Login</Text>
                    <View style={{flexDirection:"row" }}>
                        <Ionicons style={{marginTop:8}} name = "mail-outline" size={24}/>
                        <TextInput  style={{borderRadius:3,
                                            marginBottom:1,
                                            padding:10,
                                            paddingRight:60,
                                            }} placeholder="Email address" onChangeText={(text)=> setEmail(text)
                                            }/>
                    </View>
                    {authError==="Invalid email"?(
                    <Text style={{color:"red", marginVertical:4}}>Enter a valid email</Text>):
                    authError==="User not found"?(
                    <Text style={{color:"red", marginVertical:4}}>User doesnt exist</Text>): <Text></Text>}
                    <View style={{flexDirection:"row"}}>
                        <Ionicons style={{marginTop:8}} name = "key" size={24}/>
                        <TextInput  style={{borderRadius:3,
                                    marginBottom:1,
                                    padding:10,
                                    paddingRight:60,
                                    }}
                                    placeholder= "password"
                                    secureTextEntry
                                    onChangeText={(text)=> setPassword(text)}/>
                    </View> 
                    {authError==="Wrong password"?(
                    <Text style={{color:"red"}}>wrong password</Text>):<Text></Text>}   
                </View>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <Button title="Login"
                        buttonStyle={{backgroundColor:"black", marginTop:5,
                        marginRight:20, borderRadius:5,padding:6,paddingHorizontal:20}} onPress={handleSignIn}/>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={{textDecorationLine:"underline", marginTop:4}}>{`New to Foodyo?
Sign up here!`}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView> 


    )
}


export const TopComponent=(props)=>{
    return(
        <View style={{flexDirection:"row",alignItems:"center", justifyContent:"space-between",
        padding:50}}>
<View>
    <Text style={{fontSize:20}}>{props.text1}</Text><Text>{props.text2}</Text>
</View>
<Image source={require("../assets/icons/delivery.png")} style={{height:70, width:70, resizeMode:"contain"}}/> 
</View>
    )
}

//The delivery.png was referenced or downloaded from --> https://www.kindpng.com