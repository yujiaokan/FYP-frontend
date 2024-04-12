import { View, Text, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, Alert, Modal, TouchableHighlight } from "react-native";
import React, { useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { selectFormData, updateFormAsync } from '../redux/reducers/UserReducer';
import { AppDispatch } from "../redux/Store";
import {GOOGLE_MAP_APIKEY} from "../../model/googleAPI"
import{
  colors,
  styles as sty,
  inputOptions,
  formStyles as fstyles,
  } from "../../theme/index";
import axios from "axios";
import { API_URL } from "../../model/BackendAPI";
import { verticalScale,horizontalScale } from "../../theme/Scalling";
export default function UpdateProfile () {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation:any = useNavigation();
  const dispatch :AppDispatch= useDispatch();
  const formData = useSelector(selectFormData);
  const [coordnate, setCoordnate] = useState( {curloc:{
      latitude:null, 
      longitude: null,

  }});


const [userUid,setUseUid] = useState(null);
const [userDetails, setUserDetails] = useState<any>([]);

       
const [address, setAddress] = useState<string>("");
const [city, setCity] = useState<string>("");
const [eircode, setEircode] = useState<string>("");
const [availbleTime,setAvailbleTime]=useState<string>("");
const [description,setDescription]=useState<string>("");
const [email, setEmail] = useState<string>("");
const [mophone, setMophone] = useState<string>("");
  
useEffect(() => {
     
      auth().onAuthStateChanged(user => {
      
      if (user) {
  
        setUseUid(user.uid);
      
      
      }
    });
  
  }, [userUid]);

useEffect(() => {
   const fetchUserDetails = async () => {
     try {
      
       const response = await axios.get(`${API_URL}/v1/maps/idtifyinguser/${userUid}`);
       const data = await response.data;
       setUserDetails(data);
       setAddress(data.address);
       setCity(data.city);
       setEmail(data.email);
       setMophone(data.phone);
       setEircode(data.eircode);
       setAvailbleTime(data.availbleTime);
       setDescription(data.description);
    
     } catch (error) {
       console.log(error); 
     } 
   };
   if (userUid) {
    console.log("uodate detail screen",userUid)
    fetchUserDetails();
   }
 }, [userUid]);



    const submitHandler = () => {

      console.log("jingguozheli",userUid,address,email,mophone,city,eircode,availbleTime,description,coordnate);
   
      const formValues = {
        address:address,
        email:email,
        phone:mophone,
        city:city,
        eircode:eircode,
        availbleTime:availbleTime,
        description:description,
        coordinate:coordnate,
     
      };

      const updateData = {
        userId:userUid,
        formData: formValues,
      };
      dispatch(updateFormAsync(updateData));
      navigation.goBack()
      
    };

    const validateAddress = async (addressData: { regionCode: any; locality: any; addressLines: any; }) => {
      const url = `https://addressvalidation.googleapis.com/v1:validateAddress?key=${GOOGLE_MAP_APIKEY}`;
      const headers = {
        'Content-Type': 'application/json',
      };
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            address: {
              regionCode: addressData.regionCode,
              locality: addressData.locality,
              addressLines: addressData.addressLines,
            },
          }),
        });
    
        const data = await response.json();
    
        if (data.error) {
          Alert.alert('Error', data.error.message);
        } else {
        
          const newCoordinate = {
              latitude: data.result.geocode.location.latitude,
              longitude: data.result.geocode.location.longitude,
          };
          setAddress(data.result.address.formattedAddress)
          setCoordnate({ curloc: newCoordinate });
          setIsModalVisible(true); 
       
        
         console.log(data.result.address)
          
          
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to validate address');
      }
    };
 
    const findaddress =()=>{
     
      validateAddress({
          regionCode: 'IE',
          locality: 'Dublin',
          addressLines: [address],
        });
  };
  return (
    <View style={sty.defaultStyle}>
   
     
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={sty.formHeading}>Edit Charger Detail</Text>
      </View>
  

       {userDetails? 
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          padding: 20,
          elevation: 10,
          borderRadius: 10,
          backgroundColor: colors.color3,
        }}
      >
        <View>
       

          <TextInput
            {...inputOptions}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
           {...inputOptions}
            value={mophone}
            onChangeText={setMophone}
            />
          
          <TextInput
            {...inputOptions}
            value={address}
            onChangeText={setAddress}
          />
         <TextInput
            {...inputOptions}
            value={city}
            onChangeText={setCity}
          />
       

          <TextInput
            {...inputOptions}
            value={eircode}
            onChangeText={setEircode}
          />

          <TextInput
            {...inputOptions}
            value={availbleTime}
            onChangeText={setAvailbleTime}
          />

          <TextInput 
              style={styles.input}
              multiline
              value={description}
              onChangeText={setDescription}
            />

          <Button
            textColor={colors.color2}
            style={fstyles.btn}
            onPress={findaddress}
          >
            Update
          </Button>
        </View>
      </ScrollView>
       :(<View>
                        <Text style={{padding:5, alignSelf:'flex-end',margin:5,fontSize:30}}>Have not yet to registe a form?</Text>
                        <TouchableOpacity onPress={()=> navigation.navigate("rform")}>
                            <Text style={{padding:5, alignSelf:'flex-end',margin:5,fontSize:20,color:'green'}}> Registration Form</Text>
                        </TouchableOpacity>
                    </View>) 
                    } 
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                        setIsModalVisible(!isModalVisible);
                    }}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <Text style={styles.modalText}>Confirm Location</Text>
                        <Text>Address: {address}</Text>
                        <Text>Latitude: {coordnate.curloc.latitude}</Text>
                        <Text>Longitude: {coordnate.curloc.longitude}</Text>

                        <TouchableHighlight
                            style={styles.confirmButton}
                            onPress={() => {
                            submitHandler();
                            setIsModalVisible(!isModalVisible);
                            
                            }}
                        >
                            <Text style={styles.textStyle}>Confirm</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={styles.cancelButton}
                            onPress={() => {
                            setIsModalVisible(!isModalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableHighlight>
                        </View>
                    </View>
            </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    
    height: verticalScale(60), 
    position: 'relative',
  },
  labelContainer: {
    position: 'absolute',
    backgroundColor: '#FFF',
    top: -8,
    left: 25,
    padding: 5,
    zIndex: 20,
  },
  textInput: {
    flex: 1, 
    borderWidth: 1, 
    borderColor: "grey",
    justifyContent: 'flex-end',
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 25,
  },
  map: {
    height: verticalScale(200),
    
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: verticalScale(20),
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  confirmButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15
  },
  cancelButton: {
    backgroundColor: "#f44336",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: verticalScale(15),
    textAlign: "center"
  },
  
  picker: {
    height: verticalScale(50),
    width: horizontalScale(120),
  },
  input: {
    height: 100,
    backgroundColor: colors.color2,
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(20),
    mode: "outlined",
    activeOutlineColor: colors.color1,
  },

})

