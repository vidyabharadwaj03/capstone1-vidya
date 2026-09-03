import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import userService from "../../utils/userService";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import styles from "./SignupPage.module.css";

function SignupPage() {
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordConf: "",
  });
  const [error, setError] = useState("");
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (state.password !== state.passwordConf) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const user = await userService.signup({
        email: state.email,
        password: state.password,
      });
      dispatch({ type: "SET_USER", payload: user });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>
        <h1>Create an Account</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={state.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={state.password}
            onChange={handleChange}
          />
          <label htmlFor="passwordConf">Confirm Password</label>
          <input
            id="passwordConf"
            name="passwordConf"
            type="password"
            required
            value={state.passwordConf}
            onChange={handleChange}
          />
          <button type="submit" className={styles.submitBtn}>
            Create Account
          </button>
          <Link to="/" className={styles.cancelBtn}>
            Cancel
          </Link>
          {error ? <ErrorMessage message={error} /> : null}
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
