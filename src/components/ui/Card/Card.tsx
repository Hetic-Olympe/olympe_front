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

export const Divider = () => <div className={styles.divider} />;