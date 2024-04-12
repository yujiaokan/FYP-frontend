import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ArrowLeftIcon from 'react-native-heroicons/solid/ArrowLeftIcon'
import { AppDispatch } from "../redux/Store";
import { useDispatch } from 'react-redux';
import { db } from '../useraccount/firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import auth from '@react-native-firebase/auth';
import axios from 'axios'
import { API_URL } from '../../model/BackendAPI';
import { verticalScale,scaleFontSize } from '../../theme/Scalling';

function Report(route:any) {
    const navigation = useNavigation() 
    const [texts, setTexts] = useState('');
    const [userName, setUserName] = useState('');
    const [senderId,setsenderId] =useState('');
    const [senderName,setsenderName] =useState('');
    const [senderEmail,setsenderEmail] =useState('');
    const [receiverId,setreceiverId] =useState('');
    const maxChars = 300;
    const dispatch :AppDispatch= useDispatch();
    const [charger,setCharger] = useState(route.route.params);
    useEffect(() => {
      if (route.route.params) {
        setCharger(route.route.params);
      }
    }, [route.route.params]);
    useEffect(() => {
    
      auth().onAuthStateChanged(user => {
      
 
      if (user) {
  
        setsenderId(user.uid);
        setsenderEmail(user.email);
        if(user.displayName==null){
          setsenderName('Unknow')
        }else{
          setsenderName(user.displayName)
        }
             
      
      }
    });
  
  }, []);


  type Marker = any;
  
  const fetchMarkers = async (): Promise<Marker> => {
    try {
      console.log("report screen chargerid",charger)
      const response = await axios.get(`${API_URL}/v1/maps/detailsbyid/${charger}`);

      return response.data;
    } catch (error) {
      console.error(error);
      return []; 
    }
  };
  


  useEffect(() => {
    
      const getMarkers = async () => {
      
          const markersData = await fetchMarkers();
          console.log("recive",markersData.useruid)
          setreceiverId(markersData.useruid)
          setUserName(markersData.name);
      };
      if(charger){
      getMarkers();
    }
  }, [userName]);
  
    const submitComment = () => {
      
        if (texts.length === 0) {
          Alert.alert('Please enter a comment before posting.');
          return;
        }
     
     
    
        
         sendMessage();
      };
  const sendMessage = async () => {
        try {
          await addDoc(collection(db, 'usermessages'), {
            senderId :senderId,
            username:senderName,
            receiverId:receiverId,
            texts:texts,
            read: false,
            timestamp: new Date() 
          });
          navigation.goBack()
          console.log('Message sent!');
        } catch (error) {
          console.error('Error sending message:', error);
        }
        
        
      };    
    
  return (
    <View style={styles.container}>
           
                
        <TouchableOpacity 
            onPress={()=> navigation.goBack()}
        >
            <ArrowLeftIcon size="20" color="black" />
        </TouchableOpacity>

        <Text style={styles.header}>Report Problem</Text>
        <TextInput
        style={styles.userinput}
        placeholder={"To "+userName}
        value={"To: "+userName}
      
       
      />
        <TextInput
        style={styles.input}
        placeholder="Add a short description of your issue."
        value={texts}
        onChangeText={setTexts}
        multiline
        maxLength={maxChars}
      />
      <Text style={styles.charCount}>{maxChars - texts.length} characters left</Text>
        <Button title="Send Message" onPress={submitComment} />

              
        </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: verticalScale(20),
        alignSelf:'center'
      },
      userinput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        textAlignVertical: 'top',
        marginBottom:verticalScale(20)
      },
      input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        height: 250,
        textAlignVertical: 'top',
        marginBottom:verticalScale(20)
      },
      charCount: {
        fontSize: scaleFontSize(14),
        color: '#999',
        marginBottom: verticalScale(30),
      },
  });
export default Report
