import { IFiltersProps } from "@/types/interfaces";
import React, { FC } from "react";
import { View } from "react-native";
import FilterButton from "./filterButton";

const FilterKeys: FC<IFiltersProps> = ({
  filters,
  activeFilter,
  onFilterChange,
  className,
}) => {
  return (
    <View className={`flex-row rounded-xl bg-gray-300 ${className}`}>
      {filters.map((filter) => (
        <FilterButton
          key={filter.key}
          active={activeFilter === filter.key}
          onPress={() => onFilterChange(filter.key)}
          title={filter.label}
        />
      ))}
    </View>
  );
};

export default FilterKeys;
