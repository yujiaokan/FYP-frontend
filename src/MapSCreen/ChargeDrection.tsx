import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View , TouchableOpacity, Text,Dimensions} from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native'
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAP_APIKEY } from "../../model/googleAPI";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getCurrentLocation, locationPermission} from '../ErrorHelper/HelperMessage'
import axios from "axios";
import { mapRetorStyle } from "../../model/Mapdatas";
import Nearbycharge from "./Nearbycharge";
import  {API_URL}  from "../../model/BackendAPI";
import { horizontalScale, verticalScale } from "../../theme/Scalling";
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA= 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;




// Define a type for your data
type Marker = any;
export let responsedata:any;
const fetchMarkers = async (): Promise<Marker[]> => {
  try {
    const response= await axios.get(`${API_URL}/v1/maps/details`);
   responsedata=response.data;
    return response.data;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array or re-throw the error
  }
};


  
function ChargeDrection(prop:{route:any}) {

    const navigation:any= useNavigation();
    const mapRef= useRef(null);

    const [destination, setDestination] = useState( {detail:{coordina:{
        latitude:0, 
        longitude: 0,
        latitudeDelta:  LATITUDE_DELTA,
         longitudeDelta: LONGITUDE_DELTA,
    },address:""}});
    const [permissions, setpermission] = useState(false);
    const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    const getMarkers = async () => {
      const markersData = await fetchMarkers();
      setMarkers(markersData);
    };
    getMarkers();
  }, []);
 useEffect(() => {
    if(prop.route.params){
    setpermission(true)
    setDestination({detail:{coordina:{latitude:prop.route.params.passDetail.coord.latitude,longitude:prop.route.params.passDetail.coord.longitude,
        latitudeDelta:  LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA},address:prop.route.params.passDetail.address}})
    }
  }, []);
    const [state, setstate]=useState({
        markers,
       
        curloc:{
            latitude:53.473349, 
            longitude: -6.244465,
            latitudeDelta:  LATITUDE_DELTA,
             longitudeDelta: LONGITUDE_DELTA,
        },
        droplocationCors:{
            latitude:0,
            longitude: 0,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            
        },
        isLoading:false

    })
    
    const {isLoading,curloc,droplocationCors}= state
    const onPressLocation =() =>{
        
        navigation.navigate('chooseroute',{getCoordinates: (data:any) =>{
            setstate({...state,droplocationCors:{latitude:data.destinationPoint.latitude,longitude:data.destinationPoint.longitude,latitudeDelta:LATITUDE_DELTA,longitudeDelta:LONGITUDE_DELTA}})
            
        }})
    }
    
    useEffect(()=>{
        _getLocation();
    },[])
    async function _getLocation (){

        const locPermissionDenied = await locationPermission()

        if (locPermissionDenied){
                    
                const coords:any = await getCurrentLocation();
           
                setstate({
                    ...state,
                    curloc:{
                        latitude:coords.latitude,
                        longitude:coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }
                })              
        }
        
    }
      

    useEffect(()=>{
        const interval = setInterval(()=>{
            _getLocation()
        },10000);

        return ()=>clearInterval(interval)
      })

    return(
        <View style={styles.container}>
            
          
                <MapView
                
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE} 
                    style={styles.map}
                    customMapStyle={mapRetorStyle}
                    showsUserLocation={true}
                    initialRegion={curloc}
                    >
                    
                    <Nearbycharge allCharger={responsedata} desti={destination} cnum={2}></Nearbycharge>

                        <Marker coordinate={curloc} image={require("../../assets/images/Car-Blue-icon_1.png")}/>
                                
                        {permissions?<Marker coordinate={{
                    latitude: destination.detail.coordina.latitude,
                    longitude: destination.detail.coordina.longitude,
                }} />:Object.keys(droplocationCors).length>0 &&<Marker coordinate={droplocationCors}/>}
            
                        {Object.keys(droplocationCors).length>0 &&<MapViewDirections 
                            origin={curloc} 
                            destination={prop.route.params?destination.detail.coordina:droplocationCors}
                            apikey={GOOGLE_MAP_APIKEY}
                            strokeWidth={3}
                            strokeColor="black"
                            optimizeWaypoints={true}
                            resetOnChange={true}
                            onStart={(params) => {
                            }}
                            onReady={result => {
                                mapRef.current.fitToCoordinates(result.coordinates,{
                                    edgePadding:{
                                        right:30,
                                        bottom:100,
                                        left:30,
                                        top:100,
                                    },
                                   
                                });
                            }}
                            />}
                </MapView>
                
                <View style={styles.card}>
                    <TouchableOpacity onPress={onPressLocation}>
                        <Ionicons style={styles.text} name="search-outline" >
                          {permissions?<Text >{destination.detail.address}</Text>
                            :<Text >search a route?</Text>}
                        </Ionicons>
                    </TouchableOpacity>
                
                    
                </View>
        </View>
    );
 }

 const styles = StyleSheet.create({
    container: {
      
      flex:1,
  
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      zIndex:0
    },
    bubble:{
       flexDirection:'row',
       alignSelf:'flex-start',
       backgroundColor:'#fff',
       borderColor: '#ccc',
       borderWidth: 0.5,
       padding:15,
       width: horizontalScale(150),
    },
    name:{
       fontSize:15,
       marginBottom:verticalScale(5),
       color:'black',
    },
    card:{
       backgroundColor:'while',
       width:'100%',
       padding:15,
       height:verticalScale(50),
       borderTopEndRadius: 14,
       borderStartStartRadius:14,
    },
    text:{
 
       fontSize:17,
       fontWeight:'bold',
      
    }
   });
   export default ChargeDrection