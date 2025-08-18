import { dateToOdooTimeString } from "@/utils/calendarUtils";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
  IconAlarm,
  IconCalendar,
  IconChevronDown,
  IconChevronUp,
  IconEye,
  IconEyeOff,
  IconX,
} from "@tabler/icons-react-native";
import moment from "moment";
import React, { FC, useRef, useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { Animated, Pressable, Text, TextInput, View } from "react-native";
import {
  IControlledInput,
  IEncryptedPassword,
  IInput,
  IInputDate,
  IInputSelect,
  ITextArea,
} from "../../types/interfaces";
import SelectGroup from "./selectGroup";

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
              onPress={(e) => {
                e.stopPropagation();
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
export const TextArea = <T extends FieldValues>({
  control,
  name,
  rules,
  defaultValue,
  ...inputProps
}: ITextArea<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <Input
          {...inputProps}
          label="Description"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          error={error?.message}
        />
      )}
    />
  );
};

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
  const [time, setTime] = useState<Date | undefined>(undefined);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <Pressable className="flex-1" onPress={() => setOpenTime(true)}>
            <Input
              {...inputProps}
              editable={false}
              placeholder={moment(date).format("hh:mm A")}
              value={time ? moment(time).format("hh:mm A") : ""}
              error={error?.message}
              icon={<IconAlarm color="gray" strokeWidth={1.5} size={30} />}
            />
          </Pressable>
          {openTime && (
            <DateTimePicker
              value={time || date}
              mode="time"
              display="clock"
              onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                setOpenTime(false);
                console.log("Selected Date:", selectedDate);
                if (event.type === "set" && selectedDate) {
                  const formatted = dateToOdooTimeString(selectedDate);
                  console.log("Formatted Time:", formatted);
                  setTime(selectedDate);
                  onChange(formatted);
                }
              }}
            />
          )}
        </>
      )}
    />
  );
};
export const InputSelect = <T extends FieldValues>({
  control,
  name,
  rules,
  defaultValue,
  selections,
  string,
  ...inputProps
}: IInputSelect<T>) => {
  const [open, setOpen] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    if (open) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setOpen(false));
    } else {
      setOpen(true);
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };
  const [displayValue, setDisplayValue] = useState("");

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <Pressable onPress={toggle} className="w-[100%]">
            <Input
              {...inputProps}
              value={displayValue}
              error={error?.message}
              editable={false}
              placeholder="Select Leave Type"
              icon={
                open ? (
                  <IconChevronUp color="gray" strokeWidth={1.5} size={30} />
                ) : (
                  <IconChevronDown color="gray" strokeWidth={1.5} size={30} />
                )
              }
            />
          </Pressable>
          {open && (
            <SelectGroup
              onSelect={(item) => {
                onChange(string? item.value : item.id);
                setDisplayValue(item.name);
                toggle();
              }}
              selections={selections}
              scaleAnim={scaleAnim}
              opacityAnim={opacityAnim}
            />
          )}
        </View>
      )}
    />
  );
};
