import styles from "./header.module.scss";

interface HeaderProps {
    title: string;
    subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
    return (
        <header className={styles.header}>
            <h1 className={styles.header__title}>{title}</h1>
            <h2 className={styles.header__subtitle}>{subtitle}</h2>
        </header>
    )
}