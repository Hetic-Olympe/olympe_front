"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Athlete } from "@/types/Athlete";
import { Sort } from "@/types/Sort";
import { ColumnDef } from "@tanstack/react-table";
import ProfilePictureCell from "../Cells/ProfilePictureCell"; // Assurez-vous d'avoir ce composant pour afficher les images
import DataTableRowActions from "../DataTableRowActions";

export interface AthleteColumnsProps {
  onSelectAll: () => void;
  onSelectOne: (athleteId: Athlete["id"]) => void;
  onEdit: (athlete: Athlete) => void;
  onDelete: (athlete: Athlete) => void;
  onSortingChanged: (
    sortKey: string,
    sortOrder: false | "asc" | "desc"
  ) => void;
  sorts: Sort[];
}

export const getAthletesColumns = ({
  onSelectAll,
  onSelectOne,
  onEdit,
  onDelete,
  onSortingChanged,
  sorts,
}: AthleteColumnsProps): ColumnDef<Athlete>[] => [
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
    accessorKey: "firstname",
    header: "First Name",
  },
  {
    accessorKey: "lastname",
    header: "Last Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "pictureProfile",
    header: "Profile Picture",
    cell: ({ row }) => (
      <ProfilePictureCell imageSrc={row.original.pictureProfile} />
    ),
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "sportField",
    header: "Sport",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];
