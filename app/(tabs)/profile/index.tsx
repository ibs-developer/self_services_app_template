import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

// import { Briefcase, ChevronRight, LogOut, User } from "lucide-react-native";
import { useEmployeeDetails } from "@/hooks/api/use.Hr.Employee";
import { useLogout } from "@/hooks/api/useLogin";
import { FC, ReactNode } from "react";
// import { useColorScheme } from "~/lib/useColorScheme";
import { getEmployeeImage } from "@/utils/getEmployeeImage";
import {
  IconBackpack,
  IconChevronRight,
  IconLogout2,
  IconUser,
} from "@tabler/icons-react-native";

export default function ProfileScreen() {
  const { push } = useRouter();
  const { data: user } = useEmployeeDetails();
  const { doLogout } = useLogout();
  // const { isDarkColorScheme } = useColorScheme();

  const handleLogout = () => {
    doLogout();
  };

  return (
    <View className="flex-1 bg-background p-6">
      {/* Profile Header */}
      <View className="p-6 items-center">
        <View className="w-[150] aspect-square bg-blue-100 rounded-full overflow-hidden">
          <Image
            className="w-[100%] h-[100%] object-cover"
            source={{
              uri: getEmployeeImage(user?.avatar_128) || "",
            }}
          />
        </View>

        <Text className="text-xl font-bold text-black mt-4">
          {user?.name || "User Name"}
        </Text>
        <Text className="text-black">{user?.job_title || "Employee Role"}</Text>
      </View>

      <Pressable
        style={{}}
        onPress={() =>
          push(
            "/(tabs)/profile/edit-profile"
            //   {
            //   pathname: '/(app)/profile/personal-info',
            //   params: { edit: 1 },
            // }
          )
        }
        className="bg-primary p-5 rounded-xl"
      >
        <Text className="text-white text-center font-[600]">Edit Profile</Text>
      </Pressable>

      {/* Profile Stats */}
      {/* <View
        className={`flex-row justify-around p-4 bg-gray-100 dark:bg-gray-700 rounded-lg mt-4 `}
      >
        <StatBlock
          label="Monthly Hours"
          value={user?.hours_last_month_display || 'N/A'}
        />
        <StatBlock
          label="Remaining Leaves"
          value={user?.remaining_leaves || 'N/A'}
        />
      </View> */}

      {/* Profile Menu */}
      <View className="space-y-4 mt-6  gap-1">
        <MenuItem
          icon={<IconUser size={20} color="black" />}
          label="Personal Information"
          onPress={() => push("/profile/personal-info")}
        />
        <MenuItem
          icon={<IconBackpack size={20} color="black" />}
          label="Work Information"
          onPress={() => push("/profile/work-info")}
        />
        {/* <MenuItem
					icon={
						<Lock size={20} color={isDarkColorScheme ? "white" : "black"} />
					}
					label="Change Password"
					onPress={() => router.push("/profile/change-password")}
				/>
				<MenuItem
					icon={
						<Settings size={20} color={isDarkColorScheme ? "white" : "black"} />
					}
					label="Settings"
					onPress={() => router.push("/profile/settings")}
				/> */}
        <MenuItem
          icon={<IconLogout2 size={20} color="red" />}
          label="Logout"
          labelStyle="text-red-500"
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}

// Reusable Menu Item Component
interface IMenuItem {
  icon?: ReactNode;
  label?: string;
  onPress?: () => void;
  labelStyle?: string;
}
const MenuItem: FC<IMenuItem> = ({ icon, label, onPress, labelStyle }) => {
  // const { isDarkColorScheme } = useColorScheme();
  return (
    <Pressable
      className="flex-row items-center justify-between py-4"
      style={{
        borderBottomWidth: 0.5,
        borderBottomColor: "#e5e7eb",
      }}
      onPress={onPress}
    >
      <View className="flex-row items-center gap-4">
        <View
          style={{
            backgroundColor: labelStyle ? "#fee2e2" : "#f3f4f6",
            width: 40,
            aspectRatio: 1,
          }}
          className="bg-gray-200 items-center justify-center rounded-full"
        >
          {icon}
        </View>
        <Text
          className={`text-base font-medium ${labelStyle ? labelStyle : "text-black"}`}
        >
          {label}
        </Text>
      </View>
      <IconChevronRight size={20} strokeWidth={1.5} color="black" />
    </Pressable>
  );
};
