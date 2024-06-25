import { useState } from "react";
import styles from "./table.module.scss";
import HeaderTable from "./HeaderTable";
import RowTable from "./RowTable";

interface TableProps {
  categoryName: string[];
  items: { id: number; name: string; email: string; status: string; role: string, total: number }[];
  deleteUser: (id: number) => void;
}

export default function Table({ categoryName, items, deleteUser }: TableProps) {
    const [sortedColumn, setSortedColumn] = useState<keyof typeof items[0] | null>(null);
    const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isNumeric = (value: any) => {
        return !isNaN(parseFloat(value)) && isFinite(value);
    };
    
    const handleSort = (category: string) => {
        const key = category.toLowerCase() as keyof typeof items[0];
        if (sortedColumn === key) {
            setSortDirection(prevDirection => prevDirection === 'ascending' ? 'descending' : 'ascending');
        } else {
            setSortedColumn(key);
            setSortDirection('ascending');
        }
    };

    const sortedItems = [...items].sort((a, b) => {
        if (sortedColumn) {
            const aValue = a[sortedColumn];
            const bValue = b[sortedColumn];
            if (isNumeric(aValue) && isNumeric(bValue)) {
                return sortDirection === 'ascending' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
            } else if (typeof aValue === "string" && typeof bValue === "string") {
                return sortDirection === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
        }
        return 0;
      });

    const handleSelectAll = (selectAll: boolean) => {
        const selectedIds = selectAll ? items.map(item => item.id) : [];
        setSelectedRows(selectedIds);
    };

    const handleRowSelect = (id: number, isChecked: boolean) => {
        setSelectedRows(prevSelectedRows => {
            if (isChecked && !prevSelectedRows.includes(id)) {
                return [...prevSelectedRows, id];
            } else if (!isChecked && prevSelectedRows.includes(id)) {
                return prevSelectedRows.filter(selectedId => selectedId !== id);
            }
            return prevSelectedRows;
        });
    };

    return (
        <section className={styles.table__section}>
            <table>
                <thead>
                    <HeaderTable categories={categoryName} onSort={handleSort} onSelectAll={handleSelectAll}/>
                </thead>
                <tbody>
                    {sortedItems.map(item => (
                        <RowTable
                        key={item.id}
                        item={item}
                        deleteUser={deleteUser}
                        isSelected={selectedRows.includes(item.id)}
                        handleRowSelect={handleRowSelect}
                      />
                    ))}
                </tbody>
            </table>
        </section>
    );
}
