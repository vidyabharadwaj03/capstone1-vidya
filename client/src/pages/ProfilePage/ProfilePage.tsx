import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { flushSync } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import userService from "../../utils/userService";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Toast from "../../components/Toast/Toast";
import styles from "./ProfilePage.module.css";

function ProfilePage() {
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    try {
      const updated = await userService.updateProfile({
        email,
        password: password || undefined,
      });
      dispatch({ type: "SET_USER", payload: updated });
      setPassword("");
      setToast("Your profile info was successfully updated.");
      setTimeout(() => setToast(""), 2500);
    } catch (err: any) {
      setError(err.message);
    }
  }

  function handleLogout() {
    userService.logout();
    flushSync(() => {
      dispatch({ type: "SET_USER", payload: null });
    });
    navigate("/");
  }

  async function handleDeleteAccount() {
    await userService.deleteAccount();
    flushSync(() => {
      dispatch({ type: "SET_USER", payload: null });
    });
    navigate("/");
  }

  return (
    <div className={styles.page}>
      <p className={styles.breadcrumb}>
        <Link to="/">Home</Link> &gt; Your Profile
      </p>
      <h1>Your Profile</h1>
      <form onSubmit={handleSave} className={styles.form}>
        <label htmlFor="email">Username</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.saveBtn}>
          Save Changes
        </button>
        {error ? <ErrorMessage message={error} /> : null}
      </form>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Log Out
      </button>
      <button
        className={styles.deleteLink}
        onClick={() => setConfirmingDelete(true)}
      >
        Delete Account
      </button>
      {confirmingDelete ? (
        <ConfirmDialog
          message="Do you want to delete your account? This action cannot be undone."
          confirmLabel="Yes, Delete Account"
          cancelLabel="Nevermind"
          onConfirm={handleDeleteAccount}
          onCancel={() => setConfirmingDelete(false)}
        />
      ) : null}
      <Toast message={toast} />
    </div>
  );
}

export default ProfilePage;
