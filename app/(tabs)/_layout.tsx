import { colors } from "@/constants/colors";
import { useLoginStore } from "@/hooks/loginStore";
import {
  IconDeviceGamepad3,
  IconHome,
  IconUser,
} from "@tabler/icons-react-native";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
const { primary } = colors;

export default function TabLayout() {
  // Check if user is logged in
  const { user } = useLoginStore();
  const iconProps = {
    size: 30,
    strokeWidth: 1.5,
  };

  if (!user || !user?.access_token) {
    return <Redirect href="/login" />;
  }
  return (
    <>
      <StatusBar className="bg-backGround" barStyle="dark-content" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: primary,
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            backgroundColor: "#f8fafc",
            borderTopWidth: 0,
            height: 60,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconHome {...iconProps} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="services"
          options={{
            title: "Services",
            tabBarIcon: ({ color }) => (
              <IconDeviceGamepad3 {...iconProps} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <IconUser {...iconProps} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
