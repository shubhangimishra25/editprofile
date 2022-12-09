import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Feather from 'react-native-vector-icons/Feather';

import PrototypeProfile from './PrototypeProfilePage';

import UpdateScreen from './UpdateScreen';
import { View } from 'react-native';


const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator 
    screenOptions={{ topBar: { backgroundColor: 'white' } }}>
       <RootStack.Screen name="PrototypeProfile" component={PrototypeProfile} options={{
      headerBackTitleVisible: false,
      headerTitle: '',
    }}/>
       <RootStack.Screen
        name="UpdateScreen"
         component={UpdateScreen} 
         options={{
      headerTitle: '',
     
    }}/>
    </RootStack.Navigator>
);

export default RootStackScreen;