import {
  View,
  Image,
  ImageSourcePropType,
  Text,
  Pressable,
  TextInput,
  KeyboardTypeOptions,
  Dimensions,
} from 'react-native';
import React, { FC } from 'react';
const { height } = Dimensions.get('screen');

interface IHeader {
  title: string;
  subTitle: string;
}
interface IBackground {
  imgPath: ImageSourcePropType | undefined;
}
interface IButton {
  onPress: () => void;
  text: string;
}
interface IInput {
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  disable?: boolean;
  showError?: boolean;
}

export const screenHeight = height - 60;


export const Header: FC<IHeader> = ({ title, subTitle }) => {
  return (
    <View className="gap-2">
      <Text className="font-bold text-3xl">{title}</Text>
      <Text className="text-gray-400">{subTitle}</Text>
    </View>
  );
};

export const Background: FC<IBackground> = ({ imgPath }) => {
  return (
    <View className="w-[100%] aspect-square">
      <Image
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
        source={imgPath}
      />
    </View>
  );
};

export const Container = () => {
  return <></>;
};

export const Button: FC<IButton> = ({ onPress, text }) => {
  return (
    <Pressable onPress={onPress} className="p-6 bg-blue-400 my-6 rounded-xl">
      <Text className="text-center font-[600] text-white">{text}</Text>
    </Pressable>
  );
};


export const Input: FC<IInput> = ({
  value,
  onChange,
  error,
  label,
  placeholder,
  keyboardType,
  disable,
  showError,
}) => {

  return (
    <>
      <View className="border border-blue-400 rounded-xl p-2 px-4">
        <Text className="text-blue-400 font-[600]">{label}</Text>
        <View className="flex-row items-center">
          <TextInput
            editable={disable ? false : true}
            className="flex-1"
            placeholder={placeholder}
            keyboardType={keyboardType}
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
           
          />
        </View>
      </View>
      {error && showError && (
        <Text className="text-red-500 text-xs mt-1"> {error} </Text>
      )}
    </>
  );
};
