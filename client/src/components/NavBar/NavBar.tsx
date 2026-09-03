import { flushSync } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import userService from "../../utils/userService";
import SpoonLogo from "../SpoonLogo/SpoonLogo";
import styles from "./NavBar.module.css";

function NavBar() {
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    userService.logout();
    flushSync(() => {
      dispatch({ type: "SET_USER", payload: null });
    });
    navigate("/");
  }

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <SpoonLogo className={styles.logoIcon} />
        poonful
      </Link>
      <div className={styles.links}>
        <Link to="/recipes">Recipes</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
