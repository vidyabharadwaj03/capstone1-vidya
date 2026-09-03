import SpoonLogo from "../SpoonLogo/SpoonLogo";
import styles from "./SplashScreen.module.css";

function SplashScreen() {
  return (
    <div className={styles.splash}>
      <div className={styles.logo}>
        <SpoonLogo className={styles.logoIcon} />
        poonful
      </div>
      <p className={styles.tagline}>Recipe Manager</p>
    </div>
  );
}

export default SplashScreen;
