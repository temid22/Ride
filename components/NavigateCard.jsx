import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { selectDestination, setDestination } from '../slices/navSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from './NavFavourites';
import { Icon } from 'react-native-elements';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LightModeContext } from '../context/lightModeContext';

const NavigateCard = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const destination = useSelector(selectDestination);

  const [isLightMode, setisLightMode] = useState(false);
  const { lightMode, dispatchh } = useContext(LightModeContext);

  useEffect(() => {
    const getTheme = async () => {
      const lightMode = await AsyncStorage.getItem('lightMode');
      setisLightMode(JSON.parse(lightMode));
    };
    getTheme();
  }, [dispatchh, lightMode]);

  const toInputBoxStyles = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      padding: 5,
      flex: 0,
      overflow: 'scroll',
    },
    textInput: {
      backgroundColor: `${isLightMode ? '#d1d5db' : '#fff'}`,
      borderRadius: 5,
      fontSize: 18,
    },
    textInputContainer: {
      paddingHorizontal: 5,
      paddingBottom: 0,
    },
  });

  return (
    <SafeAreaView
      style={tw`flex-1 ${isLightMode ? 'bg-gray-100' : 'bg-gray-800'}`}
    >
      <Text
        style={tw`text-center py-5 text-xl font-semibold ${
          isLightMode ? 'text-gray-900' : 'text-white'
        }`}
      >
        Good Day, TD
      </Text>
      <View style={tw`border-t border-slate-300 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            styles={toInputBoxStyles}
            fetchDetails={true}
            enablePoweredByContainer={false}
            returnKeyType={'search'}
            minLength={5}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details?.geometry?.location,
                  description: data?.description,
                })
              );
              navigation.navigate('RideOptionsCard');
            }}
            placeholder='Where to?...'
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
          />
        </View>
        <NavFavorites />
      </View>
      <View
        style={tw` ${
          isLightMode ? 'bg-gray-100' : 'bg-white'
        } flex-row  justify-evenly py-2 mt-auto border-gray-100`}
      >
        <TouchableOpacity
          onPress={() =>
            destination ? navigation.navigate('RideOptionsCard') : null
          }
          style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full `}
        >
          <Icon name='car' type='font-awesome' color='white' size={16}></Icon>
          <Text style={tw`text-white text-center `}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full `}
        >
          <Icon
            name='fast-food-outline'
            type='ionicon'
            color='black'
            size={16}
          ></Icon>
          <Text style={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;
