import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity ,ToastAndroid, Alert, Modal, TouchableHighlight, ScrollView, Button, Pressable} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {GOOGLE_MAP_APIKEY} from "../../model/googleAPI"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AppDispatch } from "../redux/Store";
import { useDispatch } from 'react-redux';
import { submitFormAsync } from '../redux/reducers/UserReducer';
import{
colors,
styles as sty,
} from "../../theme/index";
import { Picker } from '@react-native-picker/picker';
import { CameraOptions, ImagePickerResponse, launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Avatar } from "react-native-paper";
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../model/BackendAPI';
import { verticalScale,horizontalScale } from '../../theme/Scalling';
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'), 
  phone: Yup.string()
    .required('phone is required'), 
  address: Yup.string()
    .required('address is required'), 
  city: Yup.string()
    .required('city is required'), 
  eircode: Yup.string()
   .matches(/^[a-zA-Z0-9]+$/, 'Pin code must contain only numbers and letters')
  

  
});
type MyIconProps = {
  icon: any; 
  handler: any;
};
const allTimes = [
  "5:00","5:30", "6:00", "6:30","7:00","7:30", "8:00", ",8:30","9:00","9:30", "10:00","10:30", "11:00","11:30", "12:00", "12:30","13:00",
  "13:30","14:00","14:30", "15:00","15:30", "16:00", "16:30","17:00","17:30", "18:00", "18:30","19:00", "19:30","20:00", "20:30","21:00",
  "21:30","22:00","22:30", "23:00", "23:30","24:00"
];
export default function CustomTextInput ()  {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStartTime, setselectedStartTime] = useState("a1"); // Default value
  const [selectedEndTime, setselectedEndTime] = useState(selectedStartTime); // Default value
  const [userEmail, setuserEmail] = useState('');
  const [userUid,setUseUid] = useState(null);
  const [address, setAddress] = useState('');
  const [coordnate, setCoordnate] = useState( {curloc:{
        latitude:null, 
        longitude: null,
    
    }});

  const [userDetails, setUserDetails] = useState(null);
  const [layoutReady, setLayoutReady] = useState(false);
  const [avatar, setAvatar] = useState('file:///data/user/0/com.ecars_chargershare/cache/rn_image_picker_lib_temp_98bde60a-682b-43ec-a0f5-3dc62a077029.jpg');
  const formik = useFormik({
    initialValues: { name: '', email: '',phone:'',address:'',city:'',country:'Ireland' ,eircode:'',chargertypes:'',availbleTime:'',description:'',coordinate:{latitude:null,longitude:null},image:'',useruid:''},
    validationSchema,
  
    onSubmit: values => {
      formik.values.email=userEmail;
    formik.values.address=address;
    formik.values.image = url;
    if (selectedEndTime !=='Not Available' && selectedStartTime !=='Not Available')
        {formik.values.availbleTime=selectedStartTime+'-'+selectedEndTime;}
    else{
      formik.values.availbleTime='Not Available'
    }
    formik.values.useruid= userUid;
    formik.values.coordinate={latitude:coordnate.curloc.latitude,longitude:coordnate.curloc.longitude};
    console.log("detail issss",values);
      
       dispatch(submitFormAsync(values));
    },
  });
   
  const options: CameraOptions = {
    mediaType:'photo', 
    saveToPhotos:true,
    
  };
  const [url,setUrl] = useState('');
  const dispatch :AppDispatch= useDispatch();

    useEffect(() => {
 
     
      auth().onAuthStateChanged(user => {
      
      if (user) {
        setuserEmail(user.email);
        setUseUid(user.uid);
      
      }
    });
  
  }, [userUid]);


useEffect(() => {
   // Define the function to fetch user details
   const fetchUserDetails = async () => {
     try {
      
       const response = await axios.get(`${API_URL}/v1/maps/idtifyinguser/${userUid}`);
       const data = await response.data;
       setUserDetails(data.useruid); // Set the user details in state
     } catch (error) {
       console.log(error); // Set an error message if the request fails
     } 
   };
   if (userUid) {
    
    fetchUserDetails();
   }
 }, [userUid]);
   
       
 
  
      const uploadImageToFirebase = async (uri: string): Promise<string | undefined> => {
        try {
      
          const response = await fetch(uri);
          const blob = await response.blob();
          
      
          const imageRef = storage().ref('images').child(`myImage_${Date.now()}.jpg`);
      
          // Upload the blob to Firebase Storage
          await imageRef.put(blob);
            
      
          // Get the URL of the uploaded image
          const url = await imageRef.getDownloadURL();
          console.log('Image uploaded to Firebase Storage with URL:', url);
      
          return url;
        } catch (error) {
          console.error('Error uploading image to Firebase Storage', error);
          return undefined;
        }
      };
      
    

      const handleCameraResponse = (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled camera picker');
        } else if (response.errorCode) { 
          console.log('CameraPicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length>0) {
          setAvatar(response.assets[0].uri);
          const imageUri = avatar;
          uploadImageToFirebase(imageUri).then((url:any) => {
           setUrl(url)
         });

     
        }
      }; 
      const openImagePicker =async () => {
  
        
      
        launchImageLibrary(options,handleCameraResponse);
        setcameraModalVisible(false);

    };

    const clickPicture =  async() => {
      launchCamera(options, handleCameraResponse);
      setcameraModalVisible(false);
  
  };
  const [iscameraModalVisible, setcameraModalVisible] = useState(false);

  const toggleModal = () => {
    setcameraModalVisible(!iscameraModalVisible);
    
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

            
            
          }
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Failed to validate address');
        }
      };
      
      const findaddress =()=>{
        validateAddress({
            regionCode: 'IE',
            locality: 'Ireland',
            addressLines: [formik.values.address],
          });
    };
  

      const submitHandler = () => {
      
       findaddress();
      };
     const confirmsubmitHandler=()=>{
 
      formik.handleSubmit();
      navigation.goBack();
      }
       const [filteredEndTimes, setFilteredEndTimes] = useState(allTimes);

  const updateEndTimes = (startTime: string) => {
    // Find the index of the selected start time
    const startIndex = allTimes.indexOf(startTime);
    // Filter out the times that are before the selected start time
    const newEndTimes = allTimes.slice(startIndex + 1);
    // If there are no end times left (start time is the last available time), keep the original array
    setFilteredEndTimes(newEndTimes.length > 0 ? newEndTimes : allTimes);
    // Set the first available end time as the selected end time
    setselectedEndTime(newEndTimes[0] || allTimes[0]);
  };
  
    return(

       <View style={sty.defaultStyle as any}>
         
              <Text style={{alignSelf:'center',fontSize:25,fontStyle:'normal',color:'#87A922',fontWeight:'bold'}}>Share your EV charger</Text>
           
        {userDetails?<View>
                        <Text style={{padding:5, alignSelf:'flex-end',margin:5,fontSize:30}}>You already registed your home electric car charger</Text>
                        
                    </View>:(<><ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            padding: 20,
            borderRadius: 10,
          } as any}
        >
          <View style={styles.container}>
            <View style={styles.labelContainer}>
              <Text>User Name</Text>
            </View>
            <TextInput style={styles.textInput} value={formik.values.name}
              onChangeText={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')} />
          </View>
          <View style={{ marginBottom: 15 }}></View>
          <View style={styles.container}>
            <View style={styles.labelContainer}>
              <Text>Phone</Text>
            </View>
            <TextInput style={styles.textInput}
              value={formik.values.phone}
              onChangeText={formik.handleChange('phone')}
              onBlur={formik.handleBlur('phone')} />
          </View>
          <View style={{ marginBottom: 15 }}></View>
          <View style={styles.container}>
            <View style={styles.labelContainer}>
              <Text>Email</Text>
            </View>
            <TextInput style={styles.textInput}
              value={userEmail}
              onChangeText={formik.handleChange(userEmail)}
              onBlur={formik.handleBlur(userEmail)} />
          </View>
          <View style={{ marginBottom: 15 }}></View>
          <View style={styles.container}>
            <View style={styles.labelContainer}>
              <Text>Address</Text>
            </View>
            <TextInput style={styles.textInput}
              value={formik.values.address}
              onChangeText={formik.handleChange('address')}
              onBlur={formik.handleBlur('address')} />
          </View>
          <View style={{ marginBottom: 15 }}></View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <View style={styles.container}>
              <View style={styles.labelContainer}>
                <Text>City</Text>
              </View>
              <TextInput style={styles.textInput}
                value={formik.values.city}
                onChangeText={formik.handleChange('city')}
                onBlur={formik.handleBlur('city')} />
            </View>

            <View style={styles.container}>
              <View style={styles.labelContainer}>
                <Text>County</Text>
              </View>
              <TextInput placeholder='Ireland' value='Ireland' style={styles.textInput} />
            </View>
          </View>
          <View style={{ marginBottom: 15 }}></View>
          <View style={styles.container}>
            <View style={styles.labelContainer}>
              <Text>Eircode</Text>
            </View>
            <TextInput value={formik.values.eircode}
              style={styles.textInput}
              onChangeText={formik.handleChange('eircode')}
              onBlur={formik.handleBlur('eircode')} />
          </View>
          <View style={{ marginBottom: 15 }}></View>

      
          <Text>Available Time</Text>
    
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{margin:20}}>Start</Text>
                  <Picker
                    selectedValue={selectedStartTime}
                    onValueChange={(itemValue) => {
                      setselectedStartTime(itemValue);
                      updateEndTimes(itemValue)
                      console.log("itemValue",itemValue);
                    } }
                    style={styles.picker}
                  >
                    {allTimes.map((time) => (
                  <Picker.Item key={time} label={time} value={time} />
                ))}


            </Picker>
            <Text style={{margin:20}}>End</Text>
            <Picker
              selectedValue={selectedEndTime}
              onValueChange={(itemValue, itemIndex) => {
                setselectedEndTime(itemValue);
                console.log(itemIndex);
              } }
              style={styles.picker}
            >
              {filteredEndTimes.map((time) => (
            <Picker.Item key={time} label={time} value={time} />
          ))}

            </Picker>

          </View>
   

          </View>
          <View style={styles.container}>
            <View style={styles.labelContainer}>
              <Text>Charger Types</Text>
            </View>
            <TextInput
              value={formik.values.chargertypes}
              style={styles.textInput}
              onChangeText={formik.handleChange('chargertypes')}
              onBlur={formik.handleBlur('chargertypes')} />
          </View>
          <View style={{ marginBottom: 15 }}></View>
          <View style={styles.container}>
            <View style={styles.labelContainer}>
              <Text>Description</Text>
            </View>
            <TextInput style={styles.textInput} />
          </View>
          <View style={{ marginBottom: 15 }}></View>
          <View>
            <TouchableOpacity
              onPress={toggleModal}>
              <Text style={{ color: 'red', fontSize: 15, fontStyle: 'italic' }}>Click add your home charger photo</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={iscameraModalVisible}
              onRequestClose={toggleModal}
            >
              <View style={styles.modalView}>
                <View
                  style={{
                    flexDirection: "row",
                    bottom: 10,
                    width: "100%",
                    justifyContent: "space-evenly",
                    position: "absolute",
                  }}
                >
                  <MyIcon icon="image" handler={openImagePicker} />
                  <MyIcon icon="camera" handler={clickPicture} />
   
                </View>
                <Text style={styles.modalText}>Select an option</Text>
                <Button title="Close" onPress={toggleModal} color="#c70049" />
              </View>
            </Modal>
            {url ? <Text>{url}</Text> : null}
          </View>
          <View style={{ marginBottom: 30 }}></View>
          <Pressable
          disabled={formik.values.name&&formik.values.address&&formik.values.city&&formik.values.phone?false:true}
            style={formik.values.name&&formik.values.address&&formik.values.city&&formik.values.phone?styles.button:styles.disbutton} onPress={submitHandler}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
          </Pressable>
          <View style={{ marginBottom: 20 }}></View>
          <View style={{ marginBottom: 10 }}></View>

        </ScrollView><Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setIsModalVisible(!isModalVisible);
          } }
        >
            <View style={[styles.modalView, {height: '80%'}]}>
              <Text style={styles.modalText}>Confirm Location</Text>
              <Text style={styles.centeredView}>Address: {address}</Text>
              <Text style={styles.centeredView}>Latitude: {coordnate.curloc.latitude}</Text>
              <Text style={styles.centeredView}>Longitude: {coordnate.curloc.longitude}</Text>
                <View style={{ height: 200, width: '100%' }} onLayout={() => setLayoutReady(true)}> 
                {layoutReady &&(<MapView
                  style={{ flex: 1 }} 
                  initialRegion={{
                    latitude: 53.325529,
                    longitude: -6.501184,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                  }}
                  
                
                >

                  {coordnate.curloc && coordnate.curloc.latitude && coordnate.curloc.longitude && (
                    <Marker coordinate={coordnate.curloc} />
                  )}
          
          </MapView>)}
          </View>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <TouchableHighlight
                  style={styles.confirmButton}
                  onPress={() => {
                    setIsModalVisible(!isModalVisible);
                    confirmsubmitHandler();
                  } }
                >
                  <Text style={styles.textStyle}>Confirm</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.cancelButton}
                  onPress={() => {
                    setIsModalVisible(!isModalVisible);
                  } }
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableHighlight>
                </View>
              </View>
            {/* </View> */}
          </Modal></>)}
          
            
        </View>
)};

const MyIcon = ({ icon, handler }:MyIconProps) => (
  <TouchableOpacity onPress={handler}>
    <Avatar.Icon
      icon={icon}
      size={40}
      color={colors.color2}
      style={{
        backgroundColor: colors.color1,
      }}
    />
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  container: {
    
    height: 55, 
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
  disbutton:{
    backgroundColor: "#87A922", 
    alignSelf: "center", 
    height: verticalScale(30),
    justifyContent: 'center',
    borderRadius: 10,
    opacity: 0.5,

  },
  button: {
   
    backgroundColor: "#87A922", 
    alignSelf: "center", 
    height: 30,
    justifyContent: 'center',
    borderRadius: 10,
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


})


