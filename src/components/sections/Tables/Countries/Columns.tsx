"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "../DataTableRowActions";
import { Switch } from "@/components/ui/switch";
import ButtonTableHeader from "../ButtonTableHeader";
import { Checkbox } from "@/components/ui/checkbox";
import FlagCell from "../Cells/FlagCell";
import { Country } from "@/types/Country";
import { Sort } from "@/types/Sort";
import { getIsSorted, toogleSort } from "@/lib/utils-sorts";

export interface CountryColumnsProps {
  onSelectAll: () => void;
  onSelectOne: (countryId: Country["id"]) => void;
  onEdit: (value: Country) => void;
  onDelete: (value: Country) => void;
  onParticipateChanged: (value: Country) => void;
  onSortingChanged: (
    sortKey: string,
    sortOrder: false | "asc" | "desc"
  ) => void;
  sorts: Sort[];
}

export const getCountriesColumns = ({
  onSelectAll,
  onSelectOne,
  onEdit,
  onDelete,
  onParticipateChanged,
  onSortingChanged,
  sorts,
}: CountryColumnsProps): ColumnDef<Country>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value), onSelectAll();
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value), onSelectOne(row.original.id);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
      );
    },
  },
];
