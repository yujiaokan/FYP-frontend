import React, { useEffect } from 'react';
import MainCard from './MainCard';
import { Text, View } from 'react-native';

export default function Setting(route:any) {

  return (
  
   
    <MainCard chargerid={route.route.params.marker.id} imagepath={route.route.params.marker.image} 
    description={route.route.params.marker.description} plug={route.route.params.marker.chargertypes} avaTime={route.route.params.marker.availbleTime}></MainCard>
      
 
    
  );
};


