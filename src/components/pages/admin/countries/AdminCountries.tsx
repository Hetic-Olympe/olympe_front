import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
import { useToast } from "@/components/ui/use-toast";
import useFetch from "@/hooks/useFetch";
import { useCallback, useEffect, useState } from "react";
import styles from "./adminCountries.module.scss";
import { Grid, GridItem } from "@/components/ui/Grid/Grid";
import { SearchInput } from "@/components/ui/Inputs/Search/SearchInput";
import { SelectInput } from "@/components/ui/Inputs/Select/SelectInput";
import { Card } from "@/components/ui/Card/Card";
import ReactCountryFlag from "react-country-flag";
import { continentItems } from "@/types/SelectItems";
import { PaginationFilters } from "@/types/Pagination";
import { PaginationTable } from "@/components/ui/Pagination/PaginationTable";
import useFiltersAndPagination from "@/hooks/useFiltersAndPagination";

export interface Continent {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  iso: string;
  nicename: string;
  isParticipate: boolean;
  continent: Continent;
}

export interface CountryFilters extends PaginationFilters {
  name: string | null;
  continentId: string | null;
}

export default function AdminCountries() {
  const { toast } = useToast();
  const [countries, setCountries] = useState<Country[]>([]);

  // -- FILTERS ANd PAGINATION
  const {
    filters,
    apiParamsString,
    totalPages,
    updateFilters,
    nextPage,
    previousPage,
    setTotalPages,
  } = useFiltersAndPagination<CountryFilters>(["name", "continentId"]);

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
    getCountries();
  }, [getCountries]);

  const handleParticipation = async (id: number): Promise<void> => {
    try {
      await changeCountryParticipation({
        method: "POST",
        body: JSON.stringify({ id }),
      });
      // Update local state immediately after a successful server update
      setCountries((prevCountries) =>
        prevCountries.map((country) =>
          country.id === id
            ? { ...country, isParticipate: !country.isParticipate }
            : country
        )
      );
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Change country participation failed",
        description: `Error: ${error}`,
      });
    }
  };

  // -- LOGIC
  const handleSearch = (name: string | null) => {
    updateFilters("name", name);
  };

  const handleSelectContinent = (continentId: string | null) => {
    updateFilters("continentId", continentId);
  };

  return (
    <>
      <Header
        title="Manage all countries"
        subtitle="Handle countries's participations"
      />
      <PageTemplate>
        <div className={styles.search_section}>
          <SearchInput onSearch={handleSearch} initValue={filters.name || ""} />
        </div>
        <div className={styles.filter_section}>
          <SelectInput
            onSelect={handleSelectContinent}
            initValue={filters.continentId || "0"}
            placeholder="Select a continent"
            label="Continents"
            items={continentItems}
          />
        </div>
        {loadingFetchData ? (
          "LOADING ..."
        ) : (
          <Grid>
            <GridItem columnSpan={12}>
              <Card title="Countries">
                <div>
                  {countries.length > 0
                    ? countries.map((country) => (
                        <div key={country.id} className={styles.row}>
                          <ReactCountryFlag countryCode={country.iso} />
                          <p>{country.iso}</p>
                          <p>{country.nicename}</p>
                          <p>{country.continent.name}</p>
                          <label
                            htmlFor="isParticipate"
                            className={styles.row__toggle}
                          >
                            Is participate
                            <input
                              type="checkbox"
                              name="isParticipate"
                              className={styles.row__toggle__checkbox}
                              checked={country.isParticipate}
                              onChange={() => handleParticipation(country.id)}
                            />
                          </label>
                        </div>
                      ))
                    : "No countries found"}
                </div>
              </Card>
            </GridItem>
            {
              <PaginationTable
                onPrevious={nextPage}
                onNext={previousPage}
                page={filters.page}
                totalPages={totalPages}
              />
            }
          </Grid>
        )}
      </PageTemplate>
    </>
  );
}
