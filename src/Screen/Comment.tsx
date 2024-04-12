import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ArrowLeftIcon from 'react-native-heroicons/solid/ArrowLeftIcon'
import { submitComFormAsync } from 'redux/reducers/CommentReducer'
import { AppDispatch } from "../redux/Store";
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'
import  {API_URL}  from "../../model/BackendAPI";
import { verticalScale ,horizontalScale} from '../../theme/Scalling'
function Comment(route:any) {
    const navigation = useNavigation() 
    const [comment, setComment] = useState('');
    const [userName, setUserName] = useState('');
    const [userUid,setUseUid] = useState('');
    const maxChars = 150;
    const dispatch :AppDispatch= useDispatch();
    const [ratings, setRatings] = useState(1);
    const [charger,setCharger] = useState(route.route.params);
    const [newRating, setNewRating] = useState<any>();
    const [newReviewer, setNewReviewer] =useState<any>();
    useEffect(() => {
      if (route.route.params) {
        setCharger(route.route.params);
      }
    }, [route.route.params]);
    useEffect(() => {
      // Get the current user from Firebase
     
      auth().onAuthStateChanged(user => {
      console.log("key ",route.route.params);
      if (user) {
        // Set displayName and photoURL in state
        console.log("user is",user )
        console.log("email",user.email)
        setUserName(user.displayName);
        setUseUid(user.uid);     
      
      }
    });
  
  
  }, []);


useEffect(() => {
  
   const fetchUserDetails = async () => {
     try {
      const chargerID=charger;
       const response = await axios.get(`${API_URL}/v1/maps/detailsbyid/${chargerID}`);
       const data = await response.data;
      const newrating:Number = ((data.rating * data.reviewer)+ratings)/(data.reviewer+1)

      setNewRating(newrating); // Set the user details in state
      setNewReviewer(data.reviewer+1);
     } catch (error) {
       console.log(error); // Set an error message if the request fails
     } 
   };
   if (charger) {
    console.log("uodate detail screen",charger)
    fetchUserDetails();
   }
 }, [userUid]);

    const handleCommentChange = (text: React.SetStateAction<string>) => {
        setComment(text);
      };
    const submitComment = () => {
        if (comment.length === 0) {
          Alert.alert('Please enter a comment before posting.');
          return;
        }
        // Here would send the comment to server

        const formValues = {
            chargerId:route.route.params,
            userName:userName?userName:'unKnow',
            commentText:comment,
            useruuid:userUid,
           
          };
    
          updateRating()
          dispatch(submitComFormAsync(formValues))
          navigation.goBack();
      };
      const updateRating =() =>{
        const handleSubmit = async () => {
          try {
            // Construct the payload
            const payload = {
              rating: Number(newRating), // Ensure these are cast to Numbers
              reviewer: Number(newReviewer),
            };

            // Perform the PUT request to the update endpoint
            const response = await axios.put(`${API_URL}/v1/maps/updaterate/${charger}`, payload);

            // Handle the response
            if (response.data.success) {
              Alert.alert("Success", "Profile Updated Successfully");
            } else {
              Alert.alert("Failed", response.data.message);
            }
          } catch (error:any) {
          
            Alert.alert("Error", "Could not update the profile.",error);
          }
        };

        handleSubmit()
      }
            

  return (
    <View style={styles.container}>
           
                
        <TouchableOpacity 
            onPress={()=> navigation.goBack()}
        >
            <ArrowLeftIcon size="20" color="black" />
        </TouchableOpacity>

        <Text style={styles.header}>leave a comment</Text>
    
      <Text style={{margin:5}}>Rating</Text>
      <Picker
              selectedValue={ratings}
              onValueChange={(itemValue, itemIndex) => {
                setRatings(itemValue);
                console.log(itemIndex);
              } }
              style={styles.picker}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              </Picker>
        <TextInput
        style={styles.input}
        placeholder="Add a comment for the charger."
        value={comment}
        onChangeText={handleCommentChange}
        multiline
        maxLength={maxChars}
      />
      <Text style={styles.charCount}>{maxChars - comment.length} characters left</Text>
        <Button title="Post" onPress={submitComment} />

              
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
        height: verticalScale(250),
        textAlignVertical: 'top',
        marginBottom:20
      },
      charCount: {
        fontSize: 14,
        color: '#999',
        marginBottom: verticalScale(30),
      },
      picker: {
        height: verticalScale(50),
        width: horizontalScale(120),
      },
    
  });
export default Comment
