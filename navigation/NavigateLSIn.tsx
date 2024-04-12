import React from 'react'
import { createNativeStackNavigator} from '@react-navigation/native-stack' ;
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import WelcomeScreen from 'useraccount/WelcomeScreen';
import SignInScreen from 'useraccount/SignInScreen';
import JoinInScreen from 'useraccount/JoinInScreen';
import LoginScreen from 'useraccount/LoginScreen';
import ForgotPassNavi from 'useraccount/ForgotPassNavi';
import Userprofile from 'useraccount/Userprofile';
import UpdateProfile from 'useraccount/UpdateProfile';
import RegistForm from 'useraccount/RegistForm';

function NavigateLSIn() {
    const stact = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true} >
            <stact.Navigator initialRouteName='userwelpage'>
                <stact.Screen name="userwelpage" options ={{headerShown: false}} component={WelcomeScreen}/>
                <stact.Screen name= "SignIn" options ={{headerShown: false}} component={SignInScreen}/>
                <stact.Screen name= "joinIn" options ={{headerShown: false}} component={JoinInScreen}/>
                <stact.Screen name= "lognin" options ={{headerShown: false}}  component={LoginScreen}/>    
                <stact.Screen name= "forgotpassNavi" options ={{headerShown: false}} component={ForgotPassNavi}/>   
                <stact.Screen name= "userprofile" options ={{headerShown: false}} component={Userprofile}/>
                <stact.Screen name="updateprofile" options ={{headerShown: false}} component={UpdateProfile}/> 
                <stact.Screen name="rform" options ={{headerShown: false}} component={RegistForm}/>    
                </stact.Navigator>
            <FlashMessage position="top"></FlashMessage> 
        </NavigationContainer>

  )
}

export default NavigateLSIn
