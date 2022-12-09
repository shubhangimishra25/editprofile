import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const PrototypeProfile = props => {
  const [data, setData] = React.useState({
    name: {firstname: '', lastname: ''},
    phone: '',
    email: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const profileData = JSON.parse(await AsyncStorage.getItem('profileData'));
      console.log('agayaaaaa', profileData);
      if (profileData) {
        setData(profileData);
      } else {
        await AsyncStorage.setItem(
          'profileData',
          JSON.stringify({
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            description: '',
            image: null,
          }),
        );
      }
    };

    // call the function, make sure to catch any error
    fetchData().catch(console.error);
  }, [props.route.params]);
  const {colors} = useTheme();

  

  return (
    <ScrollView style={styles.container}>
      <View style={{alignItems: 'center', width: '100%'}}>
        <Text style={{color: '#4d79ff', fontWeight: 'bold', fontSize: 25}}>
          Edit Profile
        </Text>

        <Pressable
          style={styles.avatarplaceholder}
          onPress={() =>
            props.navigation.navigate('UpdateScreen', {heading: 'photo'})
          }>
          <Image
            source={{uri: 'data:mage/png;base64,' + data.image}}
            style={styles.avatar}
          />
          <Ionicons
            style={{marginTop: -94, marginLeft: 120, backgroundColor: 'white'}}
            name="pencil-outline"
            size={20}
            color={'#4d79ff'}
          />
        </Pressable>
      </View>

      <Pressable
        style={styles.containerStyle}
        onPress={() =>
          props.navigation.navigate('UpdateScreen', {heading: 'name'})
        }>
        <Text style={styles.labelStyle}> Name</Text>
        <View style={styles.action}>
          <Text
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}>
            {data.firstname} {data.lastname}
          </Text>

          <Feather name="chevron-right" color="grey" size={20} />
        </View>
      </Pressable>

      <Pressable
        style={styles.containerStyle}
        onPress={() =>
          props.navigation.navigate('UpdateScreen', {heading: 'phone'})
        }>
        <Text style={styles.labelStyle}> Phone</Text>
        <View style={styles.action}>
          <Text
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}>
            {data.phone}
          </Text>

          <Feather name="chevron-right" color="grey" size={20} />
        </View>
      </Pressable>
      <Pressable
        style={styles.containerStyle}
        onPress={() =>
          props.navigation.navigate('UpdateScreen', {heading: 'email'})
        }>
        <Text style={styles.labelStyle}> Email</Text>
        <View style={styles.action}>
          <Text
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}>
            {data.email}
          </Text>

          <Feather name="chevron-right" color="grey" size={20} />
        </View>
      </Pressable>
      <Pressable
        style={styles.containerStyle}
        onPress={() =>
          props.navigation.navigate('UpdateScreen', {heading: 'description'})
        }>
        <Text style={styles.labelStyle}> Tell us about yourself</Text>
        <View style={styles.action}>
          <Text
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}>
            {data.description}
          </Text>

          <Feather name="chevron-right" color="grey" size={20} />
        </View>
      </Pressable>
    </ScrollView>
  );
};

export default PrototypeProfile;

const styles = StyleSheet.create({
  labelStyle: {
    color: 'lightgrey',
    paddingBottom: 5,
    // position: 'relative',
    color: '#bbb',
    fontWeight: 'bold'

  },
  containerStyle:{
    margin:5
  },
  container: {
    flex: 1,
    margin: 40,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: 'grey',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    color: '#05375a',
    fontSize: 14,
    position: 'relative',
    fontWeight: 'bold'

  },
  piccontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: '50%',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 48,
    marginBottom: 70,
    position: 'absolute',
  },
  avatarplaceholder: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginTop: 48,
    marginBottom: 48,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderColor: '#4d79ff',
    borderWidth: 10,
    flexDirection: 'row',
  },
});
