import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Chartbot from '../chartbot/Chartbot';
import {NavigationContainer} from '@react-navigation/native';
import Mintabnavigation from '../../navigation/MintabNavigation';
import HandleUser from '../useraccount/HandleUser';
import Routenavigation from '../../navigation/RouteNavigation';






const Tab = createMaterialBottomTabNavigator();

export function MyTabs() {
  return (
    <NavigationContainer  independent={true}>
        <Tab.Navigator 
        initialRouteName="HomeMaps"
        activeColor="#1450A3"
        inactiveColor="#1450A3"
        shifting= {true}
        barStyle={{ backgroundColor: 'white' }}
        
        >
        <Tab.Screen
            name="HomeMaps"
            component={Mintabnavigation}
            options={{
            tabBarAccessibilityLabel:'Home',
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="google-maps" color={color} size={26} />
            ),
            
            }}
        />
        <Tab.Screen
            name="Route"
            component={Routenavigation}
            options={{
            tabBarAccessibilityLabel:'route',
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="router" color={color} size={26} />
            ),
            
            }}
        />
        <Tab.Screen
            name="Chatbot"
            component={Chartbot}
            options={{
            tabBarAccessibilityLabel:'chatbot',
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="chat" color={color} size={26} />
            ),
            
            }}
        />
        <Tab.Screen
            name="Profile"
            component={HandleUser}
            options={{
            tabBarAccessibilityLabel:'profile',
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
            
            }}
        />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

