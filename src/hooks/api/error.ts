import Toast from 'react-native-toast-message';

export default function onError(error: any) {
  // Log full Axios response if available
  if (error.response) {
    console.error('Error Response:', JSON.stringify(error.response, null, 2));
    console.error('Server Response:', {
      status: error.response.status,
      data: error.response.data,
      headers: error.response.headers,
    });
  } else if (error.request) {
    console.error('No response received from server:', error.request);
  } else {
    console.error('Error setting up request:', error.message);
  }
  // Handle error
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: error.response.data.message,
  });
}
