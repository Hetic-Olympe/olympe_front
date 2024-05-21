import { useEffect, useState } from "react";
import { Input } from "../../input";
import styles from "./searchInput.module.scss";

type props = {
  onSearch: ([key]: string) => void;
  initValue: string;
};

export const SearchInput = ({ onSearch, initValue }: props) => {
  const [input, setInput] = useState(initValue);

  const onChange = (value: string) => {
    setInput(value);
  };

  useEffect(() => {
    onSearch(input);
  }, [input, onSearch]);

  useEffect(() => {
    console.log("INIT INPUT", initValue);
  }, [initValue]);

  return (
    <Input
      placeholder="Search a country"
      className={styles.search_input}
      value={input}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
