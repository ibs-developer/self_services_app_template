import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import NavigationHeader from "@/components/reusable/navigationHeader";
import {
  useEmployeeDetails,
  useUpdateEmployeeProfile,
} from "@/hooks/api/hr/use.Hr.Employee";
import { checkValue } from "@/utils/helpFunctions";
import { FC, useState } from "react";
import Toast from "react-native-toast-message";
import { Field } from "./personal-info";

interface IWork {
  edit?: boolean;
}

const WorkInfoScreen: FC<IWork> = ({ edit }) => {
  const { data: user, refetch } = useEmployeeDetails();
  const { doEmployeeProfileUpdate, isPending } = useUpdateEmployeeProfile(
    () => {
      // Refetch the user data after updating
      refetch();
      Toast.show({
        type: "success",
        text1: "Profile updated successfully",
      });
    }
  );

  const empty = !!edit ? "" : "---";
  console.log(user?.mobile_phone);

  const [job_title, setJobTitle] = useState(user?.job_title || empty);
  const [work_email, setWorkEmail] = useState(user?.work_email || empty);
  const [mobile_phone, setMobilePhone] = useState(user?.mobile_phone || empty);
  const [work_phone, setWorkPhone] = useState(user?.work_phone || empty);
  const [mobile_email, setMobileEmail] = useState(user?.mobile_email || empty);
  const [department_id, setDepartmentId] = useState(
    user?.department_id || empty
  );
  const [job_id, setJobId] = useState(user?.job_id || empty);
  const [work_location_id, setWorkLocationId] = useState(
    user?.work_location_id || empty
  );

  const isAnyEdit =
    job_title !== checkValue(user?.job_title) ||
    work_email !== checkValue(user?.work_email) ||
    mobile_phone !== checkValue(user?.mobile_phone) ||
    work_phone !== checkValue(user?.work_phone) ||
    mobile_email !== checkValue(user?.mobile_email) ||
    department_id !== checkValue(user?.department_id[1]) ||
    job_id !== checkValue(user?.job_id[1]) ||
    work_location_id !== checkValue(user?.work_location_id[1]);

  const disableBtn = isPending || !isAnyEdit;

  return (
    <View className="flex-1 bg-background">
      {!edit ? <NavigationHeader title="Work Details" /> : null}
      <KeyboardAvoidingView
        className="flex-1 bg-background"
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 250}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="p-6">
              <Field
                onChange={(value) => setJobTitle(value)}
                // editable={!!edit}
                label="Job Title"
                value={job_title}
              />
              <Field
                onChange={(value) => setWorkEmail(value)}
                editable={false}
                label="Work Email"
                value={work_email}
              />
              <Field
                onChange={(value) => setWorkPhone(value)}
                // editable={!!edit}
                label="Work Phone"
                value={work_phone}
              />
              <Field
                onChange={(value) => setMobileEmail(value)}
                // editable={!!edit}
                label="Mobile Email"
                value={mobile_email}
              />
              <Field
                onChange={(value) => setMobilePhone(value)}
                // editable={!!edit}
                label="Phone"
                value={mobile_phone}
              />
              <Field
                onChange={(value) => setDepartmentId(value)}
                // editable={!!edit}
                label="Department"
                value={department_id}
              />
              <Field
                onChange={(value) => setJobId(value)}
                // editable={!!edit}
                label="Job Position"
                value={job_id}
              />
              <Field
                onChange={(value) => setWorkLocationId(value)}
                // editable={!!edit}
                label="Work Location"
                value={work_location_id}
              />
              {!!edit ? (
                <Pressable
                  disabled={disableBtn}
                  onPress={() =>
                    doEmployeeProfileUpdate({
                      job_title,
                      work_phone,
                      mobile_email,
                      mobile_phone,
                      department_id,
                      job_id,
                      work_location_id,
                    })
                  }
                  className={` ${disableBtn ? "bg-blue-200" : "bg-primary"} mt-4 p-5 rounded-xl`}
                >
                  <Text className="text-center font-bold text-white">
                    {isPending ? "Loading . . ." : "Done"}
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
export default WorkInfoScreen;
