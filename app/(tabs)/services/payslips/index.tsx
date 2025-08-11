import NavigateHeder from "@/components/reusable/navigationHeader";
import React from "react";
import { Text, View } from "react-native";

const Payslips = () => {
  return (
    <View className="flex-1 bg-background">
      <NavigateHeder title="Payslips" />
      <Text>Payslips</Text>
    </View>
  );
};

export default Payslips;
