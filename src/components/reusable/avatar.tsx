import { IAvatar } from "@/types/interfaces";
import React, { FC } from "react";
import { Image, View } from "react-native";

const Avatar: FC<IAvatar> = ({ className, ...props }) => {
  return (
    <View
      className={`h-[100] aspect-square bg-blue-100 rounded-full overflow-hidden ${className}`}
    >
      <Image style={{ width: "100%", height: "100%" }} {...props} />
    </View>
  );
};

export default Avatar;
