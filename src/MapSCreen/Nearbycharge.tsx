import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Dimensions, View } from 'react-native';
import  {Marker } from 'react-native-maps';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA= 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


function Nearbycharge(prop:{allCharger:any,desti:any, cnum:number}) {

const [nearbychargers, setnearbyChargers] = useState<any[]>([]);
const [markers, setMarkers] = useState<any[]>(prop.allCharger);
//For the proximity search, the Haversine formula is often used to calculate 
//the great-circle distance between two points on the earth's surface, 
//given their longitude and latitude. 
//This formula accounts for the curvature of the earth.
useEffect(() => {
  setMarkers(prop.allCharger);    
}, [prop.allCharger]);
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const Rad = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = Rad * c; // Distance in km
  return distance;
}

function deg2rad(deg: any) {
  return deg * (Math.PI / 180);
  }
  

if(prop.cnum===2){
 
  const [destination, setDestination] = useState( {detail:{coordina:{
    latitude:prop.desti.detail.coordina.latitude, 
    longitude: prop.desti.detail.coordina.longitude,
    latitudeDelta:  LATITUDE_DELTA,
     longitudeDelta: LONGITUDE_DELTA,
},address:""}});
useEffect(() => {
  setDestination({
      detail: {

        coordina: {
          latitude: prop.desti.detail.coordina.latitude,
          longitude: prop.desti.detail.coordina.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        address: prop.desti.detail.address || ""
      }

    });
}, [prop.desti.detail.coordina.latitude,prop.desti.detail.coordina.longitude]);






function findNearbyChargerPoints(maxDistance: number) {
try {

return prop.allCharger.map((chargerPoint: any) => ({
         
    ...chargerPoint,
    distance: getDistanceFromLatLonInKm(
      destination.detail.coordina.latitude,
      destination.detail.coordina.longitude,
      chargerPoint.coordinate.latitude,
      chargerPoint.coordinate.longitude,
   ),
  }))
  // Only include charger points within maxDistance
  .filter((chargerPoint:any )=> chargerPoint.distance <= maxDistance && chargerPoint.distance!=0 ) 
  .sort((a: any, b:  any) => a.distance - b.distance); // Sort by distance, closest first
} catch (error) {
console.error(error);
return [];
}
}

useEffect(() => {
const nearbyChargers= findNearbyChargerPoints(3)

  setnearbyChargers(nearbyChargers);


}, []);


}else{
  
  const [destination, setDestination] = useState( {detail:{coordina:{
    latitude:prop.desti.latitude, 
    longitude: prop.desti.longitude,
    latitudeDelta:  LATITUDE_DELTA,
     longitudeDelta: LONGITUDE_DELTA,
}}});
useEffect(() => {
  setDestination({
      detail: {

        coordina: {
          latitude: prop.desti.latitude,
          longitude: prop.desti.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
       
      }

    });
}, [prop.desti.latitude,prop.desti.longitude]);



function findNearbyChargerPoints(maxDistance: number) {
try {

return prop.allCharger.map((chargerPoint: any) => ({
         
    ...chargerPoint,
    distance: getDistanceFromLatLonInKm(
      destination.detail.coordina.latitude,
      destination.detail.coordina.longitude,
      chargerPoint.coordinate.latitude,
      chargerPoint.coordinate.longitude,
   ),
  }))
  // Only include charger points within maxDistance
  .filter((chargerPoint:any )=> chargerPoint.distance <= maxDistance && chargerPoint.distance!=0 ) 
  .sort((a: any, b:  any) => a.distance - b.distance); // Sort by distance, closest first
} catch (error) {
console.error(error);
return [];
}
}

useEffect(() => {
const nearbyChargers= findNearbyChargerPoints(3)

  setnearbyChargers(nearbyChargers);

}, []);


}
  return (
    <View>
        {nearbychargers.map((charger,index) =>(<Marker key={index}  pinColor="#228b22" coordinate={charger.coordinate} title={charger.address}/>))}
    </View>
    
  )
}

export default Nearbycharge
