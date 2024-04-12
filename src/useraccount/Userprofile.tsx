import React, { useEffect, useState } from "react";
import { Modal, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View,Button ,TextInput, TouchableHighlight, Alert} from "react-native";
import auth from '@react-native-firebase/auth';
import {logoutUser} from "./Logout";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import ButtonBox from "./ButtonBox";
import { colors,inputOptions,} from "../../theme/index";
import storage from '@react-native-firebase/storage';
import { CameraOptions, ImagePickerResponse, launchCamera, launchImageLibrary } from "react-native-image-picker";
import { API_URL } from "../../model/BackendAPI";
import { verticalScale ,scaleFontSize} from "../../theme/Scalling";

const user ={
    name:"yujiao",
    email:"7789um@gcmail.com",
    role:"admin",
};
//Define the props type for the component

type MyIconProps = {
  icon: any; 
  handler: any;
};
export default function Userprofile() {
  
   const defaultImg =
  "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png";
  const options: CameraOptions = {
    mediaType:'photo', // Assuming MediaType is an enum with 'photo'
    saveToPhotos:true,
    
  };
  const [displayName, setDisplayName] = useState('unknow');
  const [photoURL, setPhotoURL] = useState(defaultImg);
  const [email,setEmail]= useState('');
  const [useruid,setUseruid] = useState('');
  useEffect(() => {
    // Get the current user from Firebase
   
    auth().onAuthStateChanged(user => {
    
    const activeuser:any = user;
    if (activeuser) {
      // Set displayName and photoURL in state
      setDisplayName(user.displayName);
      setPhotoURL(user.photoURL);
      setEmail(user.email);
      setUseruid(user.uid);
     
    
    }
  });


}, []);

  const [avatar, setAvatar] = useState(defaultImg);
  const [userName, setUserName]= useState("unknown");
  const [imageUrl,setImgUrl] = useState('');
  const handleCameraResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled camera picker');
    } else if (response.errorCode) { // Notice the change here to 'errorCode'
      console.log('CameraPicker Error: ', response.errorMessage);
    } else if (response.assets && response.assets.length>0) {
      // Assuming you only care about the first image
      setAvatar(response.assets[0].uri);
      const imageuri =response.assets[0].uri;
     
      uploadImageToFirebase(imageuri).then((url:any) => {
       
        setImgUrl(url)
       console.log('Uploaded image URL:', url);
     });
      
      updateUserPhoto();
      
      console.log("image uri is", imageuri)
    }
  }; 


  const uploadImageToFirebase = async (uri: string): Promise<string | undefined> => {
    try {
      // Convert the image to a blob using rn-fetch-blob
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

   
  
  


  const updateUserPhoto = () => {
   const user= auth().currentUser;
    if (user) {
      try {
        console.log("imageUrl update is", imageUrl)
        user.updateProfile({
          
          photoURL: imageUrl, 
        });
        console.log('User profile updated');
      } catch (error) {
        console.error('Error updating user profile', error);
      }
    }
  };
  
 

 
  
  
  

  const updateUserName= async () => {
   const user= auth().currentUser;
    if (user) {
      user.updateProfile({
        displayName: userName,
     
      }).then(() => {
  
        console.log("Profile updated successfully!");
      }).catch((error: any) => {
        console.error("Error updating user profile", error);
  
      });
    }
  };


   
const openImagePicker =async () => {
  
        
      
    launchImageLibrary(options,handleCameraResponse);
    setModalVisible(false);
 
};


const clickPicture =  async() => {
    launchCamera(options, handleCameraResponse);
    setModalVisible(false);
 
};
 
    const deleted = () => {
      
      Alert.alert(
        "Delete Item",
        "Are you sure you want to delete this item?",
        [
        
          {
            text: "Confirm",
            onPress: () => {
              fetch(`${API_URL}/v1/maps/elecharger/${useruid}`, {
                method: 'DELETE',
                headers: {
                  // Include any necessary headers
                  'Content-Type': 'application/json',
                },
              })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(data => {
                Alert.alert('Success', data.message); 
              })
              .catch(error => {
                Alert.alert('Error', error.message);
              });
            }
          },
         
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
        ],
        { cancelable: false } // Don't close the alert when the user taps outside of it
      );
   
   }
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
   
  
    const navigation:any = useNavigation();

    const navigateHandler = (text: any) => {
      switch (text) {
        case "Massage":
          navigation.navigate("messages");
          break;
        case "Register":
          navigation.navigate("rform");
          break;
        default:
          case "Profile":
            navigation.navigate("updateprofile");
            break;
      }
    };
 
    return(
        

        <View style={styles.defaultStyle}>
            
  

            
            <View style={styles.container}>
            {photoURL?(<Avatar.Image
                source={{
                  uri: photoURL,
                }}
                size={100}
              />):(<Avatar.Image
              source={{
                uri: defaultImg,
              }}
              size={100}
            />)}

            <View style={styles.container}>
                <Button title="update Name/Photo" onPress={toggleModal} color="#2596be" />
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={isModalVisible}
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
                        <TextInput
                            {...inputOptions}
                            placeholder="name"
                            value={displayName}
                            onChangeText={setUserName}/>
                        <Button title="confirm" onPress={updateUserName} color="#2596be" />
                        <Button title="Close" onPress={toggleModal} color="#2596be" />
                      </View>
                </Modal>
              </View>
                          
              {displayName?(<Text style={styles.name}>{displayName}</Text>):(<Text style={styles.name}>Unknow</Text>)}
              <Text
                style={{
                  fontWeight: "300",
                  color: "black",
                }}
              >
                {email}
              </Text>
            </View>


            <View>
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: "space-between",
                }}
              >
            
                <ButtonBox
                 handler={navigateHandler}
                  text={"Register"}
                  icon={"clipboard-list"}
                  compont={1}
                />
                <ButtonBox
                 handler={navigateHandler}
                  text={"Massage"}
                  icon={"message"}
            
                  compont={1}
                />
                <ButtonBox
                  handler={navigateHandler}
                  text={"Profile"}
                  icon={"pencil"}
                  compont={1}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: "space-evenly",
                }}
              >
               
              </View>
            </View>
            
           
            <TouchableOpacity>
                <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}onPress={()=> navigation.navigate("chargerhistory")} >Charge History</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}} onPress={deleted}>Withdraw Your Home Charger</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}} onPress={logoutUser}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const MyIcon = ({ icon, handler }:MyIconProps) => (
  <TouchableOpacity onPress={handler}>
    <Avatar.Icon
      icon={icon}
      size={40}
      color={colors.color2}
      style={{
        backgroundColor: '#e28743',
      }}
    />
  </TouchableOpacity>
);
const styles = StyleSheet.create({

    defaultStyle:{
        padding: 35,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: "white",
      },

      formHeading : {
        fontSize: scaleFontSize(25),
        fontWeight: "500",
        textAlign: "center",
        color: "black",
        padding: 5,
        borderRadius: 5,
    },
    container: {
    
      padding: 30,
      borderRadius: 10,
      alignItems: "center",
    },
    name: {
      fontSize: scaleFontSize(20),
      fontWeight: "500",
      marginTop: 10,
      color: "black",
    },
    modalView: {
      margin: verticalScale(20),
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    modalText: {
      marginBottom: verticalScale(15),
      textAlign: 'center',
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
  });