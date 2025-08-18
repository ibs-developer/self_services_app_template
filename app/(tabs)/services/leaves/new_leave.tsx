import NavigationHeader from "@/components/reusable/navigationHeader";
import LeaveCreationForm from "@/components/services/leaves/leaveCreationForm";
import React from "react";
import { ScrollView, View } from "react-native";

const NewLeave = () => {
  return (
    <View className="flex-1">
      <NavigationHeader title="New Leave" />
      <ScrollView>
        <LeaveCreationForm />
      </ScrollView>
    </View>
  );
};

export default NewLeave;
