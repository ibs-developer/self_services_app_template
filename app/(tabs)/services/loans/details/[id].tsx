import NavigateHeder from "@/components/reusable/navigationHeader";
import React from "react";
import { Text, View } from "react-native";

// Main Component
const LoanDetails = () => {
  return (
    <View className="bg-background">
      <NavigateHeder title="Loan Details" />
      <Text>Loan details content goes here.</Text>
    </View>
  );
};

export default LoanDetails;
