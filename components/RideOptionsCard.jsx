import React from 'react';
import tw from 'twrnc';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTravelTimeInfomation } from '../slices/navSlice';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LightModeContext } from '../context/lightModeContext';
import { useEffect } from 'react';

const data = [
  {
    id: 'Uber-X-123',
    title: 'UberX',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn',
  },
  {
    id: 'Uber-XL-456',
    title: 'Uber XL',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8',
  },
  {
    id: 'Uber-LUX-789',
    title: 'Uber LUX',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf',
  },
];

// To Calculate in Naira

// {
//   new Intl.NumberFormat('en-gb', {
//     style: 'currency',
//     currency: 'NGR',
//   }).format(
//     JSON.parse(travelTimeInfo)?.duration.value *
//       SURGE_CHARGE_RATE *
//       multiplier *
//       1.051 //rate of pound to naira
//   );
// }

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInfo = useSelector(selectTravelTimeInfomation);
  const [isLightMode, setisLightMode] = useState(false);
  const { lightMode, dispatchh } = useContext(LightModeContext);

  // If we have SURGE Pricing, this goes up
  const SURGE_CHARGE_RATE = 1.5;

  useEffect(() => {
    const getTheme = async () => {
      const lightMode = await AsyncStorage.getItem('lightMode');
      setisLightMode(JSON.parse(lightMode));
    };
    getTheme();
  }, [dispatchh, lightMode]);

  return (
    <SafeAreaView
      style={tw`${isLightMode ? 'bg-gray-100' : 'bg-gray-800 '} h-full `}
    >
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('NavigateCard')}
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
        >
          <Icon
            name='chevron-left'
            type='font-awesome'
            color={isLightMode ? '#111827' : '#fff'}
          />
        </TouchableOpacity>
        <Text
          style={tw`text-center py-5 text-xl ${
            isLightMode ? 'text-gray-900' : 'text-white'
          }`}
        >
          Select a Ride -{JSON.parse(travelTimeInfo)?.distance?.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={({ id }) => (id ? id : '')}
        // you can destructure all the properties and still get the item
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-10 ${
              id === selected?.id
                ? `${isLightMode ? 'bg-gray-300' : 'bg-slate-700'}`
                : ''
            }`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
                // tintColor: '#fff',
              }}
              source={{
                uri: image,
              }}
            />
            <View style={tw`-ml-6`}>
              <Text
                style={tw`text-xl font-semibold ${
                  isLightMode ? 'text-gray-900' : 'text-white'
                }`}
              >
                {title}
              </Text>
              <Text style={tw`${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                {JSON.parse(travelTimeInfo)?.duration?.text} Travel Time...
              </Text>
            </View>
            <Text
              style={tw`text-xl ${
                isLightMode ? 'text-gray-900' : 'text-white'
              }`}
            >
              {new Intl.NumberFormat('en-gb', {
                style: 'currency',
                currency: 'GBP',
              }).format(
                (JSON.parse(travelTimeInfo)?.duration?.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          disabled={selected ? false : true}
          style={tw`${
            isLightMode ? 'bg-gray-300' : 'bg-gray-100'
          } py-3 m-3 rounded-full ${
            selected ? '' : `${isLightMode ? 'bg-gray-200' : 'bg-gray-400'}`
          }`}
        >
          <Text style={tw`text-center text-black text-xl font-semibold`}>
            {selected ? 'Choose ' : ''}

            {selected?.title || 'Choose a ride type'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
