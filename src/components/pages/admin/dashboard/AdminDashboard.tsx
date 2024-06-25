import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
import { Grid, GridItem } from "@/components/ui/Grid/Grid";
import { Card, KPICard } from "@/components/ui/Card/Card";
import StatsIcon from "@/components/icons/StatsIcon";
import { useState, useEffect, useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import { useToast } from "@/components/ui/use-toast";
import styles from "./adminDashboard.module.scss";
import { Link } from "react-router-dom";

export enum RoleLabel {
  USER = "user",
  ADMIN = "admin",
}
export interface SportField {
  id: string;
  label: string;
}

export interface Interest {
  sportField: SportField;
}

export interface User {
  id: string;
  createdAt: string;
  nicename: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  isConnected: boolean;
  role: {
    id: number;
    label: RoleLabel;
  };
  interests: Interest[];
  likes: string[];
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const { isLoading, fetchData: fetchUsers } = useFetch("/admin/api/users");

  const connectedUsersCount = useMemo(() => {
    return users.filter((user) => user.isConnected).length;
  }, [users]);

  const newUsersCount = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return users.filter((user) => user.createdAt.startsWith(today)).length;
  }, [users]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await fetchUsers();
        if (data) {
          setUsers(data);
        }
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Fetch countries failed",
          description: `Error: ${err}`,
        });
      }
    };

    getUsers();
  }, [fetchUsers, toast]);

  return (
    <>
      <Header
        title="Manage all users"
        subtitle="Handle users information and moderation"
      />
      <PageTemplate>
        <Grid margin={"0px 0px 32px 0px"}>
          <GridItem columnSpan={3}>
            <KPICard
              title="Total users"
              value={users.length}
              icon={<StatsIcon color={"#FB923C"} />}
            />
          </GridItem>
          <GridItem columnSpan={3}>
            <KPICard
              title="Connected"
              value={connectedUsersCount}
              icon={<StatsIcon color={"#FB923C"} />}
            />
          </GridItem>
          <GridItem columnSpan={3}>
            <KPICard
              title="New users"
              value={newUsersCount}
              icon={<StatsIcon color={"#FB923C"} />}
            />
          </GridItem>
        </Grid>
        <Grid>
          <GridItem columnSpan={12} rowSpan={3}>
            <Card title="All users">
              <div className={styles.usersList}>
                {isLoading && <p>Loading...</p>}
                {users.length === 0 && <p>No users found</p>}
                {users.map((user) => (
                  <Link
                    className={styles.usersList__item}
                    key={user.id}
                    to={`/admin/user/${user.id}`}
                  >
                    <p>
                      Name : {user.firstname} {user.lastname}
                    </p>
                    <p>Email : {user.email}</p>
                    <p>
                      Status :{" "}
                      {user.isConnected ? "Connected" : "Not connected"}
                    </p>
                    <p>Role : {user.role.label}</p>
                  </Link>
                ))}
              </div>
            </Card>
          </GridItem>
        </Grid>
      </PageTemplate>
    </>
  );
}
