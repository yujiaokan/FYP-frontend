import React from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from '@react-navigation/native-stack' ;
import JoinInScreen from "../src/useraccount/JoinInScreen";
import SignInScreen from "../src/useraccount/SignInScreen";
import WelcomeScreen from "../src/useraccount/WelcomeScreen";
import Userprofile from "useraccount/Userprofile";
import LoginScreen from "useraccount/LoginScreen";
import ForgotPassNavi from "useraccount/ForgotPassNavi";
import Handlegoogle from "useraccount/Handlegoogle";
import UpdateProfile from "useraccount/UpdateProfile";
import RegistForm from "useraccount/RegistForm";



const stact = createNativeStackNavigator();


export default function AppNavigation(){
    return (
        <NavigationContainer independent={true}>
            <stact.Navigator initialRouteName="welcome" >
                <stact.Group>
                <stact.Screen name= "welcome" options ={{headerShown: false}} component={WelcomeScreen}/>
                <stact.Screen name= "SignIn" options ={{headerShown: false}} component={SignInScreen}/>
                <stact.Screen name= "joinIn" options ={{headerShown: false}} component={JoinInScreen}/>
                <stact.Screen name= "lognin" options ={{headerShown: false}}  component={LoginScreen}/>    
                <stact.Screen name= "forgotpassNavi" options ={{headerShown: false}} component={ForgotPassNavi}/>   
                <stact.Screen name= "userprofile" options ={{headerShown: false}} component={Userprofile}/>
                <stact.Screen name="updateprofile" options ={{headerShown: false}} component={UpdateProfile}/> 
                <stact.Screen name="rform" options ={{headerShown: false}} component={RegistForm}/>  
                <stact.Screen name="handlegoogle" options ={{headerShown: false}} component={Handlegoogle}/>

                </stact.Group>
            </stact.Navigator>
        </NavigationContainer>

        
    )
}

