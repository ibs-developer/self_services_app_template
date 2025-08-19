import { ICheckbox } from "@/types"; // افترض أن هذا هو مكان تعريف الواجهة
import { IconCheck } from "@tabler/icons-react-native"; // استيراد أيقونة علامة الصح
import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

// يمكنك إضافة label إلى الواجهة ICheckbox في ملف types.ts
// export interface ICheckbox<T extends FieldValues> extends IControlledInput<T> {
//   label: string;
// }

const Checkbox = <T extends FieldValues>({
  control,
  name,
  rules,
  defaultValue,
  label, // خاصية جديدة لعرض النص
}: ICheckbox<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue || false} // القيمة الافتراضية يجب أن تكون false
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <View className="flex-row items-center gap-x-2">
            {/* جعل المكون كله قابلاً للضغط */}
            <Pressable
              onPress={() => onChange(!value)} // تبديل القيمة عند الضغط
              className="flex-row items-center"
            >
              {/* هذا هو المربع الخاص بالـ Checkbox */}
              <View
                className={`w-6 h-6 border-2 rounded-md justify-center items-center ${
                  value ? "bg-blue-500 border-blue-500" : "border-gray-400"
                }`}
              >
                {/* عرض الأيقونة فقط إذا كانت القيمة true */}
                {value && <IconCheck size={18} color="white" strokeWidth={3} />}
              </View>

              {/* النص المجاور لمربع الاختيار */}
              <Text className="ml-3 text-base">{label}</Text>
            </Pressable>
          </View>
          {/* عرض رسالة الخطأ إذا وجدت */}
          {error && <Text className="text-red-400 mt-1">{error.message}</Text>}
        </View>
      )}
    />
  );
};

export default Checkbox;
