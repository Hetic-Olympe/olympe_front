import { useCallback, useEffect, useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";
import MultiSelectBadge from "@/components/ui/mutliSelectBadge"
import { useToast } from "@/components/ui/use-toast";

type Options = {
    value: string;
    label: string;
};

export default function UserInterests() {
    const { toast } = useToast();
    const { fetchData: fetchSportFields } = useFetch('/api/sports/fields');
    const [sportsFields, setSportsFields] = useState<Options[]>([]);


    useEffect(() => {
        const getSportFields = async () => {
            try {
                const { data } = await fetchSportFields();
                setSportsFields(data.map((field: any) => ({ value: field.label, label: field.label })));
                console.log(sportsFields);
            }
            catch (err) {
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
        return [...sportsFields].sort((a, b) => a.label.localeCompare(b.label))
    }, [sportsFields]);

    // @TODO Replace this with a patch request to the API
    const handleSelectionChange = useCallback((selected: Options[]) => {
        console.log(selected);
    }, []);

    return (
        <MultiSelectBadge
            placeholder="Select your interests"
            options={sortedOptions}
            defaultValues={
                [
                    { value: "swimming", label: "Swimming" },
                    { value: "football", label: "Football" },
                ]}
            onChange={handleSelectionChange}
        />
    )
}