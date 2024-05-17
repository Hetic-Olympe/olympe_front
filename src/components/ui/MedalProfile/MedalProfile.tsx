import ReactCountryFlag from "react-country-flag";
import styles from "./MedalProfile.module.scss";
interface MedalProfileProps {
  type: number;
  athlete: {
    id: number;
    name: string;
    country: {
      iso: string;
      nicename: string;
    };
    sport: string;
    profile: string;
    totalMedals: number;
  };
}

/**
 *
 * @param {number} type - The type of medal (1 for gold, 2 for silver, 3 for bronze).
 * @param {object} athlete - The object containing the athlete's information.
 */
function MedalProfile({ type, athlete }: MedalProfileProps) {
  let medalColorTxt;
  let medalColorBg;
  switch (type) {
    case 1:
      medalColorTxt = "#524709";
      medalColorBg = "#FFD700";
      break;
    case 2:
      medalColorTxt = "#595959";
      medalColorBg = "#C0C0C0";
      break;
    case 3:
      medalColorTxt = "#524709";
      medalColorBg = "#CD7F32";
      break;
    default:
      medalColorTxt = "#000";
      medalColorBg = "#fff";
  }

  return (
    <div className={styles.medalProfile}>
      <div className={styles.medalProfile__content}>
        <div className={styles.medalProfile__content__medal}>
          <div
            className={styles.medalProfile__content__medal__header}
            style={{ backgroundColor: medalColorBg, color: medalColorTxt }}
          >
            <span>{type}</span>
          </div>
          <div
            className={styles.medalProfile__content__medal__picture}
            style={{ border: `8px solid ${medalColorBg}` }}
          >
            <img src={athlete.profile} alt={`Picture of ${athlete.name}`} />
          </div>
          <div
            className={styles.medalProfile__content__medal__footer}
            style={{ backgroundColor: medalColorBg, color: medalColorTxt }}
          >
            <span>{athlete.totalMedals} medals</span>
          </div>
        </div>
        <h3>{athlete.name}</h3>
        <p>
          Sport : <span>{athlete.sport}</span>
        </p>
        <p>
          Nationality :{" "}
          <span className={styles.medalProfile__content__medal__flag}>
            <ReactCountryFlag
              svg
              countryCode={athlete.country.iso}
              style={{
                fontSize: "1.3em",
              }}
              aria-label="United States"
            />
            <div
              className={styles.medalProfile__content__medal__flag__nicename}
            >
              {athlete.country.nicename}
            </div>
          </span>
        </p>
      </div>
    </div>
  );
}

export default MedalProfile;
