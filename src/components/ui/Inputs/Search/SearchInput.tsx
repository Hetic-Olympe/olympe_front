import { useCallback, useState } from "react";
import { Input } from "../../input";
import styles from "./searchInput.module.scss";
import SearchIcon from "../../../icons/SearchIcon";

type props = {
  onSearch: (key: string | null) => void;
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
        onSearch(!value ? null : value);
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
        icon={<SearchIcon width="20" height="20" />}
      />
    </div>
  );
};
