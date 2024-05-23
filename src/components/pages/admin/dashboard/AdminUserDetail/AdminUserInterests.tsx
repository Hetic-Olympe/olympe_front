import { useCallback, useMemo } from "react";
import MultiSelectBadge from "@/components/ui/mutliSelectBadge"

type Options = {
    value: string;
    label: string;
};

export default function AdminUserInterests() {

    // @TODO Replace this with a call to the API
    const options: Options[] = [
        { value: "swimming", label: "Swimming" },
        { value: "gymnastics", label: "Gymnastics" },
        { value: "handball", label: "Handball" },
        { value: "football", label: "Football" },
        { value: "basketball", label: "Basketball" },
        { value: "volleyball", label: "Volleyball" },
        { value: "tennis", label: "Tennis" },
        { value: "table-tennis", label: "Table Tennis" },
        { value: "athletics", label: "Athletics" },
        { value: "boxing", label: "Boxing" },
        { value: "cycling", label: "Cycling" },
        { value: "diving", label: "Diving" },
        { value: "equestrian", label: "Equestrian" },
        { value: "fencing", label: "Fencing" },
        { value: "golf", label: "Golf" },
        { value: "judo", label: "Judo" },
        { value: "rowing", label: "Rowing" },
        { value: "sailing", label: "Sailing" },
        { value: "shooting", label: "Shooting" },
        { value: "weightlifting", label: "Weightlifting" },
        { value: "wrestling", label: "Wrestling" },
    ];

    const sortedOptions = useMemo(() => {
        return [...options].sort((a, b) => a.label.localeCompare(b.label))
    }, [options]);

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