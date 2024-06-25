import { Item, Items } from "@/types/SelectItems";

export function getLabelFromValue(items: Items, value: Item["value"]): string {
  const item = items.find((item) => item.value === value);
  return item ? item.label : "";
}
