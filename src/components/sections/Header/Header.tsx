import styles from "./header.module.scss";

interface HeaderProps {
  title: string;
  subtitle: string;
  count?: number;
}

export default function Header({ title, subtitle, count }: HeaderProps) {
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
    </header>
  );
}
