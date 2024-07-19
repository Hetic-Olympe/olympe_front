import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
import { useToast } from "@/components/ui/use-toast";
import { useCallback, useMemo, useState } from "react";
import styles from "./adminCountries.module.scss";
import { Grid, GridItem } from "@/components/ui/Grid/Grid";
import { Card } from "@/components/ui/Card/Card";
import { CountryFilters } from "@/types/Filters";
import { PaginationTable } from "@/components/ui/Pagination/PaginationTable";
import useFiltersAndPagination from "@/hooks/useFiltersAndPagination";
import { DataTable } from "@/components/sections/Tables/Table";
import {
  ChangeParticipationData,
  CountriesData,
  Country,
} from "@/types/Country";
import useQuery from "@/hooks/useQuery";
import useMutation from "@/hooks/useMutation";
import { Methods } from "@/types/Methods";
import { getCountryFiltersDef } from "@/components/sections/Filters/FiltersDef/FiltersDefCountries";
import { FiltersSection } from "@/components/sections/Filters/FiltersSection";
import { getCountriesColumns } from "@/components/sections/Tables/Countries/Columns";

export default function AdminCountries() {
  const { toast } = useToast();
  const [countries, setCountries] = useState<Country[]>([]);

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
  const { isLoading: loadingFetchData, fetchData: fetchCountries } =
    useQuery<CountriesData>(
      `/admin/api/countries${apiParamsString}`,
      useCallback(
        (data: CountriesData) => {
          setCountries(data.countries);
          setTotalPages(data.totalPages);
        },
        [setTotalPages]
      ),
      useCallback(
        (err: unknown) => {
          toast({
            variant: "destructive",
            title: "Fetch countries failed",
            description: `Error: ${err}`,
          });
        },
        [toast]
      )
    );

  const { mutateData: doChangeCountryParticipation } = useMutation(
    `/admin/api/countries/update/participation`,
    useCallback(
      async (data: ChangeParticipationData) => {
        await fetchCountries();
        toast({
          variant: "default",
          title: "Country participation change successfully",
          description: `Success: ${data.success}`,
        });
      },
      [toast, fetchCountries]
    ),
    useCallback(
      (err: unknown) => {
        toast({
          variant: "destructive",
          title: "Change country participation failed",
          description: `Error: ${err}`,
        });
      },
      [toast]
    )
  );

  const onParticipateChanged = useCallback(
    async (country: Country): Promise<void> => {
      await doChangeCountryParticipation({
        method: Methods.POST,
        body: JSON.stringify({ id: country.id }),
      });
    },
    [doChangeCountryParticipation]
  );

  // -- LOGIC
  const onSortingChanged = useCallback(
    (sortKey: string, sortOrder: false | "asc" | "desc") => {
      updateSorts(sortKey, sortOrder);
    },
    [updateSorts]
  );

  const columns = useMemo(
    () =>
      getCountriesColumns({
        onParticipateChanged,
        onSortingChanged,
        sorts,
      }),
    [onParticipateChanged, sorts, onSortingChanged]
  );

  const filtersDef = useMemo(
    () =>
      getCountryFiltersDef({
        updateFilters,
        filters,
      }),
    [updateFilters, filters]
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
            <Card title="All Countries" minHeight={300}>
              <FiltersSection
                filters={filtersDef}
                hasAdditionalFilter={hasAdditionalFilter}
                clear={true}
                clearFilters={() => clearFilters()}
              />
              <div>
                <DataTable
                  columns={columns}
                  data={countries}
                  isLoading={loadingFetchData}
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
