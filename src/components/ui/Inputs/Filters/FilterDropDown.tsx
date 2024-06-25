"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Items } from "@/types/SelectItems";
import PlusCircleIcon from "../../../icons/PlusCircleIcon";
import styles from "./filterDropDown.module.scss";
import { getLabelFromValue } from "@/lib/utils-items";
import { useCallback, useEffect, useState } from "react";

interface FilterDropDownProps {
  onSelect: (key: string | null) => void;
  initValue: string;
  title: string;
  label: string;
  items: Items;
}

export function FilterDropDown({
  onSelect,
  initValue,
  title,
  label,
  items,
}: FilterDropDownProps) {
  const [position, setPosition] = useState(initValue);

  useEffect(() => {
    setPosition(initValue);
  }, [initValue]);

  const onChange = useCallback(
    (value: string) => {
      setPosition(value);
      // Warning "0" is a value for all by default "0" means null beacause of no-filter
      onSelect(!value || value == "0" ? null : value);
    },
    [onSelect]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`${styles.dropdown__button} border-dashed`}
        >
          <PlusCircleIcon width={"16px"} className="me-1" />
          {title}
          {getLabelFromValue(items, position) && (
            <>
              <div
                role="none"
                className="shrink-0 bg-border w-[1px] mx-2 h-4"
              ></div>
              <div>{getLabelFromValue(items, position)}</div>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`${styles.dropdown__content} w-56`}>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={(value) => onChange(value)}
        >
          {items.map((item) => {
            return (
              <DropdownMenuRadioItem value={item.value} key={item.value}>
                {item.label}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
