"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Switch } from "@/components/ui/switch";
import ButtonTableHeader from "../ButtonTableHeader";
import FlagCell from "../Cells/FlagCell";
import { Country } from "@/types/Country";
import { Sort } from "@/types/Sort";
import { getIsSorted, toogleSort } from "@/lib/utils-sorts";

export interface CountryColumnsProps {
  onParticipateChanged: (value: Country) => void;
  onSortingChanged: (
    sortKey: string,
    sortOrder: false | "asc" | "desc"
  ) => void;
  sorts: Sort[];
}

export const getCountriesColumns = ({
  onParticipateChanged,
  onSortingChanged,
  sorts,
}: CountryColumnsProps): ColumnDef<Country>[] => [
  {
    accessorKey: "nicename",
    enableResizing: true,
    size: 380,
    header: () => {
      return (
        <ButtonTableHeader
          sortDirection={getIsSorted(sorts, "name")}
          onSortingChanged={() =>
            onSortingChanged("name", toogleSort(getIsSorted(sorts, "name")))
          }
        >
          Name
        </ButtonTableHeader>
      );
    },
    cell: ({ row }) => (
      <FlagCell iso={row.original.iso} label={row.original.nicename} />
    ),
  },
  {
    accessorKey: "iso",
    header: "Iso",
  },
  {
    accessorKey: "continent.name",
    header: () => {
      return (
        <ButtonTableHeader
          sortDirection={getIsSorted(sorts, "continent")}
          onSortingChanged={() =>
            onSortingChanged(
              "continent",
              toogleSort(getIsSorted(sorts, "continent"))
            )
          }
        >
          Continent
        </ButtonTableHeader>
      );
    },
  },
  {
    accessorKey: "isParticipate",
    header: () => {
      return (
        <div className="flex justify-center">
          <ButtonTableHeader
            sortDirection={getIsSorted(sorts, "isParticipate")}
            onSortingChanged={() =>
              onSortingChanged(
                "isParticipate",
                toogleSort(getIsSorted(sorts, "isParticipate"))
              )
            }
          >
            Is Participate
          </ButtonTableHeader>
        </div>
      );
    },
    cell: ({ row }) => {
      const country = row.original;
      return (
        <div className="flex justify-center">
          <Switch
            id="airplane-mode"
            onCheckedChange={() => onParticipateChanged(country)}
            checked={country.isParticipate}
          />
        </div>
      );
    },
  },
];
