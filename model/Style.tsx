import { StyleSheet,Dimensions } from "react-native";
const {width,height}= Dimensions.get("window")
const CARD_HEIGHT=200;
const CARD_WIDTH = width*0.65;
export const styles = StyleSheet.create({
    container :{
        ...StyleSheet.absoluteFillObject,
        height: '100%',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        width: 150,
        height:70,
      },
      name: {
        fontSize: 16,
        marginBottom: 5,
      },
  
      userLocicon:{
        height:30,
        width:30,
      },
      scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
      },
      
      card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 2,
            height: -2
        },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
      },
      textContent: {
        flex: 2,
        padding: 10,
      },

      cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
      },

      cardDescription: {
        fontSize: 12,
        color: "#444",
      },

      textSign: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign:'center'

    },
    checkIn:{
        width: '50%',
        padding:5,
        margin:10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor:'blue'
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width:50,
        height:50,
      },
      
  });
  