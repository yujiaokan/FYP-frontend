import React, {  useEffect, useMemo, useRef, useState } from "react";
import {  View ,Image, TouchableOpacity,Animated,Dimensions, Text,  PermissionsAndroid, Platform, _ScrollView} from "react-native";
import MapView, {Marker,  PROVIDER_GOOGLE} from 'react-native-maps'; 
import GetLocation from "react-native-get-location";
import { mapRetorStyle } from "../../model/Mapdatas";
import { styles } from "../../model/Style";
import {StarRating} from "../../model/StarRatjing";
import {  useNavigation } from "@react-navigation/native";
import axios from "axios";
import  {API_URL}  from "../../model/BackendAPI";

const {width,height}= Dimensions.get("window")
const CARD_WIDTH = width*0.65;
const SPACE_FOR_CARD =50;


type Marker = any;

const fetchMarkers = async (): Promise<Marker[]> => {
  try {
    const response = await axios.get(`${API_URL}/v1/maps/details`);
    return response.data;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array or re-throw the error
  }
};

export default function ChargerMap (){

    const [markers, setMarkers] = useState<any[]>([]); 

    useEffect(() => {
        const getMarkers = async () => {
        const markersData = await fetchMarkers();
        setMarkers(markersData);
        };
        getMarkers();
    }, []);
    

    const intimapstate= {
   
        region:{
            latitude: 53.325529,
            longitude: -6.501184,
            latitudeDelta: 0.3,
            longitudeDelta: 0.5,
        }

    }
    const [state,setstate] = useState(intimapstate);
    let mapAnimation = new Animated.Value(0);
    let mapIndex =0;

    useEffect(()=>{
        let regionTimeout: any;
        mapAnimation.addListener(({value})=>{
            let index = Math.floor(value / CARD_WIDTH +0.3);
            if(index>= markers.length){
                index = markers.length-1
            }
            if(index <= 0){
                index =0;
            }

            
            clearTimeout(regionTimeout);
            regionTimeout = setTimeout(()=>{
                if(mapIndex != index){
                    mapIndex = index;
                    const {coordinate} = markers[index];
                    _map.current.animateToRegion({
                        ...coordinate,
                        latituDelta: state.region.latitudeDelta,
                        longitudeDelta: state.region.longitudeDelta,
                    },
                    350)
                }
            },10)
        });
    });

    
    const navigation:any = useNavigation();
    const _map = useRef(null);
    const _ScrollView = useRef(null);
    const [permissionsGranted, setpermissionsGranted] = useState(false);
   
    const interpolations = markers.map((marker, index) => {
        
        const inputRange = [
          (index - 1) * CARD_WIDTH,
          index * CARD_WIDTH,
          ((index + 1) * CARD_WIDTH),
        ];
    
        const scale = mapAnimation.interpolate({
          inputRange,
          outputRange: [1, 1.5, 1],
          extrapolate: "clamp"
        });
    
        return { scale };
      });

    const onMarkerPress = (mapEventData: any) => {
        const markerid = mapEventData._targetInst.return.key;
        let x = (markerid * CARD_WIDTH) + (markerid * 20);
        if(Platform.OS === 'ios'){
            x= x-SPACE_FOR_CARD;
        }

        _ScrollView.current.scrollTo({
            x:x,y:0, animated: true
        });
    }
    useEffect(()=>{
      _getLocationPermission();

    },[])

    async function _getLocationPermission() {
      if (Platform.OS === 'android'){
          try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                  title: 'Location Permission',
                  message:
                    'Please allow Location premission to continues',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
                },
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  setpermissionsGranted(true);
                  _getCurrentLocation();
      
              } else {
                console.log('Camera permission denied');
              }
            } catch (err) {
              console.warn(err);
            }
      }else{
          setpermissionsGranted(true);
      }
          
    }
 
  

    const[currentLocation,setcurrentLocation] = useState(null);
    function _getCurrentLocation(){
      GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
      })
      .then(location => {
          

          setcurrentLocation(location);
         
          console.log('MY CURRENT LOCATION ',location);
          
      })
      .catch(error => {
          const { code, message } =error;
          console.warn(code, message);
      })
    }
   
    if(!permissionsGranted) return <View><Text >Please allow Location premission to continues</Text></View>
 
        return(
            <View style={styles.container}>
                <MapView
                ref={_map}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                customMapStyle={mapRetorStyle}
                showsUserLocation={true}
                initialRegion={state.region}
     
                >
                    {
                        markers.map((marker,index) =>{
                           
                            const scaleStyle = {
                                transform: [{
                                    scale: interpolations[index].scale,
                                }]
                            }
                            return(
                                <Marker key={index} 
                                coordinate={marker.coordinate}
                                title={marker.title}
                                description={marker.description}
                                onPress={(e) =>onMarkerPress(e)}
                                >
                                    <Animated.View style={styles.markerWrap}>
                                        <Animated.Image source={require('../../assets/images/userlocation.png')} style={[{width:35,height:40},scaleStyle]} resizeMode={"cover"}/>

                                    </Animated.View>
                                </Marker>
                                
                                
                            );

                        })
                    }
               

                 
                    
                </MapView>
               
                <Animated.ScrollView 
                    ref={_ScrollView}
                    horizontal scrollEventThrottle={1} 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.scrollView}
                    pagingEnabled
                    snapToInterval={CARD_WIDTH+20} 
                    snapToAlignment={'center'}
                    contentInset={{
                        top:0,
                        bottom:0,
                        left:50,
                        right:50
                    }}
                    contentContainerStyle={{paddingHorizontal: Platform.OS === 'android'? SPACE_FOR_CARD:0 }}
                    onScroll={Animated.event(
                        [{
                            nativeEvent:{
                                contentOffset:{
                                    x:mapAnimation,
                                }
                            },
                        },
                    ],
                    {useNativeDriver: true}
                    )}>

                        {
                            markers.map((marker,index) =>(
                                <View style={styles.card} key={index}>
                                    <Image style={{height:100,width:250}} source={{ uri: marker.image }} resizeMode="cover"/>

                                    <View style={styles.textContent}>
                                        <Text numberOfLines={1} style={styles.cardtitle}>{marker.address}</Text>
                                        <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
                                        <StarRating rating={marker.rating} reviewer={marker.reviewer}></StarRating>
                                        <TouchableOpacity onPress={()=>{navigation.navigate("ChargerDetail",{marker})}} 
                                        style={[styles.checkIn,{borderColor:'#FF6347',borderWidth:1}]}><Text style={[styles.textSign,{color:'#FF6347'}]}>check in</Text></TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        }
                        
                </Animated.ScrollView>
              
               
               
                
            </View>
        )
            
        
}
