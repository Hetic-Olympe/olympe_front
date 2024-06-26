import { Sort } from "@/types/Sort";

// 0 mettre dans un utils sorts
export function getIsSorted(
  sortingList: Sort[],
  sortingKey: string
): false | "asc" | "desc" {
  for (const sort of sortingList) {
    if (sort.key === sortingKey) {
      return sort.order;
    }
  }
  return false;
}

export function toogleSort(
  order: false | "asc" | "desc"
): false | "asc" | "desc" {
  switch (order) {
    case false:
      return "asc";
    case "asc":
      return "desc";
    case "desc":
      return false;
    default:
      return false;
  }
}
