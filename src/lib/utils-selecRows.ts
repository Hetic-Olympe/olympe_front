import { SelectedRows } from "@/types/SelectRows";

// 0 mettre dans un utils sorts
export function getIsAllPageRowsSelected(
  selectRows: SelectedRows,
  limit: number
): boolean {
  return selectRows.length === limit;
}

export function getIsSomePageRowsSelected(
  selectRows: SelectedRows,
  limit: number
): boolean {
  return selectRows.length < limit && selectRows.length > 0;
}

export function getRowIsSelected(
  selectRows: SelectedRows,
  rowId: string
): boolean {
  return selectRows.includes(rowId);
}
