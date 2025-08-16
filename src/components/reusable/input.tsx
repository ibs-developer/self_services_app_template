import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
  IconAlarm,
  IconCalendar,
  IconEye,
  IconEyeOff,
  IconX,
} from "@tabler/icons-react-native";
import moment from "moment";
import React, { FC, useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import {
  IControlledInput,
  IEncryptedPassword,
  IInput,
  IInputDate,
} from "../../types/interfaces";

const Input: FC<IInput & { onClear?: () => void }> = ({
  label,
  className,
  labelClassName,
  error,
  icon,
  value,
  onChangeText,
  onClear,
  ...props
}) => {
  const secureTextEntry = !!props.secureTextEntry;
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
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={isVisible}
            editable={props.editable}
            className="flex-1"
          />
          {secureTextEntry && (
            <EncryptedPassword
              isVisible={isVisible}
              toggleVisibility={() => setIsVisible(!isVisible)}
            />
          )}
          {value ? (
            <Pressable
              onPress={() => {
                if (onClear) {
                  onClear();
                } else if (onChangeText) {
                  onChangeText("");
                }
              }}
              className="px-1"
            >
              <IconX size={20} strokeWidth={1.5} color="gray" />
            </Pressable>
          ) : null}
          {icon ? <View className="px-2">{icon}</View> : null}
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
}) => (
  <Pressable onPress={toggleVisibility} className="px-2">
    {isVisible ? <IconEye /> : <IconEyeOff />}
  </Pressable>
);

export const ControlledInput = <T extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  ...inputProps
}: IControlledInput<T>) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    defaultValue={defaultValue}
    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
      <Input
        {...inputProps}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        error={error?.message}
        onClear={() => onChange("")}
      />
    )}
  />
);

export const InputDate = <T extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  date = new Date(),
  ...inputProps
}: IInputDate<T>) => {
  const [openDate, setOpenDate] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <Pressable className="w-[100%]" onPress={() => setOpenDate(true)}>
            <Input
              {...inputProps}
              editable={false}
              placeholder={moment(date).format("DD/MM/YYYY")}
              value={value ? moment(value).format("YYYY/MM/DD") : ""}
              error={error?.message}
              icon={<IconCalendar color="gray" strokeWidth={1.5} size={30} />}
              onClear={() => onChange("")}
            />
          </Pressable>
          {openDate && (
            <DateTimePicker
              value={value || date}
              mode="date"
              display="calendar"
              onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                setOpenDate(false);
                if (event.type === "set" && selectedDate) {
                  onChange(selectedDate);
                }
              }}
            />
          )}
        </>
      )}
    />
  );
};

export const InputTime = <T extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  date = new Date(),
  ...inputProps
}: IInputDate<T>) => {
  const [openTime, setOpenTime] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <Pressable className="w-[100%]" onPress={() => setOpenTime(true)}>
            <Input
              {...inputProps}
              editable={false}
              placeholder={moment(date).format("hh:mm A")}
              value={value ? moment(value).format("hh:mm A") : ""}
              error={error?.message}
              icon={<IconAlarm color="gray" strokeWidth={1.5} size={30} />}
              onClear={() => onChange("")}
            />
          </Pressable>
          {openTime && (
            <DateTimePicker
              value={value || date}
              mode="time"
              display="clock"
              onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                setOpenTime(false);
                if (event.type === "set" && selectedDate) {
                  onChange(selectedDate);
                }
              }}
            />
          )}
        </>
      )}
    />
  );
};
