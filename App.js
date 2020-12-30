import * as React from 'react';
import {View} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from "./screens/DetailsScreen";
import Dashboard from "./screens/Dashboard";
import SplashScreen from "./screens/SplashScreen";
const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
    <Stack.Navigator initialRouteName="SplashScreen" >
        <Stack.Screen name="DetailsScreen" component={DetailsScreen}/>
        <Stack.Screen name="Dashboard" component={Dashboard}/>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}} />
    </Stack.Navigator>
    )
}

export default () => (
    <View style={{flex:1}}>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </View>
);