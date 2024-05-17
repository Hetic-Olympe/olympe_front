import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
import { useToast } from "@/components/ui/use-toast";
import useFetch from "@/hooks/useFetch";
import { useCallback, useEffect, useState } from "react";

interface Country {
  id: number;
  iso: string;
  nicename: string;
  isParticpate: boolean;
}

export default function AdminCountries() {
  const { toast } = useToast();
  const [countries, setCountries] = useState<Country[]>([]);
  const { isLoading, fetchData: fetchCountries } = useFetch("/countries");

  const getCountries = useCallback(async () => {
    try {
      const { data } = await fetchCountries();
      if (data) {
        console.log(data);
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

  return (
    <>
      <Header
        title="Manage all countries"
        subtitle="Handle countries's participations"
      />
      <PageTemplate>
        <h1>Countries Page</h1>
        {isLoading ? (
          "LOADING ..."
        ) : (
          <>
            {countries.length > 0
              ? countries.map((country) => (
                  <div key={country.id}>
                    <p>{country.iso}</p>
                    <p>{country.nicename}</p>
                    <p>
                      {country.isParticpate ? "Participate" : "Not participate"}
                    </p>
                  </div>
                ))
              : "No data found"}
          </>
        )}
      </PageTemplate>
    </>
  );
}
