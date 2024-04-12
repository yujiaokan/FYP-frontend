
import React from 'react';
import {Text, StyleSheet,TouchableOpacity } from 'react-native';
import { verticalScale } from '../../theme/Scalling';


function CustomBtn (props:{onpress:any,btnStyle:any,btnText: any}): JSX.Element{

    
    return(
        <TouchableOpacity
             onPress={props.onpress}
             style={{...styles.btnStyle, ...props.btnStyle}}
             >
                 <Text>{props.btnText}</Text>
             </TouchableOpacity>
    )
    
}


const styles = StyleSheet.create({
        btnStyle: {
            height: verticalScale(48),
            justifyContent:'center',
            alignItems:"center",
            backgroundColor: 'white',
            paddingHorizontal: 16,
            borderWidth:1
        }
});

export default CustomBtn