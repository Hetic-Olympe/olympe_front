import { useCallback, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import styles from "./selectInput.module.scss";
import { SelectItems } from "@/types/SelectItems";

type props = {
  onSelect: (key: string | null) => void;
  initValue: string;
  label: string;
  placeholder: string;
  items: SelectItems;
};

export const SelectInput = ({
  onSelect,
  initValue,
  label,
  placeholder,
  items,
}: props) => {
  const [input, setInput] = useState(initValue);

  const onChange = useCallback(
    (value: string) => {
      setInput(value);
      console.log(value);
      // Warning "0" is a value for all by default "0" means null beacause of no-filter
      onSelect(!value || value == "0" ? null : value);
    },
    [onSelect]
  );

  return (
    <div className={styles.filter}>
      <Label>{label}</Label>
      <Select value={input} onValueChange={(value) => onChange(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => {
              return (
                <SelectItem value={item.value} key={item.value}>
                  {item.label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
