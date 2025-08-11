import * as Application from 'expo-application';
import { Platform } from 'react-native';

const getDeviceId = async () => {
  if (Platform.OS === 'android') {
    return Application.getAndroidId(); // stays consistent unless factory reset
  } else if (Platform.OS === 'ios') {
    return await Application.getIosIdForVendorAsync(); // stable across app reinstalls
  }
};

export default getDeviceId;
