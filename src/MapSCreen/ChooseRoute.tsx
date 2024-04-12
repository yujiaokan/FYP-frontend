import React, { useEffect, useState } from "react";
import { View,StyleSheet } from "react-native";
import AddressRoute from "./AddressRoute";
import CustomBtn from "././CustomButtom";
import { useNavigation } from "@react-navigation/native";
import { showError } from "ErrorHelper/HelperMessage";


function ChooseRoute(route:any){
    const navigation = useNavigation()
    const [param,setParam] = useState<any>();
    const [state,setState] = useState({
       
        destinationPoint:{}
    })
    const{destinationPoint}=state
    console.log(route.route.params
        )
    const checkValid =() => {
  
        if(Object.keys(destinationPoint).length ===0){
            showError('please enter a destination location')
            return false
        }

        return true
    }

    const fetchdestAddress =(lat: any,lng: any)=>{

        setState({...state,destinationPoint:{latitude:lat,longitude:lng}})
    }

    useEffect(()=>{
        setParam( route.route.params)
        console.log("choose route page",route)
    })

    const onDone =() => {
        const isValid = checkValid()
        if(isValid){
        param.getCoordinates({
            // startPoint,
            destinationPoint,
        })

        navigation.goBack()
        }
    }
    
    return(
        <View style={styles.conrainer}>

           <View style={styles.contrainerStyle}>
            <AddressRoute placehold="destination" fetchAddress={fetchdestAddress} />  
            </View>
            <CustomBtn btnText="Done" onpress={onDone} btnStyle={styles.textInputstyle}/>
            
      
        </View>
        
            
        
        
    )
}

const styles = StyleSheet.create({
    conrainer:{
        flex:1,
        padding:24
    },
    contrainerStyle:{
        flex:0.8
    },
    textInputstyle:{
        marginTop:24
    }
})

export default ChooseRoute