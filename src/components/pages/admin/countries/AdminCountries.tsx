import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
import { useToast } from "@/components/ui/use-toast";
import useFetch from "@/hooks/useFetch";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./adminCountries.module.scss";
import { Grid, GridItem } from "@/components/ui/Grid/Grid";
import { SearchInput } from "@/components/ui/Inputs/Search/SearchInput";
import { Card } from "@/components/ui/Card/Card";
import { continentItems, isParticipateItems } from "@/types/SelectItems";
import { CountryFilters } from "@/types/Filters";
import { PaginationTable } from "@/components/ui/Pagination/PaginationTable";
import useFiltersAndPagination from "@/hooks/useFiltersAndPagination";
import { getCountriesColumns } from "../../../sections/Tables/Countries/Columns";
import { DataTable } from "@/components/sections/Tables/Table";
import { FilterDropDown } from "@/components/ui/Inputs/Filters/FilterDropDown";
import { Button } from "@/components/ui/button";
import CloseIcon from "@/components/icons/CloseIcon";
import { Country } from "@/types/Country";

export default function AdminCountries() {
  const { toast } = useToast();
  const [countries, setCountries] = useState<Country[]>([]);
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
  } = useFiltersAndPagination<CountryFilters>([
    "name",
    "continentId",
    "isParticipate",
  ]);

  // -- FETCH
  const { isLoading: loadingFetchData, fetchData: fetchCountries } = useFetch(
    `/admin/api/countries${apiParamsString}`
  );

  const { fetchData: changeCountryParticipation } = useFetch(
    "/admin/api/countries/update/participation"
  );

  const getCountries = useCallback(async () => {
    try {
      const { data } = await fetchCountries();

      if (data) {
        setCountries(data.countries);
        setTotalPages(data.totalPages);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Fetch countries failed",
        description: `Error: ${err}`,
      });
    }
  }, [fetchCountries, toast, setTotalPages]);

  useEffect(() => {
    console.log("COUNTRY");
    getCountries();
  }, [getCountries]);

  const onParticipateChanged = useCallback(
    async (country: Country): Promise<void> => {
      try {
        await changeCountryParticipation({
          method: "POST",
          body: JSON.stringify({ id: country.id }),
        });
        // Update local state immediately after a successful server update
        setCountries((prevCountries) =>
          prevCountries.map((previousCountry) =>
            previousCountry.id === country.id
              ? {
                  ...previousCountry,
                  isParticipate: !previousCountry.isParticipate,
                }
              : previousCountry
          )
        );
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Change country participation failed",
          description: `Error: ${error}`,
        });
      }
    },
    [changeCountryParticipation, toast]
  );

  // -- LOGIC
  const handleSearch = (name: string | null) => {
    updateFilters("name", name);
  };

  const handleSelectContinent = (continentId: string | null) => {
    updateFilters("continentId", continentId);
  };

  const handleSelectIsParticipate = (isParticipate: string | null) => {
    updateFilters("isParticipate", isParticipate);
  };

  const onSelectAll = useCallback(() => {
    if (selectedRows.length === countries.length) {
      setSelectedRows([]);
    } else {
      const countriesId = countries.map((country) => country.id);
      setSelectedRows([...countriesId]);
    }
  }, [countries, selectedRows]);

  const onSelectOne = useCallback(
    (countryId: Country["id"]) => {
      if (selectedRows.includes(countryId)) {
        setSelectedRows((previousSelectedRow) => [
          ...previousSelectedRow.filter((id) => id !== countryId),
        ]);
      } else {
        setSelectedRows((previousSelectedRow) => [
          ...previousSelectedRow,
          countryId,
        ]);
      }
    },
    [selectedRows]
  );

  useEffect(() => {
    console.log("SELECTED ROWS", selectedRows);
  }, [selectedRows]);

  const onDelete = (country: Country) => {
    alert(`Delete ${country.id}`);
  };

  const onEdit = (country: Country) => {
    alert(`Edit ${country.id}`);
  };

  const onSortingChanged = useCallback(
    (sortKey: string, sortOrder: false | "asc" | "desc") => {
      updateSorts(sortKey, sortOrder);
    },
    [updateSorts]
  );

  const columns = useMemo(
    () =>
      getCountriesColumns({
        onSelectAll,
        onSelectOne,
        onEdit,
        onDelete,
        onParticipateChanged,
        onSortingChanged,
        sorts,
      }),
    [onParticipateChanged, sorts, onSortingChanged, onSelectAll, onSelectOne]
  );

  return (
    <>
      <Header
        title="Manage all countries"
        subtitle="Handle countries's participations"
      />
      <PageTemplate>
        <Grid>
          <GridItem columnSpan={12}>
            <Card title="Countries" minHeight={300}>
              <div className={styles.filter_section}>
                <SearchInput
                  onSearch={handleSearch}
                  initValue={filters.name || ""}
                />
                <FilterDropDown
                  onSelect={handleSelectContinent}
                  title="Continents"
                  initValue={filters.continentId || ""}
                  label="Select a continent"
                  items={continentItems}
                />
                <FilterDropDown
                  onSelect={handleSelectIsParticipate}
                  title="Is Participiate"
                  initValue={filters.isParticipate || ""}
                  label="Filter by particpiate"
                  items={isParticipateItems}
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
                  data={countries}
                  isLoading={loadingFetchData}
                />
                <div className={styles.pagination_section}>
                  <PaginationTable
                    onPrevious={nextPage}
                    onNext={previousPage}
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
