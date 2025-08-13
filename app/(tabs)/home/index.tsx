import CheckInCheckOut from "@/components/home/checkInCheckOut";
import Days from "@/components/home/days";
import TodayAttendance from "@/components/home/todayAttendance";
import UserInfo from "@/components/home/userInfo";
import {
  useCreateHrAttendance,
  useHrAttendanceList,
  useUpdateHrAttendance,
} from "@/hooks/api/use.Hr.attendance";
import { useEmployeeDetails } from "@/hooks/api/use.Hr.Employee";
import { useLoginStore } from "@/hooks/loginStore";
import { TDay } from "@/types/interfaces";
import { returnDate } from "@/utils/helpFunctions";
import { formatInTimeZone } from "date-fns-tz";
import * as Location from "expo-location";
import { getDistance } from "geolib";
import React, { useEffect, useState } from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  useAnimatedValue,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const Home = () => {
  const { user } = useLoginStore();
  const { data: employee } = useEmployeeDetails();
  const [day, setDay] = useState<TDay>({} as TDay);
  const [checkedIn, setCheckedIn] = useState(false);
  const [isInside, setIsInside] = useState<boolean | null>(false);
  const [show, setShow] = useState(true);

  const attendanceDay = returnDate(day.num);

  const {
    data: activeAttendance,
    refetch,
    isLoading,
  } = useHrAttendanceList({
    domain: `[["employee_id", "=",${user?.id}], ["check_out","=",False]]`,
    limit: 1,
  });
  const { doHrAttendanceCreate } = useCreateHrAttendance(() => {
    Toast.show({ type: "success", text1: "Checked in successfully" });
    refetch();
  });

  const { doAttendanceUpdate } = useUpdateHrAttendance(() => {
    Toast.show({ type: "success", text1: "Checked out successfully" });
    refetch();
  });

  // Check if user is checked in
  useEffect(() => {
    setCheckedIn(Boolean(activeAttendance?.[0]));
  }, [activeAttendance, checkedIn]);

  // check in and check out functions
  const checkIn = async (): Promise<boolean> => {
    if (!isInside) {
      Toast.show({ type: "error", text1: "You are not inside location" });
      return false;
    }

    const now = formatInTimeZone(new Date(), "UTC", "yyyy-MM-dd HH:mm:ss");
    try {
      doHrAttendanceCreate({ check_in: now });
      return true;
    } catch (e) {
      return false;
    }
  };
  const checkOut = async (): Promise<boolean> => {
    if (!isInside) {
      Toast.show({ type: "error", text1: "You are not inside location" });
      return false;
    }

    const now = formatInTimeZone(new Date(), "UTC", "yyyy-MM-dd HH:mm:ss");
    try {
      if (!activeAttendance?.[0]) {
        Toast.show({ type: "error", text1: "You are not checked in!" });
        return false;
      }

      doAttendanceUpdate({
        id: activeAttendance[0].id,
        check_out: now,
      });
      return true;
    } catch (e) {
      return false;
    }
  };

  // Handel check in and check out button visibility based on scroll
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = e.nativeEvent.contentOffset.y;
    if (scrollY > 110) {
      setShow(false);
    } else setShow(true);
  };
  const scale = useAnimatedValue(1);
  useEffect(() => {
    (() => {
      if (show) {
        Animated.timing(scale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(scale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    })();
  }, [show]);

  // Check if user is inside the work location radius
  const backendPoint = {
    // latitude: 30.9762326,
    // longitude: 30.8673332,
    // latitude: 30.07393,
    // longitude: 31.22436,
    latitude: employee?.employee_latitude,
    longitude: employee?.employee_longitude,
  };
  const checkIsInSide = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const currentCoords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const distance = getDistance(currentCoords, backendPoint);
    setIsInside(distance <= employee.work_location_radius);
  };
  useEffect(() => {
    if (employee) {
      if (employee?.is_location_restricted) {
        checkIsInSide();
      } else setIsInside(true);
    }
  }, [employee]);

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading . . . . </Text>
      </View>
    );

  return (
    <View className="flex-1 bg-backGround">
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={(e) => onScroll(e)}
      >
        <UserInfo />
        <Days setDay={setDay} day={day} />
        <TodayAttendance
          checkIn={checkedIn}
          attendanceDay={attendanceDay}
          day={day}
        />
      </ScrollView>
      <Animated.View
        style={{
          transform: [{ scale: scale }],
        }}
      >
        <CheckInCheckOut
          checkIn={checkIn}
          checkOut={checkOut}
          isCheckedIn={checkedIn}
        />
      </Animated.View>
    </View>
  );
};

export default Home;
