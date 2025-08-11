import { IconEye, IconEyeOff } from "@tabler/icons-react-native";
import React, { FC, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { IEncryptedPassword, IInput } from "../../types/interfaces";

const Input: FC<IInput> = ({
  label,
  className,
  labelClassName,
  error,
  ...props
}) => {
  const secureTextEntry = props.secureTextEntry || false;
  const [isVisible, setIsVisible] = useState(secureTextEntry);
  return (
    <View>
      <View className={`border p-2 rounded-lg ${className}`}>
        <Text className={`font-[600] text-borderColor ${labelClassName}`}>
          {label}
        </Text>
        <View className="flex-row items-center justify-between mt-2">
          <TextInput
            {...props}
            secureTextEntry={isVisible}
            className="flex-1"
          />
          {secureTextEntry ? (
            <EncryptedPassword
              isVisible={isVisible}
              toggleVisibility={() => setIsVisible(!isVisible)}
            />
          ) : null}
        </View>
      </View>
      {error ? <Text className="text-red-400 my-1"> {error} </Text> : null}
    </View>
  );
};

export default Input;
const EncryptedPassword: FC<IEncryptedPassword> = ({
  isVisible,
  toggleVisibility,
}) => {
  return (
    <Pressable onPress={toggleVisibility} className="px-2">
      {isVisible ? <IconEye /> : <IconEyeOff />}
    </Pressable>
  );
};
