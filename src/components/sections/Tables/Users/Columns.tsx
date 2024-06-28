"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "../DataTableRowActions";
import ButtonTableHeader from "../ButtonTableHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { Sort } from "@/types/Sort";
import { getIsSorted, toogleSort } from "@/lib/utils-sorts";
import { User } from "@/types/User";

export interface UserColumnsProps {
  onSelectAll: () => void;
  onSelectOne: (userId: User["id"]) => void;
  onEdit: (value: User) => void;
  onDelete: (value: User) => void;
  onSortingChanged: (
    sortKey: string,
    sortOrder: false | "asc" | "desc"
  ) => void;
  sorts: Sort[];
}

export const getUsersColumns = ({
  onSelectAll,
  onSelectOne,
  onEdit,
  onDelete,
  onSortingChanged,
  sorts,
}: UserColumnsProps): ColumnDef<User>[] => [
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
    accessorKey: "fullname",
    enableResizing: true,
    size: 380,
    header: () => {
      return (
        <ButtonTableHeader
          sortDirection={getIsSorted(sorts, "fullname")}
          onSortingChanged={() =>
            onSortingChanged(
              "fullname",
              toogleSort(getIsSorted(sorts, "fullname"))
            )
          }
        >
          Name
        </ButtonTableHeader>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role.label",
    header: () => {
      return (
        <ButtonTableHeader
          sortDirection={getIsSorted(sorts, "role")}
          onSortingChanged={() =>
            onSortingChanged("role", toogleSort(getIsSorted(sorts, "role")))
          }
        >
          Role
        </ButtonTableHeader>
      );
    },
  },
  {
    accessorKey: "isConnected",
    header: () => {
      return (
        <div className="flex justify-center">
          <ButtonTableHeader
            sortDirection={getIsSorted(sorts, "isConnected")}
            onSortingChanged={() =>
              onSortingChanged(
                "isConnected",
                toogleSort(getIsSorted(sorts, "isConnected"))
              )
            }
          >
            Is Connected
          </ButtonTableHeader>
        </div>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex justify-center">
          {user.isConnected ? "Active" : "Inactive"}
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
