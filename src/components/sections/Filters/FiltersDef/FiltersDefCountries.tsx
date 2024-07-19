"use client";

import { CountryFilters } from "@/types/Filters";
import { FilterDef } from "../FiltersSection";
import { continentItems, isParticipateItems } from "@/types/SelectItems";

export interface CountryFiltersDefProps {
  updateFilters: (key: string, value: string | null) => void;
  filters: CountryFilters;
}

export const getCountryFiltersDef = ({
  updateFilters,
  filters,
}: CountryFiltersDefProps): FilterDef[] => [
  {
    type: "search",
    onSearch: (value) => updateFilters("name", value),
    initValue: filters.name || "",
    placeholder: "Search by name",
  },
  {
    type: "select",
    onSelect: (value) => updateFilters("continentId", value),
    title: "Continent",
    initValue: filters.continentId || "",
    label: "Select a continent",
    items: continentItems,
  },
  {
    type: "select",
    onSelect: (value) => updateFilters("isParticipate", value),
    title: "Is Participate",
    initValue: filters.isParticipate || "",
    label: "Filter by participation",
    items: isParticipateItems,
  },
];
