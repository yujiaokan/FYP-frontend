import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'



export default function WelcomeScreen() {
    const navigation:any = useNavigation();

return (
            
            
        <View>
            <Text style ={{padding:20, fontSize:30}}>
                Let's Get Started!
            </Text>
                <View >
                    <Image source={require("../../assets/images/logo.png")}
                        style={{width: 420, height: 350}} />
                </View>
                <View >
                    <TouchableOpacity onPress={()=> navigation.navigate("joinIn")}>
                        <Text style= {{padding:5, alignSelf:'flex-end',margin:5,fontSize:20}}>
                            Join in
                        </Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={{padding:5, alignSelf:'flex-end',margin:5,fontSize:10}}>Already have an account?</Text>
                        <TouchableOpacity onPress={()=> navigation.navigate("SignIn")}>
                            <Text style={{padding:5, alignSelf:'flex-end',margin:5,fontSize:20}}> Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
           
        )
    
        

   
}

