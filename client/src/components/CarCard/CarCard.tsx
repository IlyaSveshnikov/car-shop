import { FC } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Car } from "../../types/car";
import { useCartStore, useFavoritesStore } from "../../stores/context";
import { theme } from "../../styles/theme";
import { formatPriceFrom } from "../../utils/format";
import { HeartIcon } from "../icons/HeartIcon";

interface CarCardProps {
  car: Car;
}

/** Карточка автомобиля для каталога: фото-ссылка, цена, действия с корзиной и избранным. */
const CarCard: FC<CarCardProps> = observer(({ car }) => {
  const favoritesStore = useFavoritesStore();
  const cartStore = useCartStore();
  const isFavorite = favoritesStore.isFavorite(car.id);
  const isAvailable = car.availability;
  const inCart = cartStore.has(car.id);
  const href = `/cars/${car.id}`;

  return (
    <article css={styles.card}>
      <Link to={href} css={[styles.imageBox, !isAvailable && styles.imageBoxMuted]}>
        <img
          css={[styles.image, !isAvailable && styles.imageFaded]}
          src={car.img_src}
          alt={`${car.brand} ${car.model}`}
          loading="lazy"
        />
        {!isAvailable && <span css={styles.stockBadge}>Нет в наличии</span>}
        <span css={styles.badge}>{car.bodyType}</span>
      </Link>

      <Link to={href} css={styles.title}>
        {car.brand} {car.model}
      </Link>
      <p css={styles.meta}>
        {car.model_year} г.
        <span css={styles.dot} />
        {car.power} л.с.
        <span css={styles.dot} />
        {car.transmission}
      </p>
      <p css={styles.price}>{formatPriceFrom(car.priceValue)}</p>

      <div css={styles.actions}>
        {inCart ? (
          <Link to="/cart" css={[styles.buyButton, styles.inCartButton]}>
            В корзине
          </Link>
        ) : (
          <button
            type="button"
            css={[styles.buyButton, !isAvailable && styles.buyButtonDisabled]}
            disabled={!isAvailable}
            onClick={() => cartStore.add(car)}
          >
            {isAvailable ? "В корзину" : "Нет в наличии"}
          </button>
        )}
        <button
          type="button"
          css={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
          onClick={() => favoritesStore.toggle(car)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
          title={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
        >
          <HeartIcon filled={isFavorite} size={22} />
        </button>
      </div>
    </article>
  );
});

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.lg,
    transition: "box-shadow 0.2s ease, transform 0.2s ease",
    "&:hover": {
      boxShadow: theme.shadow.card,
      transform: "translateY(-2px)",
    },
  },
  imageBox: {
    position: "relative",
    display: "block",
    aspectRatio: "16 / 11",
    marginBottom: "16px",
    padding: "14px",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    overflow: "hidden",
  },
  imageBoxMuted: {
    backgroundColor: "#F2F2F5",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  imageFaded: {
    opacity: 0.35,
  },
  badge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    padding: "4px 10px",
    fontSize: "12px",
    fontWeight: 600,
    color: theme.colors.primary,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.pill,
    boxShadow: theme.shadow.card,
  },
  stockBadge: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "8px 18px",
    borderRadius: "8px",
    backgroundColor: theme.colors.text,
    color: theme.colors.surface,
    fontSize: "15px",
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
  title: {
    margin: "0 0 8px",
    fontSize: "18px",
    fontWeight: 700,
    color: theme.colors.text,
    textDecoration: "none",
    "&:hover": { color: theme.colors.primary },
  },
  meta: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "4px",
    margin: "0 0 12px",
    fontSize: "13px",
    color: theme.colors.textMuted,
  },
  dot: {
    display: "inline-block",
    width: "3px",
    height: "3px",
    margin: "0 4px",
    borderRadius: "50%",
    backgroundColor: theme.colors.border,
  },
  price: {
    margin: "0 0 16px",
    fontSize: "20px",
    fontWeight: 800,
    color: theme.colors.text,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "auto",
  },
  buyButton: {
    flex: 1,
    height: "44px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    fontWeight: 600,
    fontFamily: theme.font,
    color: theme.colors.surface,
    backgroundColor: theme.colors.primary,
    border: "none",
    borderRadius: theme.radius.md,
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color 0.2s ease",
    "&:hover": { backgroundColor: theme.colors.primaryHover },
  },
  inCartButton: {
    backgroundColor: theme.colors.success,
    "&:hover": { backgroundColor: "#178a4c" },
  },
  buyButtonDisabled: {
    backgroundColor: theme.colors.border,
    color: theme.colors.textMuted,
    cursor: "not-allowed",
    "&:hover": { backgroundColor: theme.colors.border },
  },
  favoriteButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "44px",
    height: "44px",
    flexShrink: 0,
    color: theme.colors.textMuted,
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    cursor: "pointer",
    transition: "color 0.2s ease, border-color 0.2s ease",
    "&:hover": { color: theme.colors.primary, borderColor: theme.colors.primary },
  },
  favoriteButtonActive: {
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
} as const;

export default CarCard;
