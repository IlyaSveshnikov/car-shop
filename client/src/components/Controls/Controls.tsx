import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useCarsStore } from "../../stores/context";
import { SortMode } from "../../types/car";
import { theme } from "../../styles/theme";
import { SortIcon } from "../icons/SortIcon";
import { SearchIcon } from "../icons/SearchIcon";

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "availability", label: "Сначала в наличии" },
  { value: "name_asc", label: "По имени (A-Z)" },
  { value: "name_desc", label: "По имени (Z-A)" },
  { value: "year_desc", label: "Сначала новее" },
  { value: "year_asc", label: "Сначала старше" },
  { value: "price_asc", label: "Сначала дешевле" },
  { value: "price_desc", label: "Сначала дороже" },
];

/** Верхняя панель каталога: поиск (слева) и сортировка (справа). */
const Controls: FC = observer(() => {
  const carsStore = useCarsStore();
  // Локальное состояние ввода, чтобы поле не «прыгало» при дебаунсе в сторе.
  const [query, setQuery] = useState(carsStore.filters.search);

  useEffect(() => {
    setQuery(carsStore.filters.search);
  }, [carsStore.filters.search]);

  return (
    <div css={styles.container}>
      <div css={styles.search}>
        <span css={styles.searchIcon}>
          <SearchIcon />
        </span>
        <input
          css={styles.searchInput}
          type="search"
          placeholder="Поиск по марке или модели"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            carsStore.setSearch(event.target.value);
          }}
          aria-label="Поиск по марке или модели"
        />
      </div>

      <div css={styles.sort}>
        <span css={styles.sortIcon}>
          <SortIcon />
        </span>
        <select
          css={styles.select}
          value={carsStore.sortMode}
          onChange={(event) => carsStore.setSortMode(event.target.value as SortMode)}
          aria-label="Сортировка списка"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  search: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: 1,
    minWidth: "220px",
    height: "46px",
    padding: "0 16px",
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    "&:focus-within": { borderColor: theme.colors.primary },
  },
  searchIcon: { display: "flex", color: theme.colors.textMuted },
  searchInput: {
    flex: 1,
    minWidth: 0,
    fontSize: "15px",
    fontFamily: theme.font,
    color: theme.colors.text,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    "&::placeholder": { color: theme.colors.textMuted },
  },
  sort: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: theme.colors.text,
  },
  sortIcon: { display: "flex", color: theme.colors.textMuted },
  select: {
    height: "46px",
    padding: "0 14px",
    fontSize: "15px",
    fontFamily: theme.font,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    cursor: "pointer",
    outline: "none",
    "&:focus": { borderColor: theme.colors.primary },
  },
} as const;

export default Controls;
