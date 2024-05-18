import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
import { useToast } from "@/components/ui/use-toast";
import useFetch from "@/hooks/useFetch";
import { useCallback, useEffect, useState } from "react";
import styles from "./adminCountries.module.scss";
import { Grid, GridItem } from "@/components/ui/Grid/Grid";
import { Card } from "@/components/ui/Card/Card";
import ReactCountryFlag from "react-country-flag";

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

export default function AdminCountries() {
  const { toast } = useToast();
  const [countries, setCountries] = useState<Country[]>([]);
  const { isLoading, fetchData: fetchCountries } = useFetch(
    "/admin/api/countries"
  );

  const { fetchData: changeCountryParticipation } = useFetch(
    "/admin/api/countries/update"
  );

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
        {isLoading ? (
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
                    : "No data found"}
                </div>
              </Card>
            </GridItem>
          </Grid>
        )}
      </PageTemplate>
    </>
  );
}
