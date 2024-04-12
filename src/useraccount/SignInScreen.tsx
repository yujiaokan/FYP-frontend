import React,{useEffect, useState} from "react"

import {SafeAreaView,TouchableOpacity,View, Text, Image, TextInput, Button, StyleSheet, Platform} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

import {
    GoogleSignin,
    GoogleSigninButton,

  }from '@react-native-google-signin/google-signin'

import './AppInit';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { horizontalScale ,verticalScale} from "../../theme/Scalling";


export default function SignInScreen (this:any){
    
    const navigation:any = useNavigation();
 
  
    
    
     useEffect(() => {
       if (Platform.OS === 'android') GoogleSignin.configure({
            webClientId: '298342754306-rh2lpd8rv9lvdtohuiios57ddih4tu6e.apps.googleusercontent.com',
        });
    }, []);


   

    const handleGoogleSignIn = () => {
        GoogleSignin.hasPlayServices()
            .then(() => GoogleSignin.signIn())
            .then((userInfo) => {
                console.log(JSON.stringify(userInfo))
                navigation.navigate("handlegoogle")
            })
            .catch((error) => {
                console.log("ERROR IS: " + JSON.stringify(error));
            });
    }

 
    async function onFacebookButtonPress() {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      
        if (result.isCancelled) {
          throw 'User cancelled the login process';
        }
      
        const data = await AccessToken.getCurrentAccessToken();
      
        if (!data) {
          throw 'Something went wrong obtaining access token';
        }
    
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        return auth().signInWithCredential(facebookCredential);

    }
   

    return (
        <View>
            <SafeAreaView >
                <View>
                    <TouchableOpacity 
                        onPress={()=> navigation.goBack()}
                    >
                        <ArrowLeftIcon size="20" color="black" />
                    </TouchableOpacity>
                </View>
                <View style ={{padding : 10}}>
                    <Text>ACCESS VIA</Text>
                </View>
            </SafeAreaView>
           

            <View style={styles.emailSigin}>
                <View style={{alignItems:'center'}}>
                        <TouchableOpacity onPress={()=> navigation.navigate("lognin")}>
                            <Text style ={{fontSize:20}}>
                                Sign in with Email
                            </Text>
                        </TouchableOpacity>
                </View>

                <Text style={styles.textstyle}>OR</Text>
                <View>
                  

                <GoogleSigninButton style={styles.googlebutton}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                    onPress={handleGoogleSignIn}
                />
                
                <Icon.Button
                name="facebook"
                backgroundColor={"#3b5998"}
                style={styles.facebookButton}
                onPress={() => {
                    onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))
                }}>
                    <Text style={styles.buttonText}>Sign In with Fackbook</Text></Icon.Button>

                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    googlebutton:{
        width:horizontalScale(410),
        height:verticalScale(48)
    },
    emailSigin:{
        borderTopLeftRadius :50,
        borderTopRightRadius :50
    },
    textstyle: {
        alignSelf:'center',padding :30
    },
    facebookButton: {
      backgroundColor: '#3b5998',
      alignSelf: 'center', 
    },
    buttonText: {
      color: 'white',

    },
    
 
  });