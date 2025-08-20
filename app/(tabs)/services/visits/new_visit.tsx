import NavigationHeader from "@/components/reusable/navigationHeader";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

const NewVisit = () => {
  return (
    <View className="flex-1">
      <NavigationHeader title="New Visit" />
      <Text>NewVisit</Text>
    </View>
  );
};

export default NewVisit;
