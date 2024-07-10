import React from "react";
import { Badge } from "../../badge";
import styles from "./badgeRole.module.scss";

interface BadgeRoleProps {
  children: React.ReactNode;
  role: string;
}

function roleColorClasses(role: string): string {
  switch (role) {
    case "admin":
      return styles.admin_variant;
    case "user":
      return styles.user_variant;
    default:
      return styles.user_variant;
  }
}

export const BadgeRole = ({ children, role }: BadgeRoleProps) => {
  return (
    <Badge variant="outline" className={roleColorClasses(role)}>
      {children}
    </Badge>
  );
};
