import styles from "./table.module.scss";
import { EditIcon, TrashIcon } from "../../icons/icons"

interface RowTableProps {
	item: { id: number; name: string; email: string; [key: string]: string | number, status: string, role: string, total: number};
	deleteUser: (id: number) => void;
	isSelected: boolean;
	handleRowSelect: (id: number, isChecked: boolean) => void;
}

export default function RowTable({ item, deleteUser, isSelected, handleRowSelect }: RowTableProps) {

	const handleDelete = () => {
		deleteUser(item.id);
	};

	return (
		<tr>
			<td className={styles.checkbox__row_table}>
				<input type="checkbox" id='select' checked={isSelected} onChange={(e) => handleRowSelect(item.id, e.target.checked)} />
			</td>
			{Object.entries(item).map(([key, value]) =>
			key !== "id" && (
				<td key={key} className={key}>
					<p className={`${styles.body__content} ${
						key === "role" ? (value === "admin" ? styles.admin__oval : styles.user__oval) :
						key === "status" ? `${styles.status__oval} ${value === "active" ? styles.status__active : styles.status__inactive}` : ''
					}`}>{value}</p>
				</td>
			)
			)}
			<td className={styles.btn__row_table}>
				<button onClick={handleDelete}>
					<TrashIcon />
				</button>
			</td>
			<td className={styles.btn__row_table}>
				<button>
					<EditIcon />
				</button>
			</td>
		</tr>
	);
}
