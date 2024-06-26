import CloseIcon from "@/components/icons/CloseIcon";
import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
import { DataTable } from "@/components/sections/Tables/Table";
import { Card, KPICard } from "@/components/ui/Card/Card";
import { Grid, GridItem } from "@/components/ui/Grid/Grid";
import { FilterDropDown } from "@/components/ui/Inputs/Filters/FilterDropDown";
import { SearchInput } from "@/components/ui/Inputs/Search/SearchInput";
import { PaginationTable } from "@/components/ui/Pagination/PaginationTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useFetch from "@/hooks/useFetch";
import useFiltersAndPagination from "@/hooks/useFiltersAndPagination";
import { Athlete } from "@/types/Athlete";
import { continentItems } from "@/types/SelectItems"; // Utiliser si applicable pour filtrer par pays
import { UserIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./adminAthletes.module.scss";

// Adapter les types de filtres pour les athlètes
type AthleteFilters = {
  name?: string;
  countryId?: string;
  sportField?: string;
};

export default function AdminAthletes() {
  const { toast } = useToast();
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  // -- FILTERS AND PAGINATION
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

  // -- FETCH
  const { isLoading: loadingFetchData, fetchData: fetchAthletes } = useFetch(
    `/admin/api/athletes${apiParamsString}`
  );

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
  }, [fetchAthletes, toast, setTotalPages]);

  useEffect(() => {
    console.log("ATHLETES");
    getAthletes();
  }, [getAthletes]);

  // -- LOGIC
  const handleSearch = (name: string | null) => {
    updateFilters("name", name);
  };

  const handleSelectCountry = (countryId: string | null) => {
    updateFilters("countryId", countryId);
  };

  const handleSelectSportField = (sportField: string | null) => {
    updateFilters("sportField", sportField);
  };

  const onSelectAll = useCallback(() => {
    if (selectedRows.length === athletes.length) {
      setSelectedRows([]);
    } else {
      const athletesId = athletes.map((athlete) => athlete.id);
      setSelectedRows([...athletesId]);
    }
  }, [athletes, selectedRows]);

  const onSelectOne = useCallback(
    (athleteId: Athlete["id"]) => {
      if (selectedRows.includes(athleteId)) {
        setSelectedRows((previousSelectedRow) => [
          ...previousSelectedRow.filter((id) => id !== athleteId),
        ]);
      } else {
        setSelectedRows((previousSelectedRow) => [
          ...previousSelectedRow,
          athleteId,
        ]);
      }
    },
    [selectedRows]
  );

  useEffect(() => {
    console.log("SELECTED ROWS", selectedRows);
  }, [selectedRows]);

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
    () => [
      {
        accessorKey: "firstname",
        header: "First Name",
      },
      {
        accessorKey: "lastname",
        header: "Last Name",
      },
      {
        accessorKey: "age",
        header: "Age",
      },
      {
        accessorKey: "gender",
        header: "Gender",
      },
      {
        accessorKey: "pictureProfile",
        header: "Profile Picture",
        cell: ({ row }) => (
          <img
            src={row.original.pictureProfile}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        ),
      },
      {
        accessorKey: "country.nicename",
        header: "Country",
      },
      {
        accessorKey: "sportField",
        header: "Sport",
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex justify-center">
            <Button onClick={() => onEdit(row.original)}>Edit</Button>
            <Button
              variant="destructive"
              onClick={() => onDelete(row.original)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  return (
    <>
      <Header
        title="Manage all athletes"
        subtitle="Handle athletes' data and participation"
      />
      <PageTemplate>
        <Grid>
          <GridItem columnSpan={3}>
            <KPICard
              title="Total athletes"
              value={athletes?.length ?? 0} // Vérification ici
              icon={<UserIcon color={"#FB923C"} />}
            />
          </GridItem>
          <GridItem columnSpan={12}>
            <Card title="Athletes" minHeight={300}>
              <div className={styles.filter_section}>
                <SearchInput
                  onSearch={handleSearch}
                  initValue={filters.name || ""}
                />
                <FilterDropDown
                  onSelect={handleSelectCountry}
                  title="Countries"
                  initValue={filters.countryId || ""}
                  label="Select a country"
                  items={continentItems} // Utiliser une liste d'items pertinents pour les pays
                />
                <FilterDropDown
                  onSelect={handleSelectSportField}
                  title="Sport Fields"
                  initValue={filters.sportField || ""}
                  label="Select a sport field"
                  items={[
                    { label: "Football", value: "football" },
                    { label: "Basketball", value: "basketball" },
                  ]} // Exemple d'items
                />
                {hasAdditionalFilter && (
                  <Button variant="ghost" onClick={() => clearFilters()}>
                    Reset
                    <CloseIcon width="16" />
                  </Button>
                )}
              </div>
              <div>
                <DataTable
                  columns={columns}
                  data={athletes}
                  isLoading={loadingFetchData}
                />
                <div className={styles.pagination_section}>
                  <PaginationTable
                    onPrevious={previousPage}
                    onNext={nextPage}
                    onChangePage={(index) => goToIndexPage(index)}
                    page={filters.page}
                    totalPages={totalPages}
                  />
                </div>
              </div>
            </Card>
          </GridItem>
        </Grid>
      </PageTemplate>
    </>
  );
}
