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
