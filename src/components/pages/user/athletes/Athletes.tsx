import useFetch from "@/hooks/useFetch";
import { useCallback, useEffect } from "react";
import AthleteCard from "./athleteCard/AthleteCard";
import Header from "@/components/sections/Header/Header";
import { useToast } from "@/components/ui/use-toast";
import { Athlete } from "./athlete.types";
import { Grid, GridItem } from "@/components/ui/Grid/Grid";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";

export default function Athletes() {
  const { toast } = useToast();
  const {
    data: athletes,
    isLoading,
    error,
    fetchData: fetchAthletes,
  } = useFetch<Athlete[]>("/athletes");

  const getAthletes = useCallback(async () => {
    try {
      await fetchAthletes({ method: "GET" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Form submission failed",
        description: `Erreur: ${error}`,
      });
    }
  }, [toast, fetchAthletes]);

  useEffect(() => {
    getAthletes();
  }, [getAthletes]);

  return (
    <div>
      <Header
        title="All athletes"
        subtitle="Description"
        count={athletes?.length}
      />
      <PageTemplate>
        <Grid>
          {!isLoading && athletes?.length !== 0
            ? athletes?.map((athlete) => {
                return (
                  <GridItem columnSpan={4}>
                    <AthleteCard key={athlete.id} athlete={athlete} />
                  </GridItem>
                );
              })
            : "Loading athletes..."}
        </Grid>
        {error && <p>An error has occured ...</p>}
      </PageTemplate>
    </div>
  );
}
