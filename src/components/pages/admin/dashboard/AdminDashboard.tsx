import { useState } from "react";
import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
import Table from "@/components/sections/Table/Table";

const data = [
	{ id: 1, name: "Name1", email: "email1@example.com", status: "active", role: "admin", total: 6 },
	{ id: 2, name: "Name2", email: "email2@example.com", status: "inactive", role: "user", total: 2 },
	{ id: 3, name: "Name3", email: "email3@example.com", status: "active", role: "admin", total: 5 }
];

export default function AdminDashboard() {
	const [usersData, setUsersData] = useState(data);

	const deleteUser = (id: number) => {
		const updatedData = usersData.filter(user => user.id !== id);
		setUsersData(updatedData);
	};

	return (
		<>
		<Header title="Manage all users" subtitle="Handle users information and moderation" />
		<PageTemplate>
			<h1>Page content</h1>
			<Table 
			categoryName={["Name", "Email", "Status", "Role", "Total"]} 
			items={usersData} 
			deleteUser={deleteUser} 
			/>
		</PageTemplate>
		</>
	);
}
