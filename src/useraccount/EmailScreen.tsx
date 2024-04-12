import React, { useState } from "react"
import {View, Text,TextInput, TouchableOpacity, ToastAndroid} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';


export default function EmailScreen (prop:{tt: string}) {
   const navigation:any = useNavigation();

    const[email, setEmail]=useState<any>();
    const[password, setpassword]=useState<any>();

    const userRegister=()=>{

        if(prop.tt==='Register'){
                if(email && password){
                    auth()
                    .createUserWithEmailAndPassword(email,password)
                    .then(() => {
                    
                        ToastAndroid.show('User account created & signed in!',ToastAndroid.LONG);
                 
                    })
                    .catch(error => {
                        ToastAndroid.show(error.message, ToastAndroid.SHORT);
                    
                });
                }else{
                    ToastAndroid.show("Enter email/password", ToastAndroid.LONG);
                  }  
        }else{
            if(email && password){
                auth()
                .signInWithEmailAndPassword(email,password)
                .then(() => {
                 
                    ToastAndroid.show('User signed in!',ToastAndroid.LONG);

                })
                .catch(error => {
                    ToastAndroid.show(error.message, ToastAndroid.SHORT);
                
            });
            }else{
                ToastAndroid.show("Enter email/password", ToastAndroid.LONG);
              }  
        }
    }
    return (
        <View>
          

            <TextInput placeholder="Email Address" value={email}onChangeText={(mail)=>setEmail(mail)} style={{borderWidth:1, borderRadius:5,paddingHorizontal:10,margin:10}} ></TextInput>
            <TextInput placeholder = "Password" value={password}onChangeText={(psw)=>setpassword(psw)} style={{borderWidth:1, borderRadius:5,paddingHorizontal:10,margin:10}} secureTextEntry={true} autoCorrect={false} autoCapitalize="none" ></TextInput>
           
            <TouchableOpacity>
                <Text style={{textAlign:'center',fontSize:30}} onPress={userRegister} >{prop.tt==='Register' ?'Register':'LognIn'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('forgotpassNavi')  }style={{padding: 20, alignSelf:'flex-end'}}>
                <Text >{prop.tt==='Register' ?' ':'forgot password'}</Text>
            </TouchableOpacity>
      
        </View>
    )
}
