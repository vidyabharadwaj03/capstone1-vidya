import { Link } from "react-router-dom";
import SpoonLogo from "../../components/SpoonLogo/SpoonLogo";
import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <div className={styles.landing}>
      <h1 className={styles.logo}>
        <SpoonLogo className={styles.logoIcon} />
        poonful
      </h1>
      <p className={styles.tagline}>Store, share, and discover recipes.</p>
      <div className={styles.actions}>
        <Link to="/recipes" className={styles.primaryBtn}>
          Explore Recipes
        </Link>
        <Link to="/login" className={styles.secondaryBtn}>
          Login
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
