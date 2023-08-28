import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { LightModeContext } from '../context/lightModeContext';
import { useContext } from 'react';

const data = [
  {
    id: '123',
    icon: 'home',
    location: 'Home',
    destination: 'Code Street, London, UK',
  },
  {
    id: '456',
    icon: 'briefcase',
    location: 'Work',
    destination: 'London Eye, London, UK',
  },
];

const NavFavorites = () => {
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
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-500`, { height: 0.3 }]} />
      )}
      renderItem={({ item: { icon, location, destination } }) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`}>
          <Icon
            style={tw`mr-4 rounded-full bg-gray-800 p-3`}
            name={icon}
            type='ionicon'
            color='white'
            size={20}
          />
          <View>
            <Text
              style={tw`${
                isLightMode ? 'text-gray-900' : 'text-white'
              } font-semibold text-lg`}
            >
              {location}
            </Text>
            <Text
              style={tw`${isLightMode ? 'text-gray-700' : 'text-neutral-300'}`}
            >
              {destination}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavorites;

const styles = StyleSheet.create({});
