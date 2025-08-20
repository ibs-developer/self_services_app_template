import {
  Background,
  Button,
  Header,
  screenHeight,
} from "@/components/passwordUtils";
import NavigationHeader from "@/components/reusable/navigationHeader";
import { checkIsSingleNumber } from "@/utils/helpFunctions";
import { useRouter } from "expo-router";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { colors } from "@/constants/colors";
const { primary } = colors;
interface IResend {
  setResend: Dispatch<SetStateAction<boolean>>;
  resend: boolean;
}
const VerifySquare = () => {
  return (
    <TextInput
      style={{
        height: 70,
        borderWidth: 0.5,
        borderColor: "gray",
      }}
      className="h-[60] aspect-square rounded-xl"
    />
  );
};

// Resend group
const Resend: FC<IResend> = ({ setResend, resend }) => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (resend) return;
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (seconds === 0) {
      if (!resend) {
        setResend(true);
      } else {
        setSeconds(30);
      }
    }
  }, [seconds, resend]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignSelf: "flex-end",
        paddingVertical: 15,
        gap: 5,
      }}
    >
      <Text className=" font-[600]">
        {`00:${checkIsSingleNumber(seconds)}`}
      </Text>
      <Pressable disabled={!resend} onPress={() => setResend(false)}>
        <Text
          style={{
            color: resend ? primary : "#bfdbfe",
          }}
          className={`font-[600]`}
        >
          Resend it
        </Text>
      </Pressable>
      {/* <Button/> */}
    </View>
  );
};

// Main Component
const OtpVerification = () => {
  const [resend, setResend] = useState(false);
  const { push } = useRouter();

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
                title="Enter Verification Code"
                subTitle="We have sent the code verification to your contact"
              />
              <Background imgPath={require("@/assets/images/verify.png")} />
              <View>
                <View className="flex-row justify-between">
                  <VerifySquare />
                  <VerifySquare />
                  <VerifySquare />
                  <VerifySquare />
                </View>
                <Resend setResend={setResend} resend={resend} />
              </View>

              <Button
                onPress={() => {
                  push("/login/new_password");
                }}
                text="Verify"
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default OtpVerification;
