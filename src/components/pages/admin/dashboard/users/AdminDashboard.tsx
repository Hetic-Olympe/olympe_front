import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
import { Grid, GridItem } from "@/components/ui/Grid/Grid";
import { Card, KPICard } from "@/components/ui/Card/Card";
import StatsIcon from "@/components/icons/StatsIcon";
import { useMemo, useCallback, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import styles from "./adminDashboard.module.scss";
import { DataTable } from "@/components/sections/Tables/Table";
import useSelectRows from "@/hooks/useSelectRows";
import useFiltersAndPagination from "@/hooks/useFiltersAndPagination";
import { UserFilters } from "@/types/Filters";
import { PaginationTable } from "@/components/ui/Pagination/PaginationTable";
import { ArchiveUsersData, User, UsersData, UsersKpis } from "@/types/User";
import { getUsersColumns } from "@/components/sections/Tables/Users/Columns";
import { FiltersSection } from "@/components/sections/Filters/FiltersSection";
import { getUserFiltersDef } from "@/components/sections/Filters/FiltersDef/FiltersDefUsers";
import { useNavigate } from "react-router-dom";
import useQuery from "@/hooks/useQuery";
import useMutation from "@/hooks/useMutation";
import { Methods } from "@/types/Methods";

export default function AdminDashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [usersKips, setUsersKips] = useState<UsersKpis>({
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
  const { isLoading: fetchUsersLoading, fetchData: fetchUsers } =
    useQuery<UsersData>(
      `/admin/api/users${apiParamsString}`,
      useCallback(
        (data: UsersData) => {
          setUsers(data.users);
          setTotalPages(data.totalPages);
        },
        [setTotalPages]
      ),
      useCallback(
        (err: unknown) => {
          toast({
            variant: "destructive",
            title: "Fetch users failed",
            description: `Error: ${err}`,
          });
        },
        [toast]
      )
    );

  const { isLoading: fetchUsersKpisLoading } = useQuery<UsersKpis>(
    `/admin/api/users/kpis`,
    useCallback(
      (data: UsersKpis) => {
        setUsersKips((previousKpis) => {
          return {
            ...previousKpis,
            totalUsers: data.totalUsers,
            totalUsersActive: data.totalUsersActive,
            totalNewUsers: data.totalNewUsers,
          };
        });
      },
      [setUsersKips]
    ),
    useCallback(
      (err: unknown) => {
        toast({
          variant: "destructive",
          title: "Fetch users kpis failed",
          description: `Error: ${err}`,
        });
      },
      [toast]
    )
  );

  const { mutateData: doArchiveUsers } = useMutation(
    `/admin/api/users/archive`,
    useCallback(
      async (data: ArchiveUsersData) => {
        await fetchUsers();
        clearRows();
        toast({
          variant: "default",
          title: "Archive users success",
          description: `Success: ${data.success}`,
        });
      },
      [toast, fetchUsers, clearRows]
    ),
    useCallback(
      (err: unknown) => {
        toast({
          variant: "destructive",
          title: "Archive users failed",
          description: `Error: ${err}`,
        });
      },
      [toast]
    )
  );

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
      await doArchiveUsers({
        method: Methods.PATCH,
        body: JSON.stringify({ usersId }),
      });
    },
    [doArchiveUsers]
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
        button={{ title: "Add user", onClick: () => navigate("user/add") }}
      />
      <PageTemplate>
        <Grid margin={"0px 0px 32px 0px"}>
          <GridItem columnSpan={3}>
            <KPICard
              title="Total users"
              value={usersKips.totalUsers}
              isLoading={fetchUsersKpisLoading}
              icon={<StatsIcon color={"#FB923C"} />}
            />
          </GridItem>
          <GridItem columnSpan={3}>
            <KPICard
              title="Connected"
              value={usersKips.totalUsersActive}
              isLoading={fetchUsersKpisLoading}
              icon={<StatsIcon color={"#FB923C"} />}
            />
          </GridItem>
          <GridItem columnSpan={3}>
            <KPICard
              title="New users"
              value={usersKips.totalNewUsers}
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
