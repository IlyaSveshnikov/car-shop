import { FC } from "react";
import { observer } from "mobx-react-lite";
import { useFavoritesStore } from "../../stores/context";
import { pluralizePositions } from "../../utils/format";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import FavoriteItem from "../../components/FavoriteItem/FavoriteItem";
import StateMessage from "../../components/StateMessage/StateMessage";
import { theme } from "../../styles/theme";

/** Страница «Избранное»: сохранённые автомобили в виде строк. */
const Favorites: FC = observer(() => {
  const favoritesStore = useFavoritesStore();
  const cars = favoritesStore.list;

  return (
    <Container>
      <div css={styles.header}>
        <h1 css={styles.title}>Избранное</h1>
        {cars.length > 0 && (
          <p css={styles.subtitle}>
            {cars.length} {pluralizePositions(cars.length)}
          </p>
        )}
      </div>

      {cars.length > 0 ? (
        <div css={styles.list}>
          {cars.map((car) => (
            <FavoriteItem key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <StateMessage
          title="В избранном пока пусто"
          description="Добавляйте автомобили в избранное, нажимая на сердечко в карточке."
          action={<Button to="/catalog">Перейти в каталог</Button>}
        />
      )}
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
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    paddingBottom: "40px",
  },
} as const;

export default Favorites;
