/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Provider } from "react-redux";
import  store  from "./src/redux/Store";
import {
  SafeAreaView,
  StyleSheet,


  
} from 'react-native';



import './AppInit';
import { MyTabs } from './src/bottomTabs/Tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


function App(): JSX.Element {

  

  return (
    
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>   
    <SafeAreaView style={styles.root}>
        <MyTabs></MyTabs>
    </SafeAreaView>
    </Provider>
    </GestureHandlerRootView>
    
  );
}

const styles = StyleSheet.create({
  

  root :{
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
