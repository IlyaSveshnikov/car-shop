import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useCarsStore } from "../../stores/context";
import { theme } from "../../styles/theme";

/** Боковая панель фильтров каталога. Значения берутся из фасетов сервера. */
const Filters: FC = observer(() => {
  const carsStore = useCarsStore();
  const facets = carsStore.facets;
  const { filters } = carsStore;

  if (!facets) return null;

  return (
    <aside css={styles.panel}>
      <div css={styles.head}>
        <h2 css={styles.heading}>Фильтры</h2>
        {carsStore.activeFilterCount > 0 && (
          <button css={styles.reset} onClick={() => carsStore.resetFilters()}>
            Сбросить ({carsStore.activeFilterCount})
          </button>
        )}
      </div>

      <label css={styles.availabilityRow}>
        <input
          type="checkbox"
          checked={filters.onlyAvailable}
          onChange={(e) => carsStore.setOnlyAvailable(e.target.checked)}
        />
        Только в наличии
      </label>

      <CheckboxGroup
        title="Марка"
        options={facets.brands}
        selected={filters.brands}
        onToggle={(value) => carsStore.toggleInArray("brands", value)}
      />
      <CheckboxGroup
        title="Тип кузова"
        options={facets.bodyTypes}
        selected={filters.bodyTypes}
        onToggle={(value) => carsStore.toggleInArray("bodyTypes", value)}
      />
      <CheckboxGroup
        title="Топливо"
        options={facets.fuelTypes}
        selected={filters.fuelTypes}
        onToggle={(value) => carsStore.toggleInArray("fuelTypes", value)}
      />

      <RangeGroup
        title="Цена, $"
        min={facets.minPrice}
        max={facets.maxPrice}
        valueMin={filters.priceMin}
        valueMax={filters.priceMax}
        onCommit={(lo, hi) => carsStore.setPriceRange(lo, hi)}
      />
      <RangeGroup
        title="Год выпуска"
        min={facets.minYear}
        max={facets.maxYear}
        valueMin={filters.yearMin}
        valueMax={filters.yearMax}
        onCommit={(lo, hi) => carsStore.setYearRange(lo, hi)}
      />
    </aside>
  );
});

const CheckboxGroup: FC<{
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}> = ({ title, options, selected, onToggle }) => (
  <div css={styles.group}>
    <h3 css={styles.groupTitle}>{title}</h3>
    <div css={styles.options}>
      {options.map((option) => (
        <label key={option} css={styles.option}>
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onToggle(option)}
          />
          {option}
        </label>
      ))}
    </div>
  </div>
);

const RangeGroup: FC<{
  title: string;
  min: number;
  max: number;
  valueMin: number | null;
  valueMax: number | null;
  onCommit: (min: number | null, max: number | null) => void;
}> = ({ title, min, max, valueMin, valueMax, onCommit }) => {
  const [lo, setLo] = useState(valueMin?.toString() ?? "");
  const [hi, setHi] = useState(valueMax?.toString() ?? "");

  useEffect(() => setLo(valueMin?.toString() ?? ""), [valueMin]);
  useEffect(() => setHi(valueMax?.toString() ?? ""), [valueMax]);

  const commit = () => {
    const parsedLo = lo.trim() === "" ? null : Number(lo);
    const parsedHi = hi.trim() === "" ? null : Number(hi);
    onCommit(
      parsedLo != null && !Number.isNaN(parsedLo) ? parsedLo : null,
      parsedHi != null && !Number.isNaN(parsedHi) ? parsedHi : null
    );
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
  };

  return (
    <div css={styles.group}>
      <h3 css={styles.groupTitle}>{title}</h3>
      <div css={styles.rangeRow}>
        <input
          css={styles.rangeInput}
          type="number"
          inputMode="numeric"
          placeholder={`от ${min.toLocaleString("ru-RU")}`}
          value={lo}
          onChange={(e) => setLo(e.target.value)}
          onBlur={commit}
          onKeyDown={onKeyDown}
          aria-label={`${title}: от`}
        />
        <span css={styles.rangeDash}>—</span>
        <input
          css={styles.rangeInput}
          type="number"
          inputMode="numeric"
          placeholder={`до ${max.toLocaleString("ru-RU")}`}
          value={hi}
          onChange={(e) => setHi(e.target.value)}
          onBlur={commit}
          onKeyDown={onKeyDown}
          aria-label={`${title}: до`}
        />
      </div>
    </div>
  );
};

const styles = {
  panel: {
    alignSelf: "start",
    padding: "24px",
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.lg,
    "@media (min-width: 981px)": {
      position: "sticky",
      top: "88px",
    },
  },
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "18px",
  },
  heading: { margin: 0, fontSize: "18px", fontWeight: 700, color: theme.colors.text },
  reset: {
    padding: 0,
    fontSize: "13px",
    fontFamily: theme.font,
    color: theme.colors.primary,
    background: "none",
    border: "none",
    cursor: "pointer",
    "&:hover": { textDecoration: "underline" },
  },
  availabilityRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
    paddingBottom: "20px",
    borderBottom: `1px solid ${theme.colors.border}`,
    fontSize: "15px",
    fontWeight: 500,
    color: theme.colors.text,
    cursor: "pointer",
  },
  group: {
    marginBottom: "22px",
  },
  groupTitle: {
    margin: "0 0 12px",
    fontSize: "14px",
    fontWeight: 700,
    color: theme.colors.text,
  },
  options: { display: "flex", flexDirection: "column", gap: "10px" },
  option: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    color: theme.colors.textMuted,
    cursor: "pointer",
  },
  rangeRow: { display: "flex", alignItems: "center", gap: "8px" },
  rangeInput: {
    width: "100%",
    minWidth: 0,
    height: "40px",
    padding: "0 12px",
    fontSize: "14px",
    fontFamily: theme.font,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.sm,
    outline: "none",
    "&:focus": { borderColor: theme.colors.primary },
  },
  rangeDash: { color: theme.colors.textMuted },
} as const;

export default Filters;
