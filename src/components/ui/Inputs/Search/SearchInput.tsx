import { useCallback, useState } from "react";
import { Input } from "../../input";
import styles from "./searchInput.module.scss";

type props = {
  onSearch: (key: string) => void;
  initValue: string;
};

export const SearchInput = ({ onSearch, initValue }: props) => {
  const [input, setInput] = useState(initValue);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const onChange = useCallback(
    (value: string) => {
      setInput(value);
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      const timeout = setTimeout(() => {
        onSearch(value);
      }, 300); // Change 300 to your desired debounce time in milliseconds
      setDebounceTimeout(timeout);
    },
    [onSearch, debounceTimeout]
  );

  return (
    <div className={styles.search_input}>
      <Input
        placeholder="Search a country"
        value={input}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
