import React from "react";
import { NavLink } from "react-router-dom";
import { LoadingSpinner } from "../loadingSpinner";
import styles from "./Card.module.scss";
import { Button } from "../button";
interface CardProps {
  title: string;
  isLoading?: boolean;
  children: React.ReactNode;
  link?: string;
  archiveButton?: boolean;
  onMultipleArchive?: () => void;
  padding?: number;
  minHeight?: number;
  bannerPictureSrc?: string;
  profilePictureSrc?: string;
}

interface KPICardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  isLoading?: boolean;
}

export const Card = ({
  title,
  isLoading = false,
  children,
  link,
  archiveButton = false,
  padding = 32,
  minHeight = 0,
  onMultipleArchive,
}: CardProps) => {
  return (
    <div className={styles.card} style={{ minHeight }}>
      <div className={styles.card__header}>
        <h2 className={styles.card__header__title}>{title}</h2>
        {link && (
          <NavLink to={link} className={styles.card__header__link}>
            View all
          </NavLink>
        )}
        {archiveButton && (
          <Button type="button" onClick={onMultipleArchive}>
            Archive
          </Button>
        )}
      </div>
      <div
        className={styles.card__content}
        style={{ padding: `0 ${padding}px ${padding}px ${padding}px` }}
      >
        {isLoading ? (
          <LoadingSpinner className={styles.card__loadingSpinner} size="l" />
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export const KPICard = ({ title, value, icon, isLoading }: KPICardProps) => {
  return (
    <div className={`${styles.card} ${styles["card--kpi"]}`}>
      <div className={styles["card--kpi__content"]}>
        <h3 className={styles["card--kpi__content__title"]}>{title}</h3>
        {isLoading ? (
          <LoadingSpinner className={styles.card__loadingSpinner} size="l" />
        ) : (
          <p className={styles["card--kpi__content__value"]}>{value}</p>
        )}
      </div>
      <div className={styles["card--kpi__icon"]}>{icon}</div>
    </div>
  );
};

export const BannerCard = ({
  title,
  isLoading = false,
  children,
  link,
  padding = 32,
  minHeight = 0,
  bannerPictureSrc = "https://media.licdn.com/dms/image/D4E16AQG8vzwUtW7e2Q/profile-displaybackgroundimage-shrink_350_1400/0/1692697342619?e=1724889600&v=beta&t=tCXWVOSLO6GZdGlFrvKdmTi4AiPesciYH7A99Gixm2w",
  profilePictureSrc = "https://media.licdn.com/dms/image/D4E03AQFJozX4LWQdWA/profile-displayphoto-shrink_400_400/0/1692710017446?e=1724889600&v=beta&t=99eg61C1yTo62nMmVZMppIq7eeS5kwzvbjvTXTJgDvs",
}: CardProps) => {
  return (
    <div className={styles.card} style={{ minHeight }}>
      <div className={styles.card__banner}>
        <div className={styles.card__banner__picture}>
          <img src={bannerPictureSrc} alt="Banner of {user.name}" />
        </div>
        <div className={styles.card__banner__profile}>
          <img src={profilePictureSrc} alt="Picture of {user.name}" />
        </div>
      </div>

      <div className={styles.card__header}>
        <h2 className={styles.card__header__title}>{title}</h2>
        {link && (
          <NavLink to={link} className={styles.card__header__link}>
            View all
          </NavLink>
        )}
      </div>
      <div
        className={styles.card__content}
        style={{ padding: `0 ${padding}px ${padding}px ${padding}px` }}
      >
        {isLoading ? (
          <LoadingSpinner className={styles.card__loadingSpinner} size="l" />
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export const Divider = () => <div className={styles.divider} />;
