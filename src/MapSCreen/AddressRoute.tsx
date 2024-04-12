import { GOOGLE_MAP_APIKEY } from "../../model/googleAPI";
import React from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { verticalScale } from "../../theme/Scalling";

export default function AddressRoute(placeholds:{placehold:any,fetchAddress:any}){
    const onPressAddress = (data: any,details: { geometry: { location: { lat: any; lng: any; }; }; })=>{
        const lat = details.geometry.location.lat
        const lng = details.geometry.location.lng
        placeholds.fetchAddress(lat,lng)
    }
    return(
        <View style={{flex:1}}>
            <GooglePlacesAutocomplete
                placeholder={placeholds.placehold}
                onPress={onPressAddress }
                fetchDetails={true}
             
                query={{ key: GOOGLE_MAP_APIKEY, language: 'en' }} 
                styles={{textInputContainer: styles.contrainerStyle,textInput: styles.textInputstyle}}/>
                
        </View>
        
            
        
        
    )
}

const styles = StyleSheet.create({
    conrainer:{
        flex:1
    },
    contrainerStyle:{
        backgroundColor:'white',
        borderBottomStartRadius:verticalScale(20),
        borderBottomEndRadius:verticalScale(20),
        borderColor:'black',
        borderBlockColor:'black',
        borderStyle:'solid'
    },
    textInputstyle:{
        height:verticalScale(40),
        color:'black',
        fontSize:16,
        backgroundColor:'#F3F3F3'
    }
})