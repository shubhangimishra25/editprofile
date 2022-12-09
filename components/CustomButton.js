

import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

import { useTheme } from '@react-navigation/native';




const CustomButton = ({text, onPress}) => {
  const {colors} = useTheme();
//   console.log(colortheme)
  return (
<Pressable onPress={onPress}
style={styles.button}
>

    <View  >
    <Text style={[styles.textSign]} >{text}</Text>
    {/* <ActivityIndicator size="large" animating={activity} /> */}


    </View>


</Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 10,
        marginTop: 15,
        backgroundColor:'black',
        // 


      },
      textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
      },
});
