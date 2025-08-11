import React from "react";
import { Text, View } from "react-native";
import NavigateHeder from "@/components/reusable/navigationHeader";

const NewLoan = () => {
  return (
    <View className="flex-1 bg-background">
      <NavigateHeder title="New Loan" />
      <Text> New Loan </Text>
    </View>
  );
};

export default NewLoan;
