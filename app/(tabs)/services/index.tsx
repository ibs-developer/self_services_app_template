// import DateTimePicker from "@react-native-community/datetimepicker";
// import moment from "moment";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Text, View } from "react-native";
// import { Button } from "react-native-paper";

// const Services = () => {
//   const [openDate, setOpenDate] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const date = watch("birthDate")
//     ? new Date(watch("birthDate")?.nativeEvent?.timestamp)
//     : new Date();

//   console.log(date);
//   const formattedDate = moment(date).format("YYYY/MM/DD");
//   const formattedTime = moment(date).format("HH:mm:ss");
//   return (
//     <View className="flex-1 items-center justify-center p-4">
//       <Text>تاريخ الميلاد</Text>
//       <Button mode="outlined" onPress={() => setOpenDate(true)}>
//         اختر التاريخ
//       </Button>
//       {openDate && (
//         <DateTimePicker
//           style={{ width: "100%" }}
//           value={date}
//           mode="time"
//           display="clock"
//           onChange={(date) => {
//             setValue("birthDate", date);
//             setOpenDate(false);
//           }}
//         />
//       )}
//       <Text>Login</Text>
//       <Text>{formattedDate}</Text>
//       <Text>{formattedTime}</Text>
//     </View>
//   );
// };

// export default Services;
import ServiceTab from "@/components/services/serviceTab";
import { featuredIcons } from "@/constants/featuredIcons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";

const Services = () => {
  const { push } = useRouter();
  return (
    <View
      style={{
        height: "100%",
      }}
      className="bg-background"
    >
      <FlatList
        data={featuredIcons}
        numColumns={2}
        columnWrapperClassName="gap-4"
        contentContainerClassName="p-4 gap-4 justify-center items-center"
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ServiceTab
            label={item.label}
            icon={item.icon}
            onPress={() => push(item.route)}
            className={item.className}
            textClassName={item.textClassName}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Services;
