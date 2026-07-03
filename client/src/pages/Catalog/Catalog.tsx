import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useCarsStore } from "../../stores/context";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import Controls from "../../components/Controls/Controls";
import Filters from "../../components/Filters/Filters";
import CarList from "../../components/CarList/CarList";
import StateMessage from "../../components/StateMessage/StateMessage";
import { CarGridSkeleton } from "../../components/ui/Skeleton";
import { pluralizeCars } from "../../utils/format";
import { theme } from "../../styles/theme";

/** Каталог: фильтры сбоку, поиск и сортировка сверху, сетка с пагинацией. */
const Catalog: FC = observer(() => {
  const carsStore = useCarsStore();

  useEffect(() => {
    carsStore.init();
  }, [carsStore]);

  return (
    <Container>
      <div css={styles.header}>
        <h1 css={styles.title}>Каталог автомобилей</h1>
        <p css={styles.subtitle}>
          {carsStore.isLoading
            ? "Загружаем…"
            : `${carsStore.total} ${pluralizeCars(carsStore.total)} по вашему запросу`}
        </p>
      </div>

      <div css={styles.layout}>
        <Filters />

        <div css={styles.main}>
          <Controls />

          {carsStore.error ? (
            <StateMessage
              title="Не удалось загрузить каталог"
              description={carsStore.error}
              action={
                <Button onClick={() => carsStore.reload()}>Попробовать снова</Button>
              }
            />
          ) : carsStore.isLoading ? (
            <div css={styles.grid}>
              <CarGridSkeleton count={6} />
            </div>
          ) : carsStore.cars.length === 0 ? (
            <StateMessage
              title="Ничего не найдено"
              description="Попробуйте ослабить фильтры или изменить запрос."
              action={
                carsStore.activeFilterCount > 0 ? (
                  <Button variant="secondary" onClick={() => carsStore.resetFilters()}>
                    Сбросить фильтры
                  </Button>
                ) : undefined
              }
            />
          ) : (
            <div css={styles.grid}>
              <CarList cars={carsStore.cars} />

              {carsStore.hasMore && (
                <div css={styles.more}>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => carsStore.loadMore()}
                    disabled={carsStore.isLoadingMore}
                  >
                    {carsStore.isLoadingMore
                      ? "Загружаем…"
                      : `Показать ещё (${carsStore.total - carsStore.cars.length})`}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
});

const styles = {
  header: { padding: "40px 0 28px" },
  title: {
    margin: 0,
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: theme.colors.text,
  },
  subtitle: { margin: "8px 0 0", fontSize: "16px", color: theme.colors.textMuted },
  layout: {
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    gap: "32px",
    paddingBottom: "40px",
    "@media (max-width: 980px)": { gridTemplateColumns: "1fr" },
  },
  main: { minWidth: 0, display: "flex", flexDirection: "column", gap: "24px" },
  grid: { display: "flex", flexDirection: "column", gap: "36px" },
  more: { display: "flex", justifyContent: "center" },
} as const;

export default Catalog;
