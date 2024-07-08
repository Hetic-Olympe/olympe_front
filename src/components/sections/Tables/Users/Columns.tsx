"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "../DataTableRowActions";
import ButtonTableHeader from "../ButtonTableHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { Sort } from "@/types/Sort";
import { getIsSorted, toogleSort } from "@/lib/utils-sorts";
import { User } from "@/types/User";
import {
  getIsAllPageRowsSelected,
  getIsSomePageRowsSelected,
  getRowIsSelected,
} from "@/lib/utils-selecRows";
import { SelectedRows } from "@/types/SelectRows";

export interface UserColumnsProps {
  onSelectAll: () => void;
  onSelectOne: (userId: User["id"]) => void;
  onEdit: (value: User) => void;
  onArchive: (userId: User["id"][]) => void;
  onSortingChanged: (
    sortKey: string,
    sortOrder: false | "asc" | "desc"
  ) => void;
  selectedRows: SelectedRows;
  sorts: Sort[];
  limit: number;
}

export const getUsersColumns = ({
  onSelectAll,
  onSelectOne,
  onEdit,
  onArchive,
  onSortingChanged,
  selectedRows,
  sorts,
  limit,
}: UserColumnsProps): ColumnDef<User>[] => [
  {
    id: "select",
    header: () => (
      <Checkbox
        checked={
          getIsAllPageRowsSelected(selectedRows, limit) ||
          (getIsSomePageRowsSelected(selectedRows, limit) && "indeterminate")
        }
        onCheckedChange={onSelectAll}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={getRowIsSelected(selectedRows, row.original.id)}
        onCheckedChange={() => onSelectOne(row.original.id)}
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
    accessorKey: "isArchived",
    header: () => {
      return (
        <div className="flex justify-center">
          <ButtonTableHeader
            sortDirection={getIsSorted(sorts, "isArchived")}
            onSortingChanged={() =>
              onSortingChanged(
                "isArchived",
                toogleSort(getIsSorted(sorts, "isArchived"))
              )
            }
          >
            Is Archived
          </ButtonTableHeader>
        </div>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex justify-center">
          {user.isArchived ? "Archived" : "Not Archived"}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DataTableRowActions
          row={row}
          onEdit={onEdit}
          onArchive={() => onArchive([row.original.id])}
        />
      );
    },
  },
];
