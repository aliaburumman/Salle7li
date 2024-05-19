import React, {useState, useEffect} from 'react';
import {Button, Text, View} from 'native-base';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, PermissionsAndroid, Dimensions} from 'react-native';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');
const MapScreen = ({navigation}: any) => {
  const [markerCoords, setMarkerCoords] = useState({
    latitude: 31.9454,
    longitude: 35.9284,
  });
  const [location, setLocation] = useState<GeolocationResponse>();
const {t}=useTranslation();
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            setLocation(position);
            setMarkerCoords(position.coords);
          },
          error => {
            console.log(error.code, error.message);
            setLocation(undefined);
          },
          {
            enableHighAccuracy: false,
            timeout: 500000,
            maximumAge: 1000000,
          },
        );
      }
    });
    console.log(location);
  };

  useEffect(() => {
    getLocation();
  }, []);
  useEffect(() => {
    console.log("changed")
  }, [markerCoords]);

  return (
    <View style={{ width: width, height: height }}>
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 31.9454,
          longitude: 35.9284,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        onPress={event => {
          const {latitude, longitude} = event.nativeEvent.coordinate;
          setMarkerCoords({latitude, longitude});
        }}>
        <Marker coordinate={markerCoords} />
      </MapView>
      {location && (
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              console.log("alo alo",markerCoords.longitude.toString(),markerCoords.latitude.toString())
              navigation.navigate('OrderService', {
                longitude: markerCoords.longitude,
                latitude: markerCoords.latitude,
              });
            }}>
            <Text>{t("common:procced")}</Text>
          </Button>
        </View>
      )}
      <View style={styles.infoContainer}>
        {location && (
          <>
            <Text color="blue.400">Latitude: {markerCoords.latitude}</Text>
            <Text color="red.400">Longitude: {markerCoords.longitude}</Text>
          </>
        )}
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    zIndex: 1000,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 45,
    alignSelf: 'flex-start',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default MapScreen;
