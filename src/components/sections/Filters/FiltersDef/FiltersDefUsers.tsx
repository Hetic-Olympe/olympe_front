"use client";

import { UserFilters } from "@/types/Filters";
import { FilterDef } from "../FiltersSection";
import { isConnectedItems, roleItems } from "@/types/SelectItems";

export interface UserFiltersDefProps {
  updateFilters: (key: string, value: string | null) => void;
  filters: UserFilters;
}

export const getUserFiltersDef = ({
  updateFilters,
  filters,
}: UserFiltersDefProps): FilterDef[] => [
  {
    type: "search",
    onSearch: (value) => updateFilters("fullname", value),
    initValue: filters.fullname || "",
    placeholder: "Search by name",
  },
  {
    type: "select",
    onSelect: (value) => updateFilters("roleId", value),
    title: "Roles",
    initValue: filters.roleId || "",
    label: "Select a role",
    items: roleItems,
  },
  {
    type: "select",
    onSelect: (value) => updateFilters("isConnected", value),
    title: "Is Conected",
    initValue: filters.isConnected || "",
    label: "Filter by connected",
    items: isConnectedItems,
  },
];
