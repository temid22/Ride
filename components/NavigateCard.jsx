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
import { setDestination } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from './NavFavourites';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-800`}>
      <Text style={tw`text-center py-5 text-xl text-white`}>
        Good Morning, TD
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
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-gray-100`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('RideOptionsCard')}
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

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 10,
    flex: 0,
    overflow: 'scroll',
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 5,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 5,
    paddingBottom: 0,
  },
});
