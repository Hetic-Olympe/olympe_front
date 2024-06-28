import { useCallback, useState } from "react";

export interface BasicEntity {
  id: string | number;
}

const useSelectRows = <T extends BasicEntity>(datas: T[]) => {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  const selectOne = useCallback(
    (entityId: T["id"]) => {
      if (selectedRows.includes(entityId)) {
        setSelectedRows((previousSelectedRow) => [
          ...previousSelectedRow.filter((id) => id !== entityId),
        ]);
      } else {
        setSelectedRows((previousSelectedRow) => [
          ...previousSelectedRow,
          entityId,
        ]);
      }
    },
    [selectedRows]
  );

  const selectAll = useCallback(() => {
    if (selectedRows.length === datas.length) {
      setSelectedRows([]);
    } else {
      const datasId = datas.map((data) => data.id);
      setSelectedRows([...datasId]);
    }
  }, [datas, selectedRows]);

  return { selectOne, selectAll };
};
export default useSelectRows;
