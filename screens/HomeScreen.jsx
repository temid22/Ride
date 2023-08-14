import React from 'react';
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import NavFavourites from '../components/NavFavourites';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';

// import GlobalStyles from '../GlobalStyles';

const HomeScreen = () => {
  const dispatch = useDispatch();
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
      <NavOptions />
      <NavFavourites />
    </SafeAreaView>
  );
};

export default HomeScreen;
