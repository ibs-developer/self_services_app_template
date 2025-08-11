import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';

type LocationInfo = {
  latitude: number;
  longitude: number;
  city: string | null;
  country: string | null;
};

export default function useCurrentLocation() {
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') throw new Error('Permission denied');

        const {
          coords: { latitude, longitude },
          mocked,
        } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        if (mocked) {
          console.warn('Location is mocked. This may not be accurate.');
        }

        const [loc] = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        setLocationInfo({
          latitude,
          longitude,
          city: loc?.city || null,
          country: loc?.country || null,
        });
      } catch (e: any) {
        Toast.show({
          type: 'error',
          text1: 'Location Error',
          text2: e.message || 'Unable to fetch location',
        });
      }
    })();
  }, []);

  return locationInfo;
}
