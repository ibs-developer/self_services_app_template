import React, { FC } from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";
import { IButton } from "../../types/interfaces";

const Button: FC<IButton> = ({
  className,
  title,
  textClassName,
  isPressed,
  loaderSize = "small",
  disabledClassName,
  ...props
}) => {
  return (
    <Pressable
      {...props}
      disabled={isPressed}
      className={`items-center justify-center rounded-xl transition-all duration-200 ${isPressed && disabledClassName} ${className}`}
    >
      {isPressed ? (
        <ActivityIndicator className={textClassName} size={loaderSize} />
      ) : (
        <Text className={`text-xl font-bold ${textClassName}`}>{title}</Text>
      )}
    </Pressable>
  );
};

export default Button;
