import React, { FC } from "react";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";

interface ISelectItemProps {
  item: { id: any; name: string; value: string };
  onPress: (value: any) => void;
}
const SelectItem: FC<ISelectItemProps> = ({ item, onPress }) => {
  return (
    <Pressable
      onPress={() => onPress(item)}
      className="p-2 border-b border-gray-200"
    >
      <Text>{item.name}</Text>
    </Pressable>
  );
};

interface ISelectGroupProps {
  scaleAnim: Animated.Value;
  opacityAnim: Animated.Value;
  selections?: { id: any; name: string; value: string }[];
  onSelect: (item: { id: any; name: string; value: string }) => void;
  isLoading?: boolean;
}
const SelectGroup: FC<ISelectGroupProps> = ({
  scaleAnim,
  opacityAnim,
  selections,
  onSelect,
  isLoading,
}) => {
  return (
    <View>
      <Animated.View
        style={{
          transform: [{ scaleY: scaleAnim }],
          opacity: opacityAnim,
          transformOrigin: "top",
        }}
        className="bg-white min-h-[100] max-h-[250] mt-1 p-4 gap-4 rounded-b-xl"
      >
        <ScrollView>
          {isLoading ? (
            <View className="flex-1 justify-center items-center">
              <Text>Loading . . .</Text>
            </View>
          ) : selections?.length ? (
            selections?.map((item) => (
              <SelectItem key={item.id} onPress={onSelect} item={item} />
            ))
          ) : (
            <View>
              <Text> No data </Text>
            </View>
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default SelectGroup;
