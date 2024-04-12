import { View, Text, TouchableOpacity, ToastAndroid, Image } from "react-native";
import React, { useState } from "react";
import {launchCamera, launchImageLibrary,CameraOptions, ImagePickerResponse} from 'react-native-image-picker';
import { Avatar } from "react-native-paper";
import { colors} from "../../theme/index";
import { useNavigation } from "@react-navigation/native";


type MyIconProps = {
  icon: any; 
  handler: any;
};
export default function CameraScreen () {

    const navigation:any = useNavigation();
    
    const[imgUri, setImgUrl]= useState(null)
    const options: CameraOptions = {
        mediaType:'photo', 
        saveToPhotos:true,
        
      };
      const handleCameraResponse = (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled camera picker');
        } else if (response.errorCode) { // Notice the change here to 'errorCode'
          console.log('CameraPicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length>0) {
          setImgUrl(response.assets[0].uri);
   
        }
      }; 
    const openImagePicker =async () => {
      
            
          
        launchImageLibrary(options,handleCameraResponse);
     

  };
 
  
    const clickPicture =  async() => {
        launchCamera(options, handleCameraResponse);
      

  };

  return (
    
    <View
      style={{
        flex: 1,
      }}
    >
   
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
    </View>
  );
};

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

