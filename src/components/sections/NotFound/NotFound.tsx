import { useNavigate, useLocation } from 'react-router-dom';
import styles from "./NotFound.module.scss"

const NotFound = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname.includes('/admin') ? '/admin' : '/';

    return (
        <div className={styles.notFound}>
            <h1 className={styles.notFound__title}>
                404
            </h1>
            <h2 className={styles.notFound__subtitle}>
                Sorry, the page you're looking for does not exist.
            </h2>
            <button
                onClick={() => navigate(basePath)}
                className={styles.notFound__button}
            >
                Back to home
            </button>
        </div>
    );
};

export default NotFound;