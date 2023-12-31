import React from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { selectOrigin } from '../slices/navSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LightModeContext } from '../context/lightModeContext';
import { useEffect } from 'react';

const data = [
  {
    id: '123',
    title: 'Get a ride',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen',
  },
  {
    id: '456',
    title: 'Order food',
    image: 'https://links.papareact.com/28w',
    screen: 'EatsScreen',
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  const [isLightMode, setisLightMode] = useState(false);
  const { lightMode, dispatchh } = useContext(LightModeContext);

  useEffect(() => {
    const getTheme = async () => {
      const lightMode = await AsyncStorage.getItem('lightMode');
      setisLightMode(JSON.parse(lightMode));
    };
    getTheme();
  }, [dispatchh, lightMode]);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw` ${
            isLightMode ? 'bg-gray-400 ' : 'bg-gray-700'
          } p-2 pl-6 pb-8 pt-4 m-4.5 w-40 h-60 rounded `}
          disabled={origin ? false : true}
        >
          <View style={tw`${origin ? 'opacity-100' : 'opacity-50'}`}>
            <Image
              style={{ width: 120, height: 120, resizeMode: 'contain' }}
              source={{ uri: item.image }}
            />
            <Text style={tw`text-white mt-2 font-semibold text-lg`}>
              {item.title}
            </Text>
            <Icon
              style={tw`p-2 w-10 rounded mt-4 bg-gray-900`}
              name='arrowright'
              color='white'
              type='antdesign'
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
