import React, { FC, useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import PersonalInfoScreen from './personal-info';
import WorkInfoScreen from './work-info';
import NavigationHeader from '@/components/reusable/navigationHeader';
interface IButton {
  title: string;
  active?: boolean;
  onPress?: () => void;
}

 export const Button: FC<IButton> = ({ title, active, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-1 p-5 ${active ? 'bg-blue-400 rounded-xl' : 'bg-transparent rounded-none'} transition-all duration-200`}
    >
      <Text
        className={`${active ? 'text-white' : 'text-black'} font-[600] text-center transition-all duration-200`}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const EditProfileScreen = () => {
  const [screen, setScreen] = useState<'personal' | 'work'>('personal');
  const personal = screen === 'personal';
  return (
    <View className="flex-1 bg-background">
      <NavigationHeader
        title={personal ? 'Personal Information' : 'Work Details'}
      />
      <View className="p-6">
        <View
          style={{ backgroundColor: '#e5e7eb' }}
          className="flex-row rounded-xl"
        >
          <Button
            active={personal}
            onPress={() => setScreen('personal')}
            title="Personal"
          />
          <Button
            active={screen === 'work'}
            onPress={() => setScreen('work')}
            title="Work"
          />
        </View>
      </View>
      {personal ? <PersonalInfoScreen edit /> : <WorkInfoScreen edit />}
    </View>
  );
};
export default EditProfileScreen;
