import styles from "./profileCell.module.scss";
// import profile from "@/assets/images/athlete_f.png";
import UserIcon from "@/components/icons/UserIcon";

interface ProfileCellProps {
  label: string | undefined;
  profileUrl: string | undefined;
}

const ProfileCell = ({ profileUrl, label }: ProfileCellProps) => {
  return (
    <div className={styles.cell}>
      <div className={styles.cell__flag}>
        {profileUrl === null ? (
          <UserIcon />
        ) : (
          <img src={profileUrl} alt="Profile picture" />
        )}
      </div>
      {label === null ? "Name unvailable" : label}
    </div>
  );
};

export default ProfileCell;
