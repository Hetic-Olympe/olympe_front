import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
import { Grid, GridItem } from "@/components/ui/Grid/Grid";
import { Card, KPICard } from "@/components/ui/Card/Card";
import StatsIcon from "@/components/icons/StatsIcon";
import { useState, useEffect, useMemo, useCallback } from "react";
import useFetch from "@/hooks/useFetch";
import { useToast } from "@/components/ui/use-toast";
import styles from "./adminDashboard.module.scss";
import { DataTable } from "@/components/sections/Tables/Table";
import useSelectRows from "@/hooks/useSelectRows";
import useFiltersAndPagination from "@/hooks/useFiltersAndPagination";
import { UserFilters } from "@/types/Filters";
import { PaginationTable } from "@/components/ui/Pagination/PaginationTable";
import { User } from "@/types/User";
import { getUsersColumns } from "@/components/sections/Tables/Users/Columns";
import { FiltersSection } from "@/components/sections/Filters/FiltersSection";
import { getUserFiltersDef } from "@/components/sections/Filters/FiltersDef/FiltersDefUsers";
import { SelectedRows } from "@/types/SelectRows";
import { useNavigate } from "react-router-dom";

export interface UsersKpis {
  totalUsers: number;
  totalUsersActive: number;
  totalNewUsers: number;
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [usersKpis, setUsersKpis] = useState<UsersKpis>({
    totalUsers: 0,
    totalUsersActive: 0,
    totalNewUsers: 0,
  });
  const { selectedRows, selectOne, selectAll, clearRows } =
    useSelectRows<User>(users);

  const {
    filters,
    hasAdditionalFilter,
    apiParamsString,
    totalPages,
    sorts,
    limit,
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

  const { fetchData: doArchiveUsers } = useFetch(`/admin/api/users/archive`);

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

  const archiveUsers = useCallback(
    async (selectedRows: SelectedRows) => {
      try {
        const { data } = await doArchiveUsers({
          method: "PATCH",
          body: JSON.stringify({ usersId: selectedRows }),
        });
        toast({
          variant: "default",
          title: "Archive users success",
          description: `Success: ${data.success}`,
        });
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Archive users failed",
          description: `Error: ${err}`,
        });
      }
    },
    [toast, doArchiveUsers]
  );

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

  const onArchive = useCallback(
    async (usersId: (string | number)[]) => {
      await archiveUsers(usersId);
      clearRows();
      getUsers();
    },
    [clearRows, archiveUsers, getUsers]
  );

  const onEdit = useCallback(
    (userId: string | number) => {
      navigate(`user/${userId}`);
    },
    [navigate]
  );

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
        onArchive,
        onSortingChanged,
        sorts,
        selectedRows,
        limit,
      }),
    [
      sorts,
      selectedRows,
      limit,
      onSortingChanged,
      onSelectAll,
      onSelectOne,
      onArchive,
      onEdit,
    ]
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
            <Card
              title="All users"
              minHeight={300}
              archiveButton={selectedRows.length > 0}
              onMultipleArchive={() => onArchive(selectedRows)}
            >
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
