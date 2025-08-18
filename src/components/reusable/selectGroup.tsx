import React, { FC } from "react";
import { Animated, Pressable, Text, View } from "react-native";

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
}
const SelectGroup: FC<ISelectGroupProps> = ({
  scaleAnim,
  opacityAnim,
  selections,
  onSelect,
}) => {
  return (
    <View>
      <Animated.View
        style={{
          transform: [{ scaleY: scaleAnim }],
          opacity: opacityAnim,
          transformOrigin: "top",
        }}
        className="bg-white mt-1 p-4 gap-4 rounded-b-xl"
      >
        {selections?.map((item) => (
          <SelectItem key={item.id} onPress={onSelect} item={item} />
        ))}
      </Animated.View>
    </View>
  );
};

export default SelectGroup;
