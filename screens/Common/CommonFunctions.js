import React, {Component} from "react";
import {Text,  StyleSheet, TouchableOpacity} from "react-native";


export function ButtonView(title,color){
	return(
		<TouchableOpacity style={[styles.buttonStyle,{backgroundColor:color}]} onPress={() => {this.onContinue(title)}}>
			<Text style={styles.buttonTitle}>{title}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
    
    buttonStyle: {
    	height: 50,
    	width: '100%',
    	alignSelf: 'center',
    	alignItems: 'center',
    	backgroundColor: '#FFFFFF',
    	borderRadius: 5,
    	justifyContent: 'center'
    },
    buttonTitle: {
    	alignSelf: 'center',
    	alignItems: 'center',
    	textAlign: 'center',
    	fontSize: 15,
    	color: '#000000'
    }
});

