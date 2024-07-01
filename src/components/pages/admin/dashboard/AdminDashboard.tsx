import StatsIcon from "@/components/icons/StatsIcon";
import { getUserFiltersDef } from "@/components/sections/Filters/FiltersDef/FiltersDefUsers";
import { FiltersSection } from "@/components/sections/Filters/FiltersSection";
import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
import { DataTable } from "@/components/sections/Tables/Table";
import { getUsersColumns } from "@/components/sections/Tables/Users/Columns";
import { Card, KPICard } from "@/components/ui/Card/Card";
import { Grid, GridItem } from "@/components/ui/Grid/Grid";
import { PaginationTable } from "@/components/ui/Pagination/PaginationTable";
import { useToast } from "@/components/ui/use-toast";
import useFetch from "@/hooks/useFetch";
import useFiltersAndPagination from "@/hooks/useFiltersAndPagination";
import useSelectRows from "@/hooks/useSelectRows";
import { UserFilters } from "@/types/Filters";
import { User } from "@/types/User";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./adminDashboard.module.scss";

export interface UsersKpis {
  totalUsers: number;
  totalUsersActive: number;
  totalNewUsers: number;
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [usersKpis, setUsersKpis] = useState<UsersKpis>({
    totalUsers: 0,
    totalUsersActive: 0,
    totalNewUsers: 0,
  });
  const { selectOne, selectAll } = useSelectRows<User>(users);

  const {
    filters,
    hasAdditionalFilter,
    apiParamsString,
    totalPages,
    sorts,
    updateFilters,
    updateSorts,
    nextPage,
    previousPage,
    goToIndexPage,
    setTotalPages,
    clearFilters,
  } = useFiltersAndPagination<UserFilters>([
    "fullname",
    "roleId",
    "isConnected",
  ]);

  // -- FETCH
  const { isLoading: fetchUsersLoading, fetchData: fetchUsers } = useFetch(
    `/admin/api/users${apiParamsString}`
  );

  const { isLoading: fetchUsersKpisLoading, fetchData: fetchUsersKpis } =
    useFetch(`/admin/api/users/kpis`);

  const getUsersKpis = useCallback(async () => {
    try {
      const { data } = await fetchUsersKpis();
      if (data) {
        setUsersKpis(data);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Fetch users failed",
        description: `Error: ${err}`,
      });
    }
  }, [setUsersKpis, fetchUsersKpis, toast]);

  const getUsers = useCallback(async () => {
    try {
      const { data } = await fetchUsers();
      if (data) {
        setUsers(data.users);
        setTotalPages(data.totalPages);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Fetch users failed",
        description: `Error: ${err}`,
      });
    }
  }, [fetchUsers, toast, setTotalPages, setUsers]);

  const totalUsersCount = useMemo(() => {
    return usersKpis.totalUsers;
  }, [usersKpis]);

  const connectedUsersCount = useMemo(() => {
    return usersKpis.totalUsersActive;
  }, [usersKpis]);

  const newUsersCount = useMemo(() => {
    return usersKpis.totalNewUsers;
  }, [usersKpis]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    getUsersKpis();
  }, [getUsersKpis]);

  const onSelectAll = useCallback(() => {
    selectAll();
  }, [selectAll]);

  const onSelectOne = useCallback(
    (userId: User["id"]) => {
      selectOne(userId);
    },
    [selectOne]
  );

  const onDelete = (user: User) => {
    alert(`Delete ${user.id}`);
  };

  const onEdit = (user: User) => {
    alert(`Edit ${user.id}`);
  };

  const onSortingChanged = useCallback(
    (sortKey: string, sortOrder: false | "asc" | "desc") => {
      updateSorts(sortKey, sortOrder);
    },
    [updateSorts]
  );

  const columns = useMemo(
    () =>
      getUsersColumns({
        onSelectAll,
        onSelectOne,
        onEdit,
        onDelete,
        onSortingChanged,
        sorts,
      }),
    [sorts, onSortingChanged, onSelectAll, onSelectOne]
  );

  const filtersDef = useMemo(
    () =>
      getUserFiltersDef({
        updateFilters,
        filters,
      }),
    [updateFilters, filters]
  );

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
              value={totalUsersCount}
              isLoading={fetchUsersKpisLoading}
              icon={<StatsIcon color={"#FB923C"} />}
            />
          </GridItem>
          <GridItem columnSpan={3}>
            <KPICard
              title="Connected"
              value={connectedUsersCount}
              isLoading={fetchUsersKpisLoading}
              icon={<StatsIcon color={"#FB923C"} />}
            />
          </GridItem>
          <GridItem columnSpan={3}>
            <KPICard
              title="New users"
              value={newUsersCount}
              isLoading={fetchUsersKpisLoading}
              icon={<StatsIcon color={"#FB923C"} />}
            />
          </GridItem>
        </Grid>
        <Grid>
          <GridItem columnSpan={12} rowSpan={3}>
            <Card title="All users" minHeight={300}>
              <FiltersSection
                filters={filtersDef}
                hasAdditionalFilter={hasAdditionalFilter}
                clear={true}
                clearFilters={() => clearFilters()}
              />
              <div>
                <DataTable
                  columns={columns}
                  data={users}
                  isLoading={fetchUsersLoading}
                />
                {totalPages > 1 && (
                  <div className={styles.pagination_section}>
                    <PaginationTable
                      onPrevious={nextPage}
                      onNext={previousPage}
                      onChangePage={(index) => goToIndexPage(index)}
                      page={filters.page}
                      totalPages={totalPages}
                    />
                  </div>
                )}
              </div>
            </Card>
          </GridItem>
        </Grid>
      </PageTemplate>
    </>
  );
}
