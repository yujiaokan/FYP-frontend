import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
    GoogleSignin
  }from '@react-native-google-signin/google-signin'
import { useNavigation } from "@react-navigation/native";

export default function Handlegoogle() {
    const navigation:any = useNavigation();
    const handleGoogleSignOut = () => {
        GoogleSignin.signOut()
            .then(() => {
                navigation.navigate("welcome")
            })
            .catch((error) => {
                console.error('Error during Google Sign-Out', error);
            });
    }
    

    return(
        

        <View>
            
            
            <Text>This userprofile screen</Text>

            <TouchableOpacity>
                <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}} onPress={handleGoogleSignOut}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}