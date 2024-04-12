import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { verticalScale } from '../../theme/Scalling';


function EachMessage(route:any) {
    const[username,setUsername]= useState('');
    const[usertext,setUsertext]= useState('');
    const[sentDate,setSentDate]= useState<any>([]);
   
    useEffect(()=>{

      
        

        // Update state variables
        setUsername(route.route.params.userName);
        setUsertext(route.route.params.texts);
        if (route.route.params.timestamp instanceof Date) {
            setSentDate(route.route.params.timestamp.toLocaleString());
          }
 
        console.log(route.route.params.userName);
    },[])
   
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          From {username} {sentDate}
        </Text>
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{usertext}</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10, 
      backgroundColor: '#fff', 
    },
    headerContainer: {
      paddingBottom: 10, 
    },
    header: {
      fontSize: 16,
      color: '#000',
      fontWeight: 'bold',
      marginBottom: verticalScale(5),
    },
    messageContainer: {
      backgroundColor: '#f0f0f0', 
      borderRadius: 5, 
      padding: 10, 
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    messageText: {
      fontSize: 14,
      color: '#333', 
    },
    
  });

export default EachMessage
