import Toast from "react-native-toast-message";

export default function onError(error: any) {
  // Log full Axios response if available
  const respons = JSON.stringify(error.response, null, 2)
  const errorData = error.response.data
  if (error.response) {
    console.error("Error Response:", respons);
    console.error("Server Response:", {
      status: error.response.status,
      data: error.response.data,
      headers: error.response.headers,
    });
  } else if (error.request) {
    console.error("No response received from server:", error.request);
  } else {
    console.error("Error setting up request:", error.message);
  }
  // Handle error
  Toast.show({
    type: "error",
    text1: errorData.error.message,
  });
}
