import React, { useEffect, useRef } from 'react';
import tw from 'twrnc';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInfomation,
} from '../slices/navSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GOOGLE_MAPS_APIKEY } from '@env';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;
    // Zoom and fit to markers
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      const URL = `https://maps.google.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&departure_time=now&key=${GOOGLE_MAPS_APIKEY}`;
      await fetch(URL, { method: 'GET', headers: {} })
        .then((res) => res.json())
        .then((data) => {
          dispatch(
            setTravelTimeInfomation(JSON.stringify(data?.rows[0]?.elements[0]))
          );
        })
        .catch((error) => console.log(error));
    };

    getTravelTime();
  }, [destination, GOOGLE_MAPS_APIKEY, origin]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType='mutedStandard'
      initialRegion={{
        latitude: origin?.location?.lat,
        longitude: origin?.location?.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeColor='#0f172a'
          strokeWidth={3}
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location?.lat,
            longitude: origin.location?.lng,
          }}
          title='Origin'
          description={origin.description}
          identifier='origin'
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location?.lat,
            longitude: destination.location?.lng,
          }}
          title='Destination'
          description={destination.description}
          identifier='destination'
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
