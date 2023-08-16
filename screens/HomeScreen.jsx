import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import NavFavourites from '../components/NavFavourites';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import * as Location from 'expo-location';
import { Icon } from 'react-native-elements';
// import GlobalStyles from '../GlobalStyles';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [liveLocation, setLiveLocation] = useState();
  const [address, setaddress] = useState();

  // useEffect(() => {
  //   const getPermmissions = async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();

  //     if (status !== 'granted') {
  //       console.log('Please grant Permmission');
  //       return;
  //     }

  //     let currentLocation = await Location.getCurrentPositionAsync({});
  //     // console.log(currentLocation);
  //     setLiveLocation(currentLocation);
  //   };

  //   getPermmissions();
  // }, []);

  // convert address to lon and lat
  //   const geocode = async ()=> {
  //       const geocodedLocation = await Location.geocodeAsync(address)
  //       console.log("Geocoded Address")
  //       console.log(geocodedLocation)
  //   }
  // }

  // convert lon and lat to address
  // const reverseGeocode = async () => {
  //   const reverseGeocodedLocation = await Location.reverseGeocodeAsync({
  //     longitude:liveLocation?.coords.longitude,
  //     latitude:liveLocation?.coords.latitude
  //   });
  //   console.log('reverseGeocoded Address');
  //   console.log(reverseGeocodedLocation);
  // };

  const getPermmissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.log('Please grant Permmission');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    // console.log(currentLocation);
    // setLiveLocation(currentLocation);

    const reverseGeocodedLocation = await Location.reverseGeocodeAsync({
      longitude: currentLocation?.coords.longitude,
      latitude: currentLocation?.coords.latitude,
    });

    const description = reverseGeocodedLocation[0]?.city;

    const location = {
      lng: currentLocation?.coords?.longitude,
      lat: currentLocation?.coords?.latitude,
    };
    dispatch(
      setOrigin({
        location,
        description,
      })
    );
  };

  return (
    <SafeAreaView style={tw`bg-gray-900 h-full `}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
            tintColor: '#fff',
          }}
          source={{
            uri: 'https://links.papareact.com/gzs',
          }}
        />
      </View>
      <GooglePlacesAutocomplete
        styles={{
          container: {
            flex: 0,
            overflow: 'visible',
          },

          textInput: {
            fontSize: 18,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
        onPress={(data, details = null) => {
          dispatch(
            setOrigin({
              location: details?.geometry?.location,
              description: data?.description,
            })
          );
          dispatch(setDestination(null));
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
        returnKeyType={'search'}
        // minLength={2}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        placeholder='Where From...'
        nearbyPlacesAPI='GooglePlacesSearch'
        debounce={400}
      />
      <TouchableOpacity
        style={tw`flex-row items-center p-2`}
        onPress={getPermmissions}
      >
        <Icon
          style={tw`mr-4 rounded-full bg-gray-800 p-3`}
          name='location'
          type='ionicon'
          color='white'
          size={18}
        />
        <Text style={tw`text-white font-semibold`}>Use Current Location</Text>
      </TouchableOpacity>
      <NavOptions />
      <NavFavourites />
    </SafeAreaView>
  );
};

export default HomeScreen;
