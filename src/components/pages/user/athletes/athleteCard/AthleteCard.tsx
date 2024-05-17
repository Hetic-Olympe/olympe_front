import HeartIcon from "@/components/icons/HeartIcon";
import { Athlete } from "../athlete.types";
import styles from "./athlete.module.scss";

interface AthleteCardProps {
  athlete: Athlete;
}

const AthleteCard = ({ athlete }: AthleteCardProps) => {
  console.log("firstname", athlete.firstname);

  const addAthleteToLikes = () => {
    console.log("Add athlete to likes");
  };

  return (
    <div className={styles.athlete}>
      <img
        className={styles.athlete__pictureProfile}
        src={athlete.pictureProfile}
        alt="Athlete's profile picture"
      />
      <div>
        <div className={styles.athlete__top_section}>
          <p className={styles.athlete__title}>
            {athlete.firstname} {athlete.lastname}
          </p>
          <p className={styles.athlete__subtitle}>NB medals</p>
        </div>
        <div>
          <p className={styles.athlete__category_title}>
            Sport:{" "}
            <span className={styles.athlete__category}>
              {athlete?.athleteSports.name}
            </span>
          </p>
          <p className={styles.athlete__category_title}>
            Nationality:{" "}
            <span className={styles.athlete__flag}>{athlete.country.iso}</span>
          </p>
          <p className={styles.athlete__category_title}>
            Age: <span className={styles.athlete__category}>{athlete.age}</span>
          </p>
          <p className={styles.athlete__category_title}>
            Gender:{" "}
            <span className={styles.athlete__category}>{athlete.gender}</span>
          </p>
        </div>
        {/* Like button */}
        <div className={styles.athlete__like_btn}>
          <button aria-label="Like" onClick={addAthleteToLikes}>
            <HeartIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AthleteCard;
