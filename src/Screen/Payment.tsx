import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, Alert, StyleSheet} from 'react-native';
import{verticalScale,horizontalScale} from '../../theme/Scalling'
import ConfirmButton from './ConfirmButton';
import { CardForm, StripeProvider ,useConfirmPayment,} from '@stripe/stripe-react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../useraccount/firebase/firebase';

function Payment (route:any) {
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(false);
  const {confirmPayment, loading} = useConfirmPayment();
  const [useremail,setUserEmail] = useState<string>();
  const [userId,setUserId ]=useState<string>();
  const [chargerid,setChargerId] = useState(route.route.params.charger);
  const [cost,setCost] = useState(route.route.params.cost);
  const [selectedstartTime,setselectedstartTime] = useState(route.route.params.selectedStartTime);
  const [selectedendTime,setselectedendTime] = useState(route.route.params.selectedEndTime);
  useEffect(() => {
    auth().onAuthStateChanged(user => {
    if (user) {

     
      setUserEmail(user.email);
      setUserId(user.uid)
      console.log("send",user.email)
        
    }
  });

}, [useremail]);
  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(
      'http://192.168.0.11:5000/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: useremail,
          currency: 'eur',
          amount: cost*100,
        }),
      },
    );
    const {clientSecret} = await response.json();
    return clientSecret;
  };
  const sendMessage = async () => {
    try {
      await addDoc(collection(db, 'chargerHistory'), {
        userId:userId,
        chargerId :chargerid,
        createddate:new Date(),
        starttime:selectedstartTime,
        endtime: selectedendTime,
        cost:cost,
      });
      console.log('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
    }
    
    
  };
  const handlePayment = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();
    const {error, paymentIntent} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
    });
    if (error) {
      Alert.alert(
        'Error has occured with my payment',
        error.localizedMessage,
      );
    } else if (paymentIntent) {
      sendMessage();
      Alert.alert('Successful', 'The payment was confirmed successfully!');
      navigation.goBack();
    }
  };
  return (
    <SafeAreaView style={[style.backgroundWhite, style.flex]}>
      <ScrollView contentContainerStyle={style.paymentContainer}>
        <Text style={style.textstyle}>Making Payment</Text>
        <View><StripeProvider publishableKey={'pk_test_51P0sy6RoX7ecAIgGKP7jQKgOI1H9XlqEG2XkyPrF8zTLU4eSv2MkrbLg44m3urXrAg6kbwXSvVWSCXFr6AUPZwLc00KfMqfhlY'} >
            <CardForm style={style.cardForm} onFormComplete={() => {
                setIsReady(true);
              }}/>
            </StripeProvider>
        </View>
      </ScrollView>
      <View style={style.button}>
      <ConfirmButton title={'Confirm'} isDisabled={!isReady || loading} onPress={async () => await handlePayment()} />
      </View>
    </SafeAreaView>
  );
};

  const style = StyleSheet.create({
    backgroundWhite: {
      backgroundColor: '#FFFFFF',
    },
    flex: {
      flex: 1,
    },
    marginBottom24: {
      marginBottom: verticalScale(24),
    },
    paymentContainer: {
      marginHorizontal: horizontalScale(24),
    },
    button: {
      marginHorizontal: horizontalScale(24),
    },
    donationAmountDescription: {
      marginTop: verticalScale(12),
    },
    cardForm :{
      height: verticalScale(220),
      margin:verticalScale(12)
    },
    textstyle:{
      fontWeight:'bold',
      fontSize:20
    }
  });
export default Payment;