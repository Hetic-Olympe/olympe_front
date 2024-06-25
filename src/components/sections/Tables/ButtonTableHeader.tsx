import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import styles from "./buttonTableHeader.module.scss";

interface ButtonTableHeaderProps {
  sortDirection: "asc" | "desc" | false;
  onSortingChanged: () => void;
  children: ReactNode;
}

const ButtonTableHeader = ({
  sortDirection,
  onSortingChanged,
  children,
}: ButtonTableHeaderProps) => {
  return (
    <Button
      size="none"
      variant="table_header"
      onClick={() => onSortingChanged()}
      className={styles.btn}
    >
      {children}
      {sortDirection === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
      {sortDirection === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
      {sortDirection === false && <ArrowUpDown className="ml-2 h-4 w-4" />}
    </Button>
  );
};

export default ButtonTableHeader;
