import { ILocation } from '@/infraestructure/types';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FAB, Icon, MD3Colors } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Map = () => {
  const [lastKnowPosition, setLastKnowPosition] = useState<ILocation>({
    latitude: 37.78825,
    longitude: -122.4324
  })
  const mapRef = useRef<MapView>(null)

  useEffect(() => {
    const getInitialState = async() => { 
      try {
        const {coords} = await Location.getCurrentPositionAsync();
        setLastKnowPosition({
            latitude: coords.latitude,
            longitude: coords.longitude
          })
          animateCamera({latitude:coords.latitude,longitude:coords.longitude})
      } catch (error) {
        const newError = error as Error
        Alert.alert('Error', `Error inesperado ${newError.message}`);
      } 
    }
    getInitialState()
  }, [])

  const animateCamera = (coords:ILocation) => {
    mapRef.current?.animateToRegion({
      latitude:coords.latitude,
      longitude:coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,      
    })
  }

  const getCurrentPosition = async () => {
    try {
      const {coords} = await Location.getCurrentPositionAsync();
      animateCamera({latitude:coords.latitude,longitude:coords.longitude})
    } catch (error) {
      const newError = error as Error
      Alert.alert('Error', `Error inesperado ${newError.message}`);
    } 
  }
  
  return (
    <SafeAreaView style={styles.body}>
      <StatusBar
      animated
      networkActivityIndicatorVisible
      style='inverted'
      />

      <MapView 
      region={{
        latitude: lastKnowPosition.latitude,
        longitude: lastKnowPosition.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      ref={mapRef}
      provider={PROVIDER_GOOGLE}      
      showsUserLocation={false}
      followsUserLocation
      showsMyLocationButton      
      style={styles.map}> 
        <Marker
        anchor={{ x: 0.3, y: 0.3 }}
        coordinate={{
            latitude: lastKnowPosition.latitude,
            longitude: lastKnowPosition.longitude,
          }}          
        > 
          <Icon size={24} source={'map-marker-account'} color={MD3Colors.primary80} />
        </Marker>
      </MapView>

      <FAB 
        icon="crosshairs-gps"
        size='small'
        style={styles.fab}
        onPress={() => getCurrentPosition()} />
    </SafeAreaView>
  )
}

export default Map

const styles = StyleSheet.create({
  body:{
    flex:1
  },
  map:{
    width:'100%',
    height:'100%'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})