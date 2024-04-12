import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export function StarRating ( props:{rating: any, reviewer: any}){

    let stars = [];
    let name='';

    // Loop 5 times
    for (var i = 1; i <= 5; i++) {
        // set the path to filled stars
        
        if(i<props.rating){
            name = 'star';
        }
        // If ratings is lower, set the path to unfilled stars
        
        if (i > props.rating) {
            
            if(props.rating==1.5){
                name = 'star-half-sharp';
            }
            else if(props.rating==2.5){
                name = 'star-half-sharp';
            }
            else if(props.rating==3.5){
                name = 'star-half-sharp';
            }
            else if(props.rating==4.5){
                name = 'star-half-sharp';
            }else
            {
                name = 'star-outline';
            }
            
        }    

        stars.push((<Ionicons name={name} size={15} style={styles.star} key={i} />));
       
    }

    return (
        <View style={ styles.container }>
            { stars }
            <Text style={styles.text}>({props.reviewer})</Text>
        </View>
    );
	
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	star: {
		color: '#FF8C00'
	},
	text: {
		fontSize: 12,
        marginLeft: 5,
        color: '#444',
	}
});