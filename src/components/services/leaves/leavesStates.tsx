import StateCard from "@/components/reusable/stateCard";
import { ILeaveStates } from "@/types";
import React, { FC } from "react";
import { View } from "react-native";

const LeavesStates: FC<ILeaveStates> = ({ leaves, employee }) => {
  const calculateStats = () => {
    const stats = {
      balance: employee?.allocation_remaining_display || "0",
      approved: 0,
      pending: 0,
      cancelled: 0,
    };
    if (leaves && leaves.length > 0) {
      stats.approved = leaves.filter(
        (leave) => leave.state === "validate" || leave.state === "validate1"
      ).length;
      stats.pending = leaves.filter(
        (leave) => leave.state === "confirm"
      ).length;
      stats.cancelled = leaves.filter(
        (leave) => leave.state === "refuse" || leave.state === "cancel"
      ).length;
    }

    return stats;
  };
  const allStates = [
    {
      id: 1,
      title: "Leave Approved",
      value: calculateStats().approved,
      bgColor: "bg-green-50 border-green-500",
      textColor: "text-green-500",
    },
    {
      id: 2,
      title: "Leave Balance",
      value: calculateStats().balance,
      bgColor: "bg-yellow-50 border-yellow-500",
      textColor: "text-yellow-500",
    },
    {
      id: 3,
      title: "Leave Cancelled",
      value: calculateStats().cancelled,
      bgColor: "bg-blue-50 border-blue-500",
      textColor: "text-blue-500",
    },
    {
      id: 4,
      title: "Leave Pending",
      value: calculateStats().pending,
      bgColor: "bg-red-50 border-red-500",
      textColor: "text-red-500",
    },
  ];
  return (
    <View className="flex-row flex-wrap justify-between gap-3">
      {allStates.map((state) => (
        <StateCard
          key={state.id}
          name={state.title}
          count={+state.value}
          className={state.bgColor}
          textClassName={state.textColor}
        />
      ))}
    </View>
  );
};

export default LeavesStates;
