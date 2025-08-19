import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { IBadge } from '@/types/interfaces';


const Badge: FC<IBadge> = ({ textClassName, className, name }) => {
  return (
    <View className={`border rounded-xl px-1 h-[25]  ${className}`}>
      <Text className={textClassName}> {name} </Text>
    </View>
  );
};

export default Badge;