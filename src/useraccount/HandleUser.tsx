import React, { useEffect, useState } from 'react'
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigation from '../../navigation/AppNavigation';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import UserNavigation from '../../navigation/UserNavigation';
function HandleUser() {
    const Stack = createStackNavigator();
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

return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="userprofilenavi"options ={{headerShown: false}}  component={UserNavigation} />
        ) : (
          
          <Stack.Screen name="usenavi" options ={{headerShown: false}} component={AppNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default HandleUser