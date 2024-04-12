import React, { useState } from "react"
import {View, Text, Button, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image,ToastAndroid} from 'react-native'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth} from "./firebase/firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import { verticalScale,scaleFontSize } from "../../theme/Scalling";


export default function ForgotPassword () {
 
  
  

    const [email, setEmail] = useState<string>("");
    const handlePassword = async () => {
        await sendPasswordResetEmail(auth, email)
          .then(
                () => ToastAndroid.show("password reset email sent",ToastAndroid.LONG)
                )
          .catch((error) => console.log(error.message));
      };

      return (

        <View>

        <View style={styles.Container}>
            </View>

            <ScrollView
                style={styles.formContainer}
                showsVerticalScrollIndicator={false}
            >
                <View>
                <Text style={styles.text}>Forgot your password?</Text>
                </View>
                <View style={styles.emailContainer}>
                <Ionicons  
                    name="mail"
                    size={20}
                    color="gray"
                    style={{ marginLeft: 15 }}>
                </Ionicons>
                <TextInput
                    style={styles.input}
                    placeholder="Enter email address here"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={false}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                </View>
                <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handlePassword}
                >
                <View>
                    <Text style={styles.send}>Send reset link</Text>
                </View>
                </TouchableOpacity>
                <View style={styles.spam}>
                <Text style={{ fontSize: 12, color: "#000", fontWeight: "400" }}>
                    Check your email spam folder to find password reset link
                </Text>
                </View>
            </ScrollView>

                </View>
        
      );
    
}


const styles = StyleSheet.create({

    Container: {
      marginTop: 50,
    },
    emailContainer: {
      marginTop: 15,
      width: "100%",
      height: verticalScale(50),
      backgroundColor:'white',
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      flex: 1,
      color: 'grey',
      fontSize: scaleFontSize(16),
      paddingHorizontal: 7,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonContainer: {
      marginTop: "5%",
      width: "100%",
      height: verticalScale(50),
      backgroundColor: 'blue',
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      marginBottom: verticalScale(10),
    },
    button: {
      color: 'white',
      fontSize: scaleFontSize(18),
    },
    send: {
      color: 'white',
      fontSize: scaleFontSize(18),
    },
    spam: {
      marginTop: 3,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: verticalScale(10),
    },
    text: {
      fontSize: scaleFontSize(17),
      fontWeight: "bold",
    },
    formContainer: {
      width: "100%",
    },
  });

