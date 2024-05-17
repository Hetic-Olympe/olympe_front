import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { Athlete } from "./athlete.types";
import AthleteCard from "./athleteCard/AthleteCard";
import Header from "@/components/sections/Header/Header";

export default function Athletes() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchAthletes = useFetch("/athletes");

  useEffect(() => {
    const getAthletes = async () => {
      try {
        const data = await fetchAthletes({ method: "GET" });
        setAthletes(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getAthletes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header
        title="All athletes"
        subtitle="Description"
        count={athletes.length}
      />
      <div>
        {!isLoading && athletes.length !== 0
          ? athletes.map((athlete) => {
              return <AthleteCard key={athlete.id} athlete={athlete} />;
            })
          : "Is loading"}
      </div>
    </div>
  );
}
