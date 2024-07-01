import { getAthleteFiltersDef } from "@/components/sections/Filters/FiltersDef/FiltersDefAthletes";
import {
  FilterDef,
  FiltersSection,
} from "@/components/sections/Filters/FiltersSection";
import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
import { getAthletesColumns } from "@/components/sections/Tables/Athletes/Columns";
import { DataTable } from "@/components/sections/Tables/Table";
import { Card } from "@/components/ui/Card/Card";
import { Grid, GridItem } from "@/components/ui/Grid/Grid";
import { PaginationTable } from "@/components/ui/Pagination/PaginationTable";
import { useToast } from "@/components/ui/use-toast";
import useFetch from "@/hooks/useFetch";
import useFiltersAndPagination from "@/hooks/useFiltersAndPagination";
import useSelectRows from "@/hooks/useSelectRows";
import { Athlete } from "@/types/Athlete";
import { AthleteFilters } from "@/types/Filters";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./adminAthletes.module.scss";

export default function AdminAthletes() {
  const { toast } = useToast();
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const { selectOne, selectAll } = useSelectRows<Athlete>(athletes);

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
  } = useFiltersAndPagination<AthleteFilters>([
    "name",
    "countryId",
    "sportField",
  ]);

  const { isLoading: fetchAthletesLoading, fetchData: fetchAthletes } =
    useFetch(`/admin/api/athletes${apiParamsString}`);

  const getAthletes = useCallback(async () => {
    try {
      const { data } = await fetchAthletes();
      if (data) {
        setAthletes(data.athletes);
        setTotalPages(data.totalPages);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Fetch athletes failed",
        description: `Error: ${err}`,
      });
    }
  }, [fetchAthletes, toast, setTotalPages, setAthletes]);

  useEffect(() => {
    getAthletes();
  }, [getAthletes]);

  const onSelectAll = useCallback(() => {
    selectAll();
  }, [selectAll]);

  const onSelectOne = useCallback(
    (athleteId: Athlete["id"]) => {
      selectOne(athleteId);
    },
    [selectOne]
  );

  const onDelete = (athlete: Athlete) => {
    alert(`Delete ${athlete.id}`);
  };

  const onEdit = (athlete: Athlete) => {
    alert(`Edit ${athlete.id}`);
  };

  const onSortingChanged = useCallback(
    (sortKey: string, sortOrder: false | "asc" | "desc") => {
      updateSorts(sortKey, sortOrder);
    },
    [updateSorts]
  );

  const columns = useMemo(
    () =>
      getAthletesColumns({
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
      getAthleteFiltersDef({
        updateFilters,
        filters,
      }),
    [updateFilters, filters]
  );

  return (
    <>
      <Header
        title="Manage all athletes"
        subtitle="Handle athletes' data and participation"
      />
      <PageTemplate>
        <Grid>
          <GridItem columnSpan={12} rowSpan={3}>
            <Card title="All athletes" minHeight={300}>
              <FiltersSection
                filters={filtersDef.map(
                  (filter, index) => ({ ...filter, key: index } as FilterDef)
                )}
                hasAdditionalFilter={hasAdditionalFilter}
                clear={true}
                clearFilters={() => clearFilters()}
              />
              <div>
                <DataTable
                  columns={columns}
                  data={athletes}
                  isLoading={fetchAthletesLoading}
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
