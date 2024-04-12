import React from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from '@react-navigation/native-stack' ;
import MapScreen from "MapSCreen/MapScreen";
import ChooseRoute from "MapSCreen/ChooseRoute";
import FlashMessage from "react-native-flash-message"

const stact = createNativeStackNavigator();

export default function Routenavigation(){
    
    return (
        <NavigationContainer independent={true} >
            <stact.Navigator initialRouteName='routemap'>
                <stact.Screen name="routemap" options ={{headerShown: false}} component={MapScreen}/>
                <stact.Screen name="chooseroute" options ={{headerShown: false}} component={ChooseRoute}/>
            </stact.Navigator>
            <FlashMessage position="top"></FlashMessage>
        </NavigationContainer>



        
    )
}

