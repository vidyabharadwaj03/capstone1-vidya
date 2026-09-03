import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => onSearch(query), 300);
    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch(query);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search recipes"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
        aria-label="Search recipes"
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
