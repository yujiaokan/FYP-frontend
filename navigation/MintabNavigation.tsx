import React from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from '@react-navigation/native-stack' ;
import ChargerMap from "../src/MapSCreen/ChargerMap";



import Setting from "Screen/Setting";
import MapScreen from "MapSCreen/MapScreen";
import ChooseRoute from "MapSCreen/ChooseRoute";
import Comment from "Screen/Comment";
import Report from "Screen/Report";
import CheckIN from "Screen/CheckIN";
import Payment from "Screen/Payment";
import NavigateLSIn from "./NavigateLSIn";
import ChargeDrection from "MapSCreen/ChargeDrection";

const stact = createNativeStackNavigator();

export default function Mintabnavigation(navigatoto:any){
    console.log(navigatoto)
    return (
        <NavigationContainer independent={true} >
            <stact.Navigator initialRouteName='homemap'>
                <stact.Screen name="homemap" options ={{headerShown: false}} component={ChargerMap}/>
                <stact.Screen name="ChargerDetail" options={{headerShown : false}} component={Setting}/>
                <stact.Screen name="chdrection" options={{headerShown : false}} component={ChargeDrection}/>
                <stact.Screen name ="checkin"options={{headerShown : false}} component={CheckIN}/>
                <stact.Screen name ='payment'options={{headerShown : false}} component={Payment}/>
                <stact.Screen name="routemap" options ={{headerShown: false}} component={MapScreen}/>
                <stact.Screen name="chooseroute" options ={{headerShown: false}} component={ChooseRoute}/>
                <stact.Screen name ="comment" options ={{headerShown: false}} component={Comment}/>
                <stact.Screen name ="report" options ={{headerShown: false}} component={Report}/>
                <stact.Screen name ="userLSin" options={{headerShown:false}} component={NavigateLSIn}/>

            </stact.Navigator>
        </NavigationContainer>

        
    )
}

