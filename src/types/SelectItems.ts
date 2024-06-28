export interface Item {
  value: string;
  label: string;
}
export type Items = Item[];

export const continentItems: Items = [
  {
    value: "1",
    label: "Africa",
  },
  {
    value: "2",
    label: "Antartica",
  },
  {
    value: "3",
    label: "Asia",
  },
  {
    value: "4",
    label: "Europe",
  },
  {
    value: "5",
    label: "North America",
  },
  {
    value: "6",
    label: "Australia",
  },
  {
    value: "7",
    label: "South America",
  },
];

export const isParticipateItems: Items = [
  {
    value: "true",
    label: "Participate",
  },
  {
    value: "false",
    label: "No participate",
  },
];

export const roleItems: Items = [
  {
    value: "1",
    label: "Admin",
  },
  {
    value: "2",
    label: "User",
  },
];
export const isConnectedItems: Items = [
  {
    value: "true",
    label: "Active",
  },
  {
    value: "false",
    label: "Inactive",
  },
];
