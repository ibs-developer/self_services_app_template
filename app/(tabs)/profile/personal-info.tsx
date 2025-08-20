// import { set } from 'lodash';
import { FC, useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import NavigationHeader from '@/components/reusable/navigationHeader';
import {
  useEmployeeDetails,
  useUpdateEmployeeProfile,
} from '@/hooks/api/hr/use.Hr.Employee';
import { checkValue, isValidEgyptianPhone } from '@/utils/helpFunctions';

interface IField {
  label: string;
  value: string;
  onChange: (value: string) => void;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  required?: boolean;
}
export const Field: FC<IField> = ({
  label,
  value,
  onChange,
  editable,
  keyboardType,
}) => {
  return (
    <View>
      <View
        style={{ borderBottomColor: '#d1d5db' }}
        className={`border-b p-2 mb-1 ${editable && 'bg-white'}`}
      >
        <Text className="text-gray-400"> {label} </Text>
        <TextInput
          keyboardType={keyboardType}
          onChangeText={(text) => onChange(text)}
          className="text-lg font-[600]"
          editable={editable ? editable : false}
          value={value}
        />
      </View>
    </View>
  );
};

interface IPersonal {
  edit?: boolean;
}
type TData = {
  name: string;
  private_email: string;
  private_phone: string;
  private_street: string;
};
const PersonalInfoScreen: FC<IPersonal> = ({ edit }) => {
  const { data: user, refetch } = useEmployeeDetails();
  const { doEmployeeProfileUpdate, isPending } = useUpdateEmployeeProfile(
    () => {
      // Refetch the user data after updating
      setSuccess(true);
      refetch();
      Toast.show({
        type: 'success',
        text1: 'Profile updated successfully',
      });
    },
  );
  const [success, setSuccess] = useState(false);

  const empty = !!edit ? '' : '---';

  const [name, setName] = useState(user?.name || empty);
  const [private_email, setPrivateEmail] = useState(
    user?.private_email || empty,
  );
  const [private_phone, setPrivatePhone] = useState(
    user?.private_phone || empty,
  );
  const [private_street, setPrivateStreet] = useState(
    user?.private_street || empty,
  );

  const isAnyEdit =
    name !== checkValue(user?.name) ||
    private_email !== checkValue(user?.private_email) ||
    private_phone !== checkValue(user?.private_phone) ||
    private_street !== checkValue(user?.private_street);

  useEffect(() => {
    isAnyEdit && setSuccess(false);
  }, [isAnyEdit]);
  const disableBtn = isPending || !isAnyEdit || success;

  const handleDone = (data: TData) => {
    if (!isValidEgyptianPhone(data.private_phone)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid phone number',
      });
      return;
    }
    if (!name) {
      Toast.show({
        type: 'error',
        text1: 'Name is requeued',
      });
      return;
    }
    doEmployeeProfileUpdate(data);
  };

  return (
    <View className="flex-1 bg-background">
      {!edit ? <NavigationHeader title="Personal Information" /> : null}
      <KeyboardAvoidingView
        className="flex-1 bg-background"
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 50}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="p-6">
              <Field
                editable={!!edit}
                onChange={(value) => setName(value)}
                label="Name"
                value={name}
              />
              <Field
                editable={!!edit}
                onChange={(value) => setPrivateEmail(value)}
                label="Email"
                value={private_email}
                required={!private_email}
                keyboardType="email-address"
              />
              <Field
                editable={!!edit}
                onChange={(value) => setPrivatePhone(value)}
                label="Phone"
                value={private_phone}
                keyboardType="phone-pad"
              />
              <Field
                editable={!!edit}
                onChange={(value) => setPrivateStreet(value)}
                label="Address"
                value={private_street}
              />
              {!!edit ? (
                <Pressable
                  disabled={disableBtn}
                  onPress={() =>
                    handleDone({
                      name,
                      private_email,
                      private_phone,
                      private_street,
                    })
                  }
                  className={` ${disableBtn ? 'bg-blue-200' : 'bg-primary'} mt-4 p-5 rounded-xl`}
                >
                  <Text className="text-center font-bold text-white">
                    {isPending ? 'Loading . . .' : 'Done'}
                  </Text>
                </Pressable>
              ) : null}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};
export default PersonalInfoScreen;
