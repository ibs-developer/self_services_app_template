import DetaileField from "@/components/reusable/deatileField";
import NavigationHeader from "@/components/reusable/navigationHeader";
import { useVisitDetail } from "@/hooks/api/crm/lead/visit";
import { getVisitStatusLabel } from "@/utils/visitState";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import React from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";

const VisitDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    data: visit,
    isLoading,
    isRefetching,
    refetch,
  } = useVisitDetail(id.toString());
  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading . . . .</Text>
      </View>
    );
  return (
    <View className="flex-1">
      <NavigationHeader title="Visit Details" />
      <ScrollView
        contentContainerClassName="p-6"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator={false}
      >
        <DetaileField
          title="Title"
          value={visit?.display_name}
          badge={{ name: getVisitStatusLabel(visit.state), state: visit.state }}
          section="visit"
        />
        <DetaileField title="Lead/Opportunity" value={visit?.lead_id?.[1]} />
        <DetaileField title="Customer" value={visit.partner_id?.[1]} />
        <DetaileField title="Salesperson" value={visit.salesperson_id?.[1]} />
        <DetaileField
          title="Planned Visit Date"
          value={moment(visit?.visit_date).format("DD/MM/y hh:mm a")}
        />
        <DetaileField
          title="Actual Arrival Time"
          value={moment(visit?.actual_arrival_time).format("DD/MM/y hh:mm a")}
        />
        <DetaileField
          title="Departure Time"
          value={moment(visit?.departure_time).format("DD/MM/y hh:mm a")}
        />
        <DetaileField
          title="Visit Duration (Hours)"
          value={visit?.duration.toString().slice(0, 4)}
        />

        <Text className="py-5"> Visit address details:- </Text>
        <DetaileField title="Location" value={visit?.visit_location} />
        <DetaileField title="GPS Latitude" value={visit?.latitude} />
        <DetaileField title="GPS Longitude" value={visit?.longitude} />
        <DetaileField
          title="GPS Accuracy (m)"
          value={visit?.location_accuracy}
        />
      </ScrollView>
    </View>
  );
};

export default VisitDetails;
