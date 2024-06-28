import { useCallback, useEffect, useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";
import MultiSelectBadge from "@/components/ui/mutliSelectBadge";
import { useToast } from "@/components/ui/use-toast";
import { SportField, User } from "@/types/User";

interface UserInterestsProps {
  user: User | null;
}

type Options = {
  value: string;
  label: string;
};

export default function UserInterests({ user }: UserInterestsProps) {
  const { toast } = useToast();
  const { fetchData: fetchSportFields } = useFetch("/api/sports/fields");
  const { fetchData: patchUserInterests } = useFetch("/api/users/me/interests");
  const [sportsFields, setSportsFields] = useState<Options[]>([]);

  const defaultValues = useMemo(() => {
    return user?.interests.map((interest) => ({
      value: interest.sportField.id,
      label: interest.sportField.label,
    }));
  }, [user]);

  useEffect(() => {
    const getSportFields = async () => {
      try {
        const { data } = await fetchSportFields();
        setSportsFields(
          data.map((field: SportField) => ({
            value: field.id,
            label: field.label,
          }))
        );
      } catch (err) {
        console.error(err);
        toast({
          variant: "destructive",
          title: "Fetch sports fields failed",
          description: `Error: ${err}`,
        });
      }
    };

    getSportFields();
  }, [fetchSportFields, toast]);

  const sortedOptions = useMemo(() => {
    return [...sportsFields].sort((a, b) => a.label.localeCompare(b.label));
  }, [sportsFields]);

  const handleSelectionChange = useCallback(
    async (selected: Options[]) => {
      try {
        await patchUserInterests({
          method: "PATCH",
          body: JSON.stringify({
            interests: selected.map((interest) => interest.value),
          }),
        });
      } catch (err) {
        console.error("err", err);
      }
    },
    [patchUserInterests, toast]
  );

  return (
    <MultiSelectBadge
      placeholder="Select your interests"
      options={sortedOptions}
      defaultValues={defaultValues}
      onChange={handleSelectionChange}
    />
  );
}
