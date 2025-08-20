import { Background, Header, screenHeight } from "@/components/passwordUtils";
import Button from "@/components/reusable/button";
import Input from "@/components/reusable/input";
import NavigationHeader from "@/components/reusable/navigationHeader";
import getDeviceId from "@/utils/GetDeviceInfo";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const DeviceMismatch = () => {
  const [message, setMessage] = useState("");

  const handleSend = async (phoneNumber: string) => {
    const device_id = await getDeviceId();
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      `${message} and this is my new device id: ${device_id}`
    )}`;
    const webUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      `${message} and this is my new device id: ${device_id}`
    )}`;
    try {
      // First try to open the WhatsApp app directly
      await Linking.openURL(url);
    } catch (appError) {
      try {
        // If app fails, try the web version which will also open the app if installed
        await Linking.openURL(webUrl);
      } catch (webError) {
        Alert.alert(
          "WhatsApp Not Available",
          "Please install WhatsApp to share messages"
        );
        console.error("Error opening WhatsApp:", webError);
      }
    }
  };
  return (
    <KeyboardAvoidingView
      className="flex-1  bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ minHeight: screenHeight + 15 }}>
            <NavigationHeader />
            <View className="p-6 pt-0 flex-1 justify-between">
              <Header
                title="Device mismatch"
                subTitle="This is not your device. Please contact the administrator to register it or log in from your own device."
              />
              <Background imgPath={require("@/assets/images/alert.png")} />
              <View>
                <Input
                  label="Enter yor nots"
                  placeholder="Enter yor nots"
                  value={message}
                  onChangeText={(value) => setMessage(value)}
                  className="border-primary"
                  labelClassName="text-primary"
                />
              </View>

              <Button
                onPress={() => {
                  handleSend("+201090107373");
                }}
                title="Submit"
                className="bg-primary h-[70]"
                textClassName="text-white"
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default DeviceMismatch;
