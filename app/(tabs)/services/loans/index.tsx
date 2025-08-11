import NavigationHeader from "@/components/reusable/navigationHeader";
import React from "react";
import { Text, View } from "react-native";

const Loans = () => {
  return (
    <View className="flex-1 bg-background">
      <NavigationHeader title="Loans" />
      <Text>Loans</Text>
    </View>
  );
};

export default Loans;
