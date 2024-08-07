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
import { BadgeRole } from "@/components/ui/Badges/BadgeRole/BadgeRole";
import { BadgeDot } from "@/components/ui/Badges/BadgeDot/BadgeDot";
import { Badge } from "@/components/ui/badge";
import ProfileCell from "../Cells/ProfileCell/ProfileCell";

export interface UserColumnsProps {
  onSelectAll: () => void;
  onSelectOne: (userId: User["id"]) => void;
  onEdit: (userId: User["id"]) => void;
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
    cell: ({ row }) => (
      <ProfileCell
        profileUrl={row.original.profileUrl}
        label={row.original.fullname}
      />
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role.label",
    header: () => {
      return (
        <div className="text-center">
          <ButtonTableHeader
            sortDirection={getIsSorted(sorts, "role")}
            onSortingChanged={() =>
              onSortingChanged("role", toogleSort(getIsSorted(sorts, "role")))
            }
          >
            Role
          </ButtonTableHeader>
        </div>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="text-center">
          <BadgeRole role={user.role.label}>{user.role.label}</BadgeRole>
        </div>
      );
    },
  },
  {
    accessorKey: "isConnected",
    header: () => {
      return (
        <div className="text-center">
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
        <div className="text-center">
          <BadgeDot isActive={user.isConnected}>
            {user.isConnected ? "Active" : "Inactive"}
          </BadgeDot>
        </div>
      );
    },
  },
  {
    accessorKey: "isArchived",
    header: () => {
      return (
        <div className="text-center">
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
        <div className="text-center">
          <Badge variant={user.isArchived ? "danger" : "success"}>
            {user.isArchived ? "Archived" : "In use"}
          </Badge>
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
          onEdit={() => onEdit(row.original.id)}
          onArchive={() => onArchive([row.original.id])}
        />
      );
    },
  },
];
