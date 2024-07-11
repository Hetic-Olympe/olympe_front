import React from "react";
import { Badge } from "../../badge";
import styles from "./badgeDot.module.scss";

interface BadgeDotProps {
  children: React.ReactNode;
  isActive: boolean;
}

function activeColorClasses(isActive: boolean): string {
  return isActive ? styles.active_variant : styles.inactive_variant;
}

export const BadgeDot = ({ children, isActive }: BadgeDotProps) => {
  return (
    <Badge variant="outline" className="tag">
      <div className="flex justify-center gap-2 items-center">
        <div className={`${styles.dot} ${activeColorClasses(isActive)}`}></div>
        {children}
      </div>
    </Badge>
  );
};
