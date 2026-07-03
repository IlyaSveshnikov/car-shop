import { FC } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Car } from "../../types/car";
import { useCartStore, useFavoritesStore } from "../../stores/context";
import { theme } from "../../styles/theme";
import { formatMoney } from "../../utils/format";
import Button from "../ui/Button";
import { TrashIcon } from "../icons/TrashIcon";

interface FavoriteItemProps {
  car: Car;
}

/** Строка списка «Избранное»: фото слева, характеристики и действия справа. */
const FavoriteItem: FC<FavoriteItemProps> = observer(({ car }) => {
  const favoritesStore = useFavoritesStore();
  const cartStore = useCartStore();
  const inCart = cartStore.has(car.id);

  return (
    <article css={styles.row}>
      <Link to={`/cars/${car.id}`} css={styles.imageBox}>
        <img
          css={styles.image}
          src={car.img_src}
          alt={`${car.brand} ${car.model}`}
          loading="lazy"
        />
      </Link>

      <div css={styles.details}>
        <Link to={`/cars/${car.id}`} css={styles.title}>
          {car.brand} {car.model}
        </Link>
        {car.description && <p css={styles.description}>{car.description}</p>}
        <p css={styles.meta}>
          {car.model_year} г. · {car.bodyType} · {car.power} л.с. · {car.color}
        </p>
        <p css={styles.price}>{formatMoney(car.priceValue)}</p>

        <div css={styles.actions}>
          {inCart ? (
            <Button to="/cart" variant="ghost">В корзине</Button>
          ) : (
            <Button
              disabled={!car.availability}
              onClick={() => cartStore.add(car)}
            >
              {car.availability ? "В корзину" : "Нет в наличии"}
            </Button>
          )}
          <button
            type="button"
            css={styles.deleteButton}
            onClick={() => favoritesStore.remove(car.id)}
            aria-label="Удалить из избранного"
            title="Удалить из избранного"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </article>
  );
});

const styles = {
  row: {
    display: "flex",
    gap: "32px",
    padding: "24px",
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.lg,
    "@media (max-width: 640px)": { flexDirection: "column", gap: "20px" },
  },
  imageBox: {
    flexShrink: 0,
    display: "block",
    width: "340px",
    maxWidth: "38%",
    aspectRatio: "16 / 10",
    padding: "20px",
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.md,
    "@media (max-width: 640px)": { width: "100%", maxWidth: "100%" },
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minWidth: 0,
  },
  title: {
    margin: "0 0 14px",
    fontSize: "26px",
    fontWeight: 700,
    color: theme.colors.text,
    textDecoration: "none",
    "&:hover": { color: theme.colors.primary },
  },
  description: {
    margin: "0 0 16px",
    fontSize: "15px",
    lineHeight: 1.55,
    color: theme.colors.textMuted,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  meta: {
    margin: "0 0 12px",
    fontSize: "14px",
    color: theme.colors.textMuted,
  },
  price: {
    margin: "0 0 20px",
    fontSize: "26px",
    fontWeight: 800,
    color: theme.colors.text,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginTop: "auto",
  },
  deleteButton: {
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colors.danger,
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    cursor: "pointer",
    transition: "background-color 0.2s ease, border-color 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(229, 72, 77, 0.08)",
      borderColor: theme.colors.danger,
    },
  },
} as const;

export default FavoriteItem;
