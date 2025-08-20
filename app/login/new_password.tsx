import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import {
  Background,
  Header,
  Button,
  screenHeight,
} from '@/components/passwordUtils';
import NavigationHeader from '@/components/reusable/navigationHeader';
import Input from '@/components/reusable/input';

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [re_password, setRe_password] = useState('');
  const [error, setError] = useState('');
  const handlePress = () => {
    if (newPassword.length < 6) {
      setError('Password must be more than 6 digits');
    } else if (newPassword !== re_password) {
      setError('Password does not match');
    }
  };
  return (
    <KeyboardAvoidingView
      className="flex-1  bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ minHeight: screenHeight }}>
            <NavigationHeader />
            <View className="px-6 pt-0 flex-1 justify-between">
              <Header
                title="Enter New Password"
                subTitle="Please enter your new password"
              />
              <Background
                imgPath={require('@/assets/images/new-password.png')}
              />
              <View className="gap-4">
                <Input
                  label="Enter New Password"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChangeText={(value) => {
                    setNewPassword(value);
                    if (error) setError('');
                  }}
                  className='border-primary'
                  labelClassName='text-primary'
                  // showError={!!newPassword}
                  // error={error}
                />
                <Input
                  // disable={!newPassword}
                  label="Re-Enter Password"
                  placeholder="Re-Enter Password"
                  value={re_password}
                  onChangeText={(value) => {
                    setRe_password(value);
                    if (error) setError('');
                  }}
                  className='border-primary'
                  labelClassName='text-primary'
                  // showError={!!re_password}
                  // error={error}
                />
              </View>
              <Button onPress={handlePress} text="Update Password" />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default NewPassword;