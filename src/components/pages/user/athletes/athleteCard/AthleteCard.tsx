import HeartIcon from "@/components/icons/HeartIcon";
import { Athlete } from "../athlete.types";
import styles from "./athlete.module.scss";
import athlete_f from "@/assets/images/athlete_f.png";
import athlete_m from "@/assets/images/athlete_m.png";

interface AthleteCardProps {
  athlete: Athlete;
  onClick?: () => void;
}

const AthleteCard = ({ athlete, onClick }: AthleteCardProps) => {
  console.log("firstname", athlete.firstname);

  const addAthleteToLikes = () => {
    console.log("Add athlete to likes");
  };

  const profilePicture = athlete.pictureProfile
    ? athlete.pictureProfile
    : athlete.gender === "F"
    ? athlete_f
    : athlete_m;

  return (
    <div className={styles.card_container}>
      {/* Like button */}
      <div className={styles.like_btn}>
        <button aria-label="Like" onClick={addAthleteToLikes}>
          <HeartIcon />
        </button>
      </div>
      <div className={styles.athlete} onClick={onClick}>
        <img
          className={styles.athlete__pictureProfile}
          src={profilePicture}
          alt={`Photo of ${athlete.firstname} ${athlete.lastname}`}
        />
        <div className={styles.athlete__info_section}>
          <div className={styles.athlete__top_section}>
            <p className={styles.athlete__title}>
              {athlete.firstname} {athlete.lastname}
            </p>
            <span className={styles.athlete__tooltip}>
              {athlete.firstname} {athlete.lastname}
            </span>
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
              <span className={styles.athlete__flag}>
                {athlete.country.iso}
              </span>
            </p>
            <p className={styles.athlete__category_title}>
              Age:{" "}
              <span className={styles.athlete__category}>{athlete.age}</span>
            </p>
            <p className={styles.athlete__category_title}>
              Gender:{" "}
              <span className={styles.athlete__category}>{athlete.gender}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteCard;
