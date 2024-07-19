import { PlusCircleIcon } from "lucide-react";
import styles from "./header.module.scss";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  subtitle: string;
  count?: number;
  button?: { title: string; onClick: () => void };
}

export default function Header({
  title,
  subtitle,
  count,
  button,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <h1 className={styles.header__title}>{title}</h1>
        <h2 className={styles.header__subtitle}>{subtitle}</h2>
      </div>
      {count && (
        <div>
          <span className={styles.header__count_nb}>{count} </span>
          <span className={styles.header__count_txt}>athletes</span>
        </div>
      )}
      {button && (
        <Button type="button" onClick={button.onClick}>
          <PlusCircleIcon width={"16px"} className="me-1" />
          {button.title}
        </Button>
      )}
    </header>
  );
}
