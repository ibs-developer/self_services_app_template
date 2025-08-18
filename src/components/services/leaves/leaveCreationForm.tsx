import Checkbox from "@/components/reusable/checkbox";
import DocumentUploadField from "@/components/reusable/documentUpload";
import Input, {
  InputDate,
  InputSelect,
  InputTime,
  TextArea,
} from "@/components/reusable/input";
import {
  useCreateHrLeave,
  useHrLeaveList,
  useHrLeaveTypes,
} from "@/hooks/api/use.Hr.Leave";
import { useLoginStore } from "@/hooks/loginStore";
import { THrLeave } from "@/types";
import { mapHrLeaveToCalendarEvent } from "@/utils/calendarUtils";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const LeaveCreationForm = () => {
  const { back } = useRouter();
  const queryClient = useQueryClient();
  const { user } = useLoginStore();
  const { data: timeOffTypes = [], isLoading } = useHrLeaveTypes({
    domain: `["|",["requires_allocation", "=", "no"],"&",["has_valid_allocation", "=", True],"|",["allows_negative", "=", True],"&",["virtual_remaining_leaves", ">", 0],["allows_negative", "=", False]]`,
  });
  const { data: leaves } = useHrLeaveList({
    domain: `[["employee_id", "=",${user?.id}]]`,
  });
  const { doHrLeaveCreate } = useCreateHrLeave(async () => {
    Toast.show({
      type: "success",
      text1: "Time off request created successfully",
    });
    await queryClient.invalidateQueries({
      queryKey: [
        "hrLeave",
        {
          domain: `[["employee_id", "=",${user?.id}]]`,
        },
      ],
    });
    back();
  });
  const handleSubmit = async (values: Partial<THrLeave>) => {
    doHrLeaveCreate(values);
  };

  const form = useForm();
  const {
    control,
    handleSubmit: submitForm,
    setValue,
    watch,
    formState,
  } = form;
  const { isSubmitting } = formState;

  const watchHolidayStatusId = watch("holiday_status_id");
  const start = watch("request_date_from");
  const end = watch("request_date_to");
  const isHalfDay = watch("request_unit_half");
  const isCustomHours = watch("request_unit_hours");
  const hourFrom = watch("request_hour_from");
  const hourTo = watch("request_hour_to");

  const [haveLeave, setHaveLeave] = useState(false);
  const [events, setEvents] = useState<
    ReturnType<typeof mapHrLeaveToCalendarEvent>
  >([]);

  useEffect(() => {
    if (leaves) {
      const mappedEvents = mapHrLeaveToCalendarEvent(leaves, timeOffTypes);
      setEvents(mappedEvents);
    }
  }, [leaves, timeOffTypes]);

  useEffect(() => {
    const selectedStart = start ? new Date(start) : null;
    const selectedEnd = end ? new Date(end) : null;
    let overlap = false;

    if (selectedStart && selectedEnd) {
      overlap = events.some((event) => {
        const eventStart = new Date(event.startDate + "Z");
        const eventEnd = new Date(event.endDate + "Z");
        eventStart.setHours(0, 0, 0, 0);
        eventEnd.setHours(0, 0, 0, 0);
        selectedStart.setHours(0, 0, 0, 0);
        selectedEnd.setHours(0, 0, 0, 0);
        return selectedStart <= eventEnd && selectedEnd >= eventStart;
      });
    }

    if (overlap) {
      Toast.show({
        type: "error",
        text1: "You already have a leave request in this date range",
      });
      setHaveLeave(true);
    } else {
      setHaveLeave(false);
    }
  }, [start, end, events]);

  useEffect(() => {
    if (isHalfDay) {
      setValue("request_unit_hours", false, { shouldTouch: true });
    }
  }, [isHalfDay, setValue]);

  useEffect(() => {
    if (isCustomHours) {
      setValue("request_unit_half", false, { shouldTouch: true });
    }
  }, [isCustomHours, setValue]);

  // ======================> بداية الكود المضاف لحل المشكلة <======================
  // هذا الكود يقوم بمزامنة تاريخ النهاية مع تاريخ البداية
  // عندما يختار المستخدم إجازة "نصف يوم" أو "ساعات مخصصة"
  // هذا يضمن أن تاريخ النهاية لن يكون أقدم من تاريخ البداية عند إرسال الطلب
  useEffect(() => {
    if ((isHalfDay || isCustomHours) && start) {
      setValue("request_date_to", start, { shouldValidate: true });
    }
  }, [isHalfDay, isCustomHours, start, setValue]);
  // =======================> نهاية الكود المضاف لحل المشكلة <=======================

  const onFinalSubmit = async (data: THrLeave) => {
    handleSubmit(data);
  };

  const handleDiscard = () => {
    back();
  };

  const duration = useMemo(() => {
    if (isHalfDay) {
      return "4 Hours";
    }
    if (isCustomHours) {
      if (hourFrom && hourTo) {
        const from = parseFloat(hourFrom);
        const to = parseFloat(hourTo);
        let diff = to - from;
        if (diff < 0) diff += 24;
        if (diff > 8) diff = 8;
        return `${diff} Hour${diff !== 1 ? "s" : ""}`;
      }
      return "-";
    }
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        const diffTime = endDate.getTime() - startDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays > 0 ? `${diffDays} day${diffDays > 1 ? "s" : ""}` : "";
      }
    }
    return ""; // قيمة افتراضية
  }, [isHalfDay, isCustomHours, start, end, hourFrom, hourTo]);

  const feildStyle = {
    className: "border-primary",
    labelClassName: "text-primary",
  };

  return (
    <View className="flex-1 p-6 gap-6">
      {/* Leave type */}
      <InputSelect
        {...feildStyle}
        control={control}
        name="holiday_status_id"
        label="Leave Type"
        selections={timeOffTypes.map((type) => ({
          id: type.id,
          name: type.name,
          value: type.id.toString(),
        }))}
      />
      {/* Date Range */}
      <View className="gap-6">
        {/* Date or Time Range */}
        {isCustomHours ? (
          <View className="gap-6">
            <InputDate
              {...feildStyle}
              control={control}
              name="request_date_from"
              label="Date"
            />
            <View className="flex-row flex-1 gap-3 justify-between">
              <InputTime
                {...feildStyle}
                control={control}
                name="request_hour_from"
                label="From"
              />
              <InputTime
                {...feildStyle}
                control={control}
                name="request_hour_to"
                label="To"
              />
            </View>
          </View>
        ) : isHalfDay ? (
          <View className="justify-between gap-6">
            <InputDate
              {...feildStyle}
              control={control}
              name="request_date_from"
              label="Date"
            />
            <InputSelect
              {...feildStyle}
              control={control}
              name="request_date_from_period"
              label="Period"
              string
              placeholder="Select leave type"
              selections={[
                { id: 1, name: "AM", value: "am" },
                { id: 2, name: "PM", value: "pm" },
              ]}
            />
          </View>
        ) : (
          <View className="justify-between gap-6">
            <InputDate
              {...feildStyle}
              control={control}
              name="request_date_from"
              label="Start Date"
            />
            <InputDate
              {...feildStyle}
              control={control}
              name="request_date_to"
              label="End Date"
            />
          </View>
        )}
      </View>

      {watchHolidayStatusId !== 1 &&
        watchHolidayStatusId !== 2 &&
        watchHolidayStatusId !== undefined && (
          <View className="flex-row gap-3 justify-between space-x-4">
            <Checkbox
              control={control}
              name="request_unit_half"
              label="Half Day"
            />
            <Checkbox
              control={control}
              name="request_unit_hours"
              label="Custom Hours"
            />
          </View>
        )}

      {/* Duration */}
      <Input
        {...feildStyle}
        label="Duration"
        value={duration}
        placeholder="0"
        editable={false}
      />

      {/* Description */}
      <TextArea
        control={control}
        name="name"
        label="Description"
        placeholder="Explain the reason for your time off request"
        className="border-primary h-[150]"
        labelClassName="text-primary"
      />

      {/* Attachments */}
      {watchHolidayStatusId == 2 && (
        <View className="border border-blue-400 rounded-xl mb-5 overflow-hidden px-4 py-2">
          <Text className="pb-1 native:pb-2 text-blue-400">Attachments</Text>
          <DocumentUploadField
            onChange={(ids) => setValue("supported_attachment_ids", ids)}
          />
        </View>
      )}

      {/* Submit Button */}
      <View className="justify-between gap-3">
        <Pressable
          style={{ backgroundColor: "#f87171" }}
          className="p-4 rounded-xl"
          onPress={handleDiscard}
          disabled={isSubmitting || isLoading}
        >
          <Text className="font-bold text-center text-white">Discard</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor:
              isSubmitting || isLoading || haveLeave ? "#bfdbfe" : "#60a5fa",
          }}
          className="p-4 rounded-xl bg-blue-200"
          onPress={submitForm(onFinalSubmit)}
          disabled={isSubmitting || isLoading || haveLeave}
        >
          {isSubmitting || isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="font-bold text-center text-white">
              Save & Close
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default LeaveCreationForm;