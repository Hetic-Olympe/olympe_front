import { useState } from "react";
import styles from "./table.module.scss";
import { ArrowSortIcon } from "../../icons/icons"


interface HeaderTableProps {
	categories: string[];
	onSort: (category: string) => void;
	onSelectAll: (selectAll: boolean) => void;
}

export default function HeaderTable({ categories, onSort, onSelectAll }: HeaderTableProps) {
	const [sortConfig, setSortConfig] = useState<{ category: string | null, direction: 'ascending' | 'descending' }>({ category: null, direction: 'ascending' });

	const handleSort = (category: string) => {
		if (sortConfig.category === category) {
			setSortConfig(prevConfig => ({
				category: category,
				direction: prevConfig.direction === 'ascending' ? 'descending' : 'ascending'
			}));
		} else {
		setSortConfig({ category: category, direction: 'ascending' });
		}
		onSort(category);
	};

	const [selectAll, setSelectAll] = useState(false);

	const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked;
		setSelectAll(isChecked);
		onSelectAll(isChecked);
	};

	return (
		<tr>
			<th className={styles.checkbox__header_table}>
			<input type="checkbox" id="selectAll" name="selectAll" checked={selectAll} onChange={handleSelectAll} />
			</th>
			{categories.map((category, index) => (
				<th key={index}>
					<div className={styles.header__content}>
                        <p>{category}</p>
                        <button className={styles.sort__btn} onClick={() => handleSort(category)}>
                            <ArrowSortIcon />
                        </button>
                    </div>
				</th>
			))}
			<th className={styles.empty__header_table}></th>
			<th className={styles.empty__header_table}></th>
		</tr>
	);
}
