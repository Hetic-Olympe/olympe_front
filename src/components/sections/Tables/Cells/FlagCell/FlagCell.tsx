import ReactCountryFlag from "react-country-flag";
import styles from "./flagCell.module.scss";

interface FlagCellProps {
  label: string;
  iso: string;
}

const FlagCell = ({ iso, label }: FlagCellProps) => {
  return (
    <div className={styles.cell}>
      <div className={styles.cell__flag}>
        <ReactCountryFlag
          svg
          countryCode={iso}
          style={{
            minWidth: "64px",
            height: "64px",
          }}
          aria-label={label}
        />
      </div>
      {label}
    </div>
  );
};

export default FlagCell;
