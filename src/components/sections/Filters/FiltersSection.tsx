"use client";
import CloseIcon from "@/components/icons/CloseIcon";
import { FilterDropDown } from "@/components/ui/Inputs/Filters/FilterDropDown";
import { SearchInput } from "@/components/ui/Inputs/Search/SearchInput";
import { Button } from "@/components/ui/button";
import { Items } from "@/types/SelectItems";
import styles from "./filtersSection.module.scss";

export type FilterDef = SelectFilterDef | SearchFilterDef;

interface SelectFilterDef {
  type: "select";
  onSelect: (key: string | null) => void;
  title: string;
  initValue: string;
  label: string;
  items: Items;
}

interface SearchFilterDef {
  type: "search";
  onSearch: (key: string | null) => void;
  initValue: string;
  placeholder: string;
}

interface FiltersSectionProps {
  filters: FilterDef[];
  hasAdditionalFilter: boolean;
  clear?: boolean;
  clearFilters?: () => void;
}

// Étape 3: Type guards
function isSelectFilterDef(filter: FilterDef): filter is SelectFilterDef {
  return filter.type === "select";
}

function isSearchFilterDef(filter: FilterDef): filter is SearchFilterDef {
  return filter.type === "search";
}

export function FiltersSection({
  filters,
  hasAdditionalFilter,
  clear = false,
  clearFilters,
}: FiltersSectionProps) {
  return (
    <div className={styles.filter_section}>
      {filters.map((filter) => {
        if (isSelectFilterDef(filter)) {
          return (
            <FilterDropDown
              onSelect={filter.onSelect}
              title={filter.title}
              initValue={filter.initValue || ""}
              label={filter.label}
              items={filter.items}
            />
          );
        } else if (isSearchFilterDef(filter)) {
          return (
            <SearchInput
              onSearch={(value) => filter.onSearch(value)}
              initValue={filter.initValue || ""}
              placeholder={filter.placeholder}
            />
          );
        }
      })}
      {hasAdditionalFilter && clear && clearFilters && (
        <Button variant="ghost" onClick={clearFilters}>
          Reset
          <CloseIcon width="16" />
        </Button>
      )}
    </div>
  );
}
