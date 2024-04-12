import React from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from '@react-navigation/native-stack' ;
import Userprofile from "useraccount/Userprofile";
import Handlegoogle from "useraccount/Handlegoogle";
import UpdateProfile from "useraccount/UpdateProfile";
import CameraScreen from "useraccount/CameraScreen";
import RegistForm from "useraccount/RegistForm";
import Messages from "useraccount/Messages";
import ChargerHistory from "useraccount/ChargerHistory";
import EachMessage from "useraccount/EachMessage";
const stact = createNativeStackNavigator();


export default function UserNavigation(){
    return (
        <NavigationContainer independent={true}>
            <stact.Navigator initialRouteName="userprofile" >
                <stact.Group>
                <stact.Screen name= "userprofile" options ={{headerShown: false}} component={Userprofile}/>
                <stact.Screen name="rform" options ={{headerShown: false}} component={RegistForm}/>   
                <stact.Screen name = "messages" options ={{headerShown: false}} component={Messages}/>
                <stact.Screen name="updateprofile" options ={{headerShown: false}} component={UpdateProfile}/>  
                <stact.Screen name="camera" options ={{headerShown: false}} component={CameraScreen}/>  
                <stact.Screen name="chargerhistory" options={{headerShown: false}} component={ChargerHistory}/>
                <stact.Screen name="eachmessage" options ={{headerShown: false}} component={EachMessage}/>        
                <stact.Screen name="handlegoogle" options ={{headerShown: false}} component={Handlegoogle}/>

                </stact.Group>
            </stact.Navigator>
        </NavigationContainer>

        
    )
}
