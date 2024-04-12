import React, { useEffect, useMemo, useRef,useState } from 'react';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import ButtonBox from '../useraccount/ButtonBox';
import { useNavigation } from '@react-navigation/native';
import { Modal, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View,Button, Image, Dimensions, Pressable, FlatList } from "react-native";
import { Avatar } from "react-native-paper";
import { colors } from "../../theme/index";
import { CameraOptions, ImagePickerResponse, launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from 'axios';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import { API_URL } from '../../model/BackendAPI';
import { verticalScale,scaleFontSize ,horizontalScale} from '../../theme/Scalling';
type MyIconProps = {
    icon: any; 
    handler: any;
  };
  interface CommentsItem {
    
    _id:string;
    userName:string;
    commentText: string;
    createdAt:Date;
   
    
  }
  
  interface ListItemProps {
    item: CommentsItem;
  }
function MainCard(props:{chargerid:any, imagepath:any,plug:any,description:any,avaTime:any}) {
    const screen = Dimensions.get('window');
    const ASPECT_RATIO = screen.width / screen.height;
    const LATITUDE_DELTA= 0.04;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const [chargerid,setChargerid] = useState(props.chargerid);
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [eircode,seteircode] = useState('');
    const [availbleTime, setAvialbletime] = useState('');
    const [plugs,setplugs] = useState(props.plug);
    const [desc,setDisc] = useState(props.description);
    const [avatime,setAvatime] = useState(props.avaTime);


    const options: CameraOptions = {
      mediaType:'photo', 
      saveToPhotos:true,
      
    };
   
    useEffect(() => {
      console.log("main card plug path",props.avaTime)
        if (props.chargerid) {
          setChargerid(props.chargerid);
        }
      }, [props.chargerid]);
  
    const [avatar, setAvatar] = useState(props.imagepath);
    const handleCameraResponse = (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.errorCode) { 
        console.log('CameraPicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length>0) {
  
        setAvatar(response.assets[0].uri);
        const imageuri =response.assets[0].uri;
        console.log("image uri is", imageuri)

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
  

     
      const [isModalVisible, setModalVisible] = useState(false);
  
      const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };
      const navigation:any = useNavigation();
      const navigateHandler = (text: any) => {
        switch (text) {
          case "Direction":
            navigation.navigate("chdrection",{passDetail:{
              coord:{latitude:latitude,longitude:longitude,latitudeDelta:LATITUDE_DELTA,longitudeDelta:LONGITUDE_DELTA},address:address}});
            break;
          case "Comment":
            navigation.navigate("comment",chargerid);
            break;
             
          default:
            case "Report":
            navigation.navigate("report",chargerid);
            break;
           
        }
      };
    
    const [latitude,setLatitude] = useState() 
    const [longitude,setLongitude] = useState()
    const bottomSheetRef = useRef(null);
  

    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  
   
    const handleSheetChanges = (index: number) => {
      console.log('handleSheetChanges', index);
    };
  
  type Marker = any;
  
  const fetchMarkers = async (): Promise<Marker> => {
    try {
      console.log("Maincard screen chargerid",chargerid)
      const response = await axios.get(`${API_URL}/v1/maps/detailsbyid/${chargerid}`);
    
      return response.data;
    } catch (error) {
      console.error(error);
      return []; 
    }
  };
  


  useEffect(() => {
    
      const getMarkers = async () => {
      
          const markersData = await fetchMarkers();
          console.log("maincard get coordination from mongodb map",markersData.coordinate.latitude)
        
          setLongitude(markersData.coordinate.longitude)
          setLatitude(markersData.coordinate.latitude)
          setAddress(markersData.address);
          setCity(markersData.city);
          seteircode(markersData.eircode);
          setAvialbletime(markersData.availbleTime);
      };
      if(chargerid){
      getMarkers();
      }
  }, []);
  
     type ViewComment = any;
    
    const getCommentsFromAPI = async (): Promise<ViewComment[]> => {
      try {
        console.log("MainCard Charger",chargerid)
        const chargerID=chargerid;
        const response = await axios.get(`${API_URL}/v1/comments/getcomments/${chargerID}`);
     
        return response.data;
      } catch (error) {
        console.error("this is error",error);
        return []; 
      }
    };
    
      const [comments, setComments] = useState([]);
    useEffect(() => {
      const fetchComments = async () => {
        if (chargerid) {
            const fetchedComments = await getCommentsFromAPI();
            setComments(fetchedComments);}
      };
      fetchComments();
    }, [chargerid]);
    const[initializing, setInitializing] = useState<Boolean>(true)
    const[user, setUser]= useState<FirebaseAuthTypes.User>()
    useEffect(()=>{
        auth().onAuthStateChanged(activeUser =>{
          console.log("activeUser is ",activeUser);
            setUser(activeUser);
            if(initializing){ setInitializing(false)};
        });
    },[initializing]);

if(initializing) return null;
    // renders
    const ListItem: React.FC<ListItemProps> = ({ item }) => {
      return (
         
              <View>
              <Text style={{fontWeight:'bold',fontSize:15}} >
              {item.userName+'              '+item.createdAt}
              </Text>
              <Text >
              {item.commentText}
              </Text>
              </View>
        
      
      );
    };
    return (
     
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {user?<Button
          onPress={() => bottomSheetRef.current?.expand()}
          title="Start Check-IN"
        />:(<View><TouchableOpacity onPress={()=> navigation.navigate('userLSin')}><Text style={styles.Textstyle}>Please LogIn First</Text></TouchableOpacity></View>)}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1} 
          snapPoints={snapPoints}
          enablePanDownToClose={true} 
          onChange={handleSheetChanges}
        >
         
         <BottomSheetScrollView>
          <View style={styles.defaultStyle}>
                 
                  <Text>{address+',  '+city+'  '+eircode}</Text>
                  <Text>{'Availble Time '+availbleTime}</Text>
              
                      
                      
                      <View style={styles.container}>
                      <Image
                          source={{
                          uri: avatar,
                          }}
                          style={styles.chargerImage}
                         
                      />
          
          
                      <View style={styles.container}>
                         
                      <Pressable disabled={availbleTime==='Not Available'?true:false}style={availbleTime==='Not Available'?styles.disbutton:styles.button} onPress={()=> navigation.navigate("checkin",{availbleTime,chargerid})}>
                      <Text style={styles.buttonText}>Start Charge</Text>
                      </Pressable>
                                      
          
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
                                  <Text style={styles.modalText}>Select an option</Text>
                                
                                  <Button title="Close" onPress={toggleModal} color="#c70049" />
                              </View>
                          </Modal>
                      </View>
          
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
                          text={"Direction"}
                          icon={"directions"}
                          compont={2}
                          />
                          <ButtonBox
                          handler={navigateHandler}
                          text={"Comment"}
                          icon={"comment-edit-outline"}
                          compont={2}
                          />
                          <ButtonBox
                          handler={navigateHandler}
                          text={"Report"}
                          icon={"alert-octagon"}
                          compont={2}
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
                      </View >
                      <View style={styles.sectionContainer}>

                      <Text style={styles.sectionTitle}>PLUGS</Text>
                      <Text style={styles.sectionContent}>{plugs}</Text>
                      <Text style={styles.sectionTitle}>Available Time</Text>
                      <Text style={styles.sectionContent}>{avatime}</Text>
                      <Text style={styles.sectionTitle}>Description</Text>
                      <Text style={styles.sectionContent}>{desc}</Text>
                      <Text style={styles.sectionTitle}>Price</Text>
                      <Text style={styles.sectionContent}>€10 per hour</Text>   
                    </View>
                    <Text style={styles.sectionTitle}>View Commont </Text>
                    {comments?
                      (<View style={styles.commentContainer}>
                        <FlatList
                            scrollEnabled={false}
                            data={comments}
                            keyExtractor={item => item._id}
                            renderItem={({ item }) => <ListItem item={item} />}
                          />
                     
                        </View>):null}

                  </View>
              
         
              </BottomSheetScrollView> 
        </BottomSheet>
        
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

const styles = StyleSheet.create({
    container: {
  
        padding: 30,
        borderRadius: 10,
        alignItems: "center",
      },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#EEEEEE',
      marginBottom:verticalScale(30),
    },

    chargerImage: {
      marginBottom:verticalScale(30),
      width: '90%',
      height: 150,
      resizeMode: 'cover',
      alignSelf:'center',
    },
    chargerInfo: {
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    disbutton:{
      opacity: 0.5,
      backgroundColor: '#1450A3',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      width:horizontalScale(400)
    },
    button: {
        backgroundColor: '#1450A3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width:horizontalScale(400)
      },
      buttonText: {
        color: '#EFECEC',
        fontSize: 16,
        fontWeight: 'bold',
      },
  
    actionRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 16,
    },
   
    sectionContainer: {
      flex: 1,
      padding: 20, 
      backgroundColor: '#fff',
    },
    sectionTitle: {
      marginTop: 20, 
      marginBottom: verticalScale(10), 
      fontSize: 18, 
      fontWeight: 'bold', 
      color: '#333', 
    },
    sectionContent: {
      fontSize: 16, 
      color: '#666', 
      lineHeight: 24,
      
    },
    commentContainer: {
      marginTop: 10, 
      padding: 10, 
      backgroundColor: '#f2f2f2', 
      borderRadius: 5, 
    },
    commentText: {
      color: '#333', 
      fontSize: 14, 
      lineHeight: 20,
    },
    Textstyle: {
      fontWeight:'bold',
      fontStyle:'italic',
      fontSize:scaleFontSize(30),
    },

    defaultStyle:{
        padding: 35,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: "white",
      },

      formHeading : {
        fontSize: 25,
        fontWeight: "500",
        textAlign: "center",
        color: "black",
        padding: 5,
        borderRadius: 5,
    },

    name: {
      fontSize: 20,
      fontWeight: "500",
      marginTop: 10,
      color: "black",
    },
    modalView: {
      margin: 20,
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
      marginBottom: 15,
      textAlign: 'center',
    },
  });

  export default MainCard

