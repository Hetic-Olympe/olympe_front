import { Button } from "@/components/ui/button";
import { Athlete } from "@/types/Athlete";
import { DeleteIcon, Edit2Icon } from "lucide-react";

export interface AthleteColumnsProps {
  onSelectAll: () => void;
  onSelectOne: (id: number) => void;
  onEdit: (athlete: Athlete) => void;
  onDelete: (athlete: Athlete) => void;
  onSortingChanged: (
    sortKey: string,
    sortOrder: false | "asc" | "desc"
  ) => void;
  sorts: Record<string, "asc" | "desc">;
}

export const getAthletesColumns = ({
  onSelectAll,
  onSelectOne,
  onEdit,
  onDelete,
  onSortingChanged,
  sorts,
}: AthleteColumnsProps) => [
  {
    id: "profile",
    header: "Profile",
    cell: ({ row }: { row: { original: Athlete } }) => (
      <div className="flex items-center">
        <img
          src={row.original.pictureProfile}
          alt="Profile"
          className="w-8 h-8 rounded-full mr-2"
        />
        <div>
          <div>
            {row.original.firstname} {row.original.lastname}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "age",
    header: "Age",
    enableSorting: true,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    enableSorting: true,
  },
  {
    accessorKey: "country.nicename",
    header: "Country",
    enableSorting: true,
  },
  {
    accessorKey: "sportField",
    header: "Sport",
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }: { row: { original: Athlete } }) => (
      <div className="flex justify-center">
        <Button onClick={() => onEdit(row.original)}>
          <Edit2Icon />
        </Button>
        <Button variant="destructive" onClick={() => onDelete(row.original)}>
          <DeleteIcon />
        </Button>
      </div>
    ),
  },
];
