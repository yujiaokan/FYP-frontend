import { StyleSheet, Platform, StatusBar } from "react-native";
import { TextInputProps } from "react-native-paper";
import { horizontalScale, verticalScale } from "./Scalling";

export const colors = {
    color1: "#c70049",
    color1_light: "rgba(227,25,99,1)",
    color1_light2: "rgba(199,0,73,0.8)",
    color2: "white",
    color3: "rgb(45,45,45)",
    color4: "transparent",
    color5: "#f2f2f2",
    color6: "#f7f7f7",
  };
  
export const styles = StyleSheet.create({

    defaultStyle:{
        padding: 35,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: colors.color2,
    },
    inputStyling:{
        height: 50,
        backgroundColor: colors.color2,
        marginVertical: verticalScale(10),
        marginHorizontal: horizontalScale(20),
    },
    formHeading:{
        fontSize: 25,
        fontWeight: "500",
        textAlign: "center",
        backgroundColor: "#87A922",
        color: colors.color2,
        padding: 5,
        borderRadius: 5,
    }
});


export const inputOptions : TextInputProps = {
  style: styles.inputStyling,
  mode: "outlined",
  activeOutlineColor: colors.color1,
};

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.color3,
    borderRadius: 10,
    justifyContent: "center",
    elevation: 10,
  },



  btn: {
    backgroundColor: "green",
    margin: 20,
    padding: 6,
  },


});



