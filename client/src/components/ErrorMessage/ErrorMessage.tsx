import styles from "./ErrorMessage.module.css";

type ErrorMessageProps = {
  message: string;
};

function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  return <p className={styles.error}>{message}</p>;
}

export default ErrorMessage;
