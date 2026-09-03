import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import userService from "../../utils/userService";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const [state, setState] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const user = await userService.login(state);
      dispatch({ type: "SET_USER", payload: user });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>
        <h1>Welcome Back!</h1>
        <p>Login to your account to continue</p>
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
          <button type="submit" className={styles.submitBtn}>
            Login
          </button>
          {error ? <ErrorMessage message={error} /> : null}
        </form>
        <p className={styles.switch}>
          New to Spoonful? <Link to="/signup">Create an Account</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
