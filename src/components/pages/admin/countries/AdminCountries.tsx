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
import { useSearchParams } from "react-router-dom";
import { continentItems } from "@/types/SelectItems";

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

export interface CountryFilters {
  name: string | null;
  continentId: string | null;
}

export default function AdminCountries() {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [countries, setCountries] = useState<Country[]>([]);
  const [filters, setFilters] = useState<CountryFilters>({
    name: searchParams.get("name"),
    continentId: searchParams.get("continentId"),
  });
  const [apiParamsString, setApiParamsString] = useState("");
  const { isLoading: loadingFetchData, fetchData: fetchCountries } = useFetch(
    `/admin/api/countries${apiParamsString}`
  );

  const { fetchData: changeCountryParticipation } = useFetch(
    "/admin/api/countries/update"
  );

  const handleSearch = useCallback((name: string) => {
    if (name) {
      setFilters((previFilter) => ({ ...previFilter, name }));
    } else {
      setFilters((previFilter) => ({ ...previFilter, name: null }));
    }
  }, []);

  const handleSelectContinent = useCallback((continentId: string) => {
    if (continentId && continentId !== "0") {
      setFilters((previFilter) => ({ ...previFilter, continentId }));
    } else {
      setFilters((previFilter) => ({ ...previFilter, continentId: null }));
    }
  }, []);

  const updateParams = useCallback(() => {
    let paramsString = "";
    const entriesParams = Object.entries(filters);
    const newQueryParams = new URLSearchParams();
    if (entriesParams.some((params) => params !== null)) {
      paramsString += "?";
      const entriesParamsString: string[] = [];
      for (const [key, value] of entriesParams) {
        if (value) {
          console.log("VALUE", value);
          const entryString = `${key}=${value}`;
          entriesParamsString.push(entryString);
          newQueryParams.set(key, `${value}`);
        }
      }
      paramsString += entriesParamsString.join("&");
    }
    setApiParamsString(paramsString);
    setSearchParams(newQueryParams);
  }, [filters, setSearchParams]);

  useEffect(() => {
    updateParams();
  }, [updateParams]);

  const getCountries = useCallback(async () => {
    try {
      const { data } = await fetchCountries();

      if (data) {
        setCountries(data);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Fetch countries failed",
        description: `Error: ${err}`,
      });
    }
  }, [fetchCountries, toast]);

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
          </Grid>
        )}
      </PageTemplate>
    </>
  );
}
