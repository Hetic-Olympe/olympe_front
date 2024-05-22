import React from "react";
import styles from "./Card.module.scss";
import { NavLink } from "react-router-dom";

interface CardProps {
    title: string;
    children: React.ReactNode;
    link?: string;
    padding?: number;
    minHeight?: number;
}

interface KPICardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
}

export const Card = ({ title, children, link, padding = 32, minHeight = 0 }: CardProps) => {
    return (
        <div className={styles.card} style={{ minHeight }}>
            <div className={styles.card__header}>
                <h2 className={styles.card__header__title}>{title}</h2>
                {link && <NavLink to={link} className={styles.card__header__link}>View all</NavLink>}
            </div>
            <div className={styles.card__content} style={{ padding: `0 ${padding}px ${padding}px ${padding}px` }}>
                {children}
            </div>
        </div>
    );
}

export const KPICard = ({ title, value, icon }: KPICardProps) => {
    return (
        <div className={`${styles.card} ${styles['card--kpi']}`}>
            <div className={styles['card--kpi__content']}>
                <h3 className={styles['card--kpi__content__title']}>{title}</h3>
                <p className={styles['card--kpi__content__value']}>{value}</p>
            </div>
            <div className={styles['card--kpi__icon']}>{icon}</div>
        </div>
    );
}

export const Divider = () => <div className={styles.divider} />;