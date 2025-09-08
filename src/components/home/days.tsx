import { TDay } from "@/types/interfaces";
import { checkIsSingleNumber } from "@/utils/helpFunctions";
import { addDays, format, startOfWeek,endOfMonth } from "date-fns";
import React, { Dispatch, FC, memo, SetStateAction, useEffect } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

interface IDay {
  dayNum: number;
  dayName: string;
  active?: boolean;
  onPress?: () => void;
}

interface IDays {
  setDay: Dispatch<SetStateAction<TDay>>;
  day: TDay;
}

const Day: FC<IDay> = ({ dayNum, dayName, active, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className={`h-[70] aspect-square ${active ? "bg-primary" : "bg-white"} transition-all duration-200 rounded-xl items-center justify-center`}
    >
      <Text
        className={`font-bold text-xl ${active ? "text-white" : "text-black"} transition-all duration-200`}
      >
        {checkIsSingleNumber(dayNum)}
      </Text>
      <Text
        className={`${active ? "text-white" : "text-gray-400"} transition-all duration-200`}
      >
        {dayName}
      </Text>
    </Pressable>
  );
};

// Main Component
const Days: FC<IDays> = ({ setDay, day }) => {
  const getWorkWeek = () => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 6 }); // Saturday as first day
    // Work days: Sunday (1) to Thursday (5)
    return Array.from({ length: 5 }).map((_, i) => {
      const date = addDays(weekStart, i + 1); // Skip Saturday
      return {
        num: date.getDate(),
        name: format(date, "EEE"),
        isToday:
          format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd"),
      };
    });
  };

  const data = getWorkWeek();
  const today = data.find((d) => d.isToday) || data[0];

  useEffect(() => {
    setDay(today);
  }, []);

  return (
    <View
      style={{
        padding: 15,
      }}
    >
      <FlatList
        contentContainerStyle={{
          gap: 15,
        }}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Day
            onPress={() => setDay(item)}
            dayNum={item.num}
            dayName={item.name}
            active={item.name === day.name}
          />
        )}
      />
    </View>
  );
};

export default memo(Days);
