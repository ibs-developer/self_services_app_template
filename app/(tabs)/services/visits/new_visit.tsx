import Input, {
  ControlledInput,
  InputSelect,
} from "@/components/reusable/input";
import NavigationHeader from "@/components/reusable/navigationHeader";
import { useCrmLeadList } from "@/hooks/api/crm/lead/lead";
import { useCreateVisit } from "@/hooks/api/crm/lead/visit";
import { useEmployeeDetails } from "@/hooks/api/hr/use.Hr.Employee";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";

const NewVisit = () => {
  const form = useForm();
  const { data: user } = useEmployeeDetails({
    fields: "name",
  });

  const { data: leads, isLoading: isLeadsLoading } = useCrmLeadList({
    fields: "name,partner_id",
  });

  const { doVisitCreate } = useCreateVisit(() => {
    Toast.show({
      type: "success",
      text1: "Visit created successfully",
    });
  });

  const { control, handleSubmit, watch, formState } = form;
  const inputStyle = {
    className: "border-primary",
    labelClassName: "text-primary",
  };
  const lead = leads?.find((lead) => lead.id === watch("lead_id"));

  return (
    <View className="flex-1">
      <NavigationHeader title="New Visit" />
      <ScrollView contentContainerClassName="gap-4 px-4 py-6">
        <InputSelect
          {...inputStyle}
          isLoading={isLeadsLoading}
          control={control}
          name="lead_id"
          label="Lead/Opportunity"
          placeholder="Select Lead/Opportunity . . ."
          selections={leads?.map((lead) => ({
            id: lead.id,
            name: lead.name,
            value: lead.id.toString(),
          }))}
        />
        <Input {...inputStyle} label="Salesperson" value={user?.name} />
        <Input
          {...inputStyle}
          label="Customer"
          placeholder="customer . . ."
          value={Array.isArray(lead?.partner_id) ? lead.partner_id?.[1] : ""}
          editable={false}
        />
        <ControlledInput
          {...inputStyle}
          control={control}
          name="visit_address"
          label="Visit Address"
          placeholder="Visit Address . . ."
        />
      </ScrollView>
    </View>
  );
};

export default NewVisit;
