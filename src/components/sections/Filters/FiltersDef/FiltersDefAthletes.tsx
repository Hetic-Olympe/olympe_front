"use client";

import { SportFieldEnum } from "@/types/Athlete";
import { AthleteFilters } from "@/types/Filters";
import { continentItems } from "@/types/SelectItems";
import { FilterDef } from "../FiltersSection";

export interface AthleteFiltersDefProps {
  updateFilters: (key: string, value: string | null) => void;
  filters: AthleteFilters;
}

const sportItems = Object.entries(SportFieldEnum).map(([key, value]) => ({
  label: value,
  value: key,
}));

export const getAthleteFiltersDef = ({
  updateFilters,
  filters,
}: AthleteFiltersDefProps): FilterDef[] => [
  {
    type: "search",
    onSearch: (value) => updateFilters("name", value),
    initValue: filters.name || "",
    placeholder: "Search by name",
  },
  {
    type: "select",
    onSelect: (value) => updateFilters("countryId", value),
    title: "Countries",
    initValue: filters.countryId || "",
    label: "Select a country",
    items: continentItems,
  },
  {
    type: "select",
    onSelect: (value) => updateFilters("sportField", value),
    title: "Sports",
    initValue: filters.sportField || "",
    label: "Select a sport",
    items: sportItems,
  },
];
