import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Text, StyleSheet, View, TextInput,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {launchImageLibrary} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import CustomButton from '../components/CustomButton';

const UpdateScreen = props => {
  const heading = props.route.params.heading;
  let [data, setData] = useState(null);
  let [image, setImage] = useState(null);
  let [userHeading, setUserHeading] = useState(null);

  const handleFirstNameChange = val => {
    setData({
      ...data,
      firstname: val,
    });
  };
  const handlePhotoChange = () => {
 let options={
  mediaType:'photo',
  quality:1,
  includeBase64:true,
 }
 launchImageLibrary(
  options,response=>{
    if(response.didCancel){
      alert('cancelled image selection')

    }
    else if(response.errorCode=='permission'){
      alert('permission denied')

    }
    else if(response.errorCode=='others'){
      alert('Error occured')

    }
   else if (!response.assets[0].base64){
      alert('please select another image')
    }
    else{    setImage(response.assets[0].base64)
    
      setData({...data,image:response.assets[0].base64})}

   
  }
  
 )
  };
  const handleLastNameChange = val => {
    setData({
      ...data,
      lastname: val,
    });
  };
  const handleEmailChange = val => {
    setData({
      ...data,
      email: val,
    });
  };
  const handlePhoneChange = val => {
    setData({
      ...data,
      phone: val,
    });
  };
  const handleDescriptionChange = val => {
    setData({
      ...data,
      description: val,
    });
  };

  useEffect(() => {

    switch (heading) {
      case 'name':
        setUserHeading("What's your name?");
        break;

      case 'email':
        setUserHeading("What's your email?");

        break;

      case 'phone':
        setUserHeading("What's your phone number?");

        break;

      case 'description':
        setUserHeading('What type of passenger are?');

        break;
      case 'photo':
        setUserHeading('Upload a photo of yourself:');

        break;
      default:
        setUserHeading('What type of passenger are?');
    }

    const fetchData = async () => {
      const profileData = JSON.parse(await AsyncStorage.getItem('profileData'));
      if (profileData) {
        setData(profileData);
        console.log(profileData.image,'tata')
        setImage(profileData.image)
      }
    };

    // call the function, make sure to catch any error
    fetchData().catch(console.error);
  }, []);
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => {
        return (
          <View style={{marginRight: 10}}>
          <Feather.Button
            name="arrow-left"
            size={25}
            color='black'
            backgroundColor='white'
          
            onPress={() => props.navigation.goBack()}
          />
        </View>
        
        )
      }
    })
  },[])


  const submitHandler = async () => {
    console.log(data, 'dataaaaa');
    await AsyncStorage.setItem('profileData', JSON.stringify(data));
    props.navigation.navigate('PrototypeProfile', {reloadPage: true});
  };
  const CustomComp = param => {
    switch (param) {
      case 'name':
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            <View style={styles.containerStyle}>
              <Text style={styles.labelStyle}>First Name</Text>
              <TextInput
                autoCorrect={false}
                value={data?.firstname}
                style={styles.inputStyle}

                onChangeText={val => handleFirstNameChange(val)}
              />
            </View>
            <View style={styles.containerStyle}>
              <Text style={styles.labelStyle}>Last Name</Text>
              <TextInput
                autoCorrect={false}
                //    placeholder="yiii"
                value={data?.lastname}
                style={styles.inputStyle}
                onChangeText={val => handleLastNameChange(val)}
              />
            </View>
          </View>
        );
        break;

      case 'email':
        return (
          <View style={{flexDirection: 'row'}}>
            <View style={styles.containerStyle}>
              <Text style={styles.labelStyle}>Your email address</Text>
              <TextInput
                autoCorrect={false}
                style={styles.inputStyle}

                onChangeText={val => handleEmailChange(val)}
                value={data?.email}
              />
            </View>
          </View>
        );

        break;

      case 'phone':
        return (
          <View style={{flexDirection: 'row'}}>
            <View style={styles.containerStyle}>
              <Text style={styles.labelStyle}>Your phone number</Text>
              <TextInput
                autoCorrect={false}
                style={styles.inputStyle}

                onChangeText={val => handlePhoneChange(val)}
                value={data?.phone}
              />
            </View>
          </View>
        );

        break;

      case 'description':
        return (
          <View style={{flexDirection: 'row'}}>
            <View style={styles.containerStyle}>
              <Text style={styles.labelStyle}>
                Write a little bit about yourself. Do you like chatting? Are you
                a smoker? Do you bring pets with you? Etc.
              </Text>
              <TextInput
                autoCorrect={false}
                style={styles.inputStyle}

                onChangeText={val => handleDescriptionChange(val)}
                value={data?.description}
              />
            </View>
          </View>
        );

        break;

      case 'photo':
        return(  <Pressable style={{height:'80%'}} onPress={()=>handlePhotoChange()}>
          <Image
              source={{uri:'data:mage/png;base64,'+image}}
              resizeMode='cover'
              style= {{flex:1 , width: undefined, height: undefined}}  
          />
      </Pressable>)

      default:
        return (
          <View style={{flexDirection: 'row'}}>
            <View style={styles.containerStyle}>
              <Text style={styles.labelStyle}>Your email address</Text>
              <TextInput autoCorrect={false} />
            </View>
          </View>
        );
    }
  };

  return (
         <View style={styles.container}>
      <View style={styles.maincontainer}>
        <Text style={{marginBottom: 20, fontSize: 18, fontWeight: 'bold'}}>
          {userHeading}
        </Text>
        {CustomComp(heading)}
      </View>
      <CustomButton
        text="Update"
        onPress={() => submitHandler()}
        buttontheme="Success"></CustomButton>
    </View>
 
  );
};

export default UpdateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40,
  },
  maincontainer: {height: '60%'},
 
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  inputStyle: {
    fontSize: 18,
    fontWeight: 'bold'


  },
  labelStyle: {
    color: 'lightgrey',
    paddingBottom: 10,
    position: 'relative',
    color: '#bbb',
    fontWeight: 'bold'
  },
  containerStyle: {
    fontWeight: 'bold',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'lightgrey',
    flex: 1,
    padding: '5%',
  },
});
