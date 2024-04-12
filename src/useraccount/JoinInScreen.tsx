import React from "react"
import {View, Text, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import EmailScreen from "./EmailScreen"

export const JoinInScreen = () => {
    const navigation = useNavigation();
    return (
        <View >
            <View >
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <ArrowLeftIcon size="20" color="black" />
                </TouchableOpacity>
            </View>
            <Text style={{alignItems: 'center',padding : 100, fontSize:20}}>Create your account</Text>
            <EmailScreen tt='Register'/>
        </View>
    )
}

export default JoinInScreen