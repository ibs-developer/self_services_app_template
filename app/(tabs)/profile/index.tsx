import Button from "@/components/reusable/button";
import { useLogout } from "@/hooks/api/useLogin";
import React from "react";
import { View } from "react-native";

const Profile = () => {
  const { doLogout } = useLogout();
  return (
    <View>
      <Button
        onPress={doLogout}
        title="log out"
        className="h-[70] bg-red-400"
      />
    </View>
  );
};

export default Profile;
