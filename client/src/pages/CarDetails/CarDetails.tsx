import { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { fetchCar, fetchSimilarCars } from "../../api/cars";
import { useAsync } from "../../hooks/useAsync";
import { useCartStore, useFavoritesStore } from "../../stores/context";
import { Car } from "../../types/car";
import { formatMileage, formatMoney } from "../../utils/format";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import CarList from "../../components/CarList/CarList";
import StateMessage from "../../components/StateMessage/StateMessage";
import Skeleton from "../../components/ui/Skeleton";
import { HeartIcon } from "../../components/icons/HeartIcon";
import { CheckIcon } from "../../components/icons/CheckIcon";
import { theme } from "../../styles/theme";

const CarDetails: FC = observer(() => {
  const { id } = useParams<{ id: string }>();
  const carId = Number(id);

  const { data: car, loading, error } = useAsync(
    () => fetchCar(carId),
    [carId]
  );
  const { data: similar } = useAsync(() => fetchSimilarCars(carId), [carId]);

  if (loading) return <DetailsSkeleton />;

  if (error || !car) {
    return (
      <Container>
        <StateMessage
          title="Автомобиль не найден"
          description={error ?? "Возможно, он уже продан или ссылка устарела."}
          action={<Button to="/catalog">Вернуться в каталог</Button>}
        />
      </Container>
    );
  }

  return <CarView car={car} similar={similar ?? []} />;
});

const CarView: FC<{ car: Car; similar: Car[] }> = observer(({ car, similar }) => {
  const favoritesStore = useFavoritesStore();
  const cartStore = useCartStore();
  const isFavorite = favoritesStore.isFavorite(car.id);
  const inCart = cartStore.has(car.id);
  const [activeImage, setActiveImage] = useState(0);

  const specs: { label: string; value: string }[] = [
    { label: "Год выпуска", value: `${car.model_year}` },
    { label: "Состояние", value: car.condition },
    { label: "Пробег", value: formatMileage(car.mileage) },
    { label: "Тип кузова", value: car.bodyType },
    { label: "Двигатель", value: `${car.engineVolume} л` },
    { label: "Мощность", value: `${car.power} л.с.` },
    { label: "Коробка передач", value: car.transmission },
    { label: "Привод", value: car.drivetrain },
    { label: "Топливо", value: car.fuelType },
    { label: "Цвет", value: car.color },
  ];

  return (
    <Container>
      <nav css={styles.breadcrumbs}>
        <Link to="/" css={styles.crumb}>Главная</Link>
        <span css={styles.crumbSep}>/</span>
        <Link to="/catalog" css={styles.crumb}>Каталог</Link>
        <span css={styles.crumbSep}>/</span>
        <span>{car.brand} {car.model}</span>
      </nav>

      <div css={styles.top}>
        {/* Gallery */}
        <div css={styles.gallery}>
          <div css={styles.mainImageBox}>
            <img
              css={styles.mainImage}
              src={car.images[activeImage] ?? car.img_src}
              alt={`${car.brand} ${car.model}`}
            />
            {!car.availability && <span css={styles.soldBadge}>Нет в наличии</span>}
          </div>
          {car.images.length > 1 && (
            <div css={styles.thumbs}>
              {car.images.map((src, i) => (
                <button
                  key={i}
                  css={[styles.thumb, i === activeImage && styles.thumbActive]}
                  onClick={() => setActiveImage(i)}
                  aria-label={`Фото ${i + 1}`}
                >
                  <img css={styles.thumbImg} src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div css={styles.summary}>
          <span css={styles.badge}>{car.bodyType}</span>
          <h1 css={styles.title}>{car.brand} {car.model}</h1>
          <p css={styles.subtitle}>{car.model_year} г. · {car.color}</p>

          <div css={styles.chips}>
            <span css={styles.chip}>{car.power} л.с.</span>
            <span css={styles.chip}>{car.engineVolume} л</span>
            <span css={styles.chip}>{car.transmission}</span>
            <span css={styles.chip}>{car.drivetrain} привод</span>
          </div>

          <div css={styles.priceRow}>
            <span css={styles.price}>{formatMoney(car.priceValue)}</span>
            <span css={[styles.stockTag, car.availability ? styles.inStock : styles.outStock]}>
              {car.availability ? "● В наличии" : "○ Нет в наличии"}
            </span>
          </div>

          <div css={styles.actions}>
            {inCart ? (
              <Button to="/cart" size="lg" variant="ghost" fullWidth>
                Перейти в корзину
              </Button>
            ) : (
              <Button
                size="lg"
                fullWidth
                disabled={!car.availability}
                onClick={() => cartStore.add(car)}
              >
                {car.availability ? "Добавить в корзину" : "Нет в наличии"}
              </Button>
            )}
            <button
              css={[styles.favBtn, isFavorite && styles.favBtnActive]}
              onClick={() => favoritesStore.toggle(car)}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? "Убрать из избранного" : "В избранное"}
            >
              <HeartIcon filled={isFavorite} size={24} />
            </button>
          </div>

          <p css={styles.note}>
            Бесплатная проверка по VIN · Trade-in · Кредит от 4.9%
          </p>
        </div>
      </div>

      {/* Description + specs + features */}
      <div css={styles.details}>
        <div>
          <h2 css={styles.blockTitle}>Описание</h2>
          <p css={styles.description}>{car.description}</p>

          <h2 css={[styles.blockTitle, { marginTop: "36px" }]}>Комплектация</h2>
          <ul css={styles.features}>
            {car.features.map((feature) => (
              <li key={feature} css={styles.feature}>
                <span css={styles.featureIcon}><CheckIcon size={16} /></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 css={styles.blockTitle}>Характеристики</h2>
          <table css={styles.specTable}>
            <tbody>
              {specs.map((spec) => (
                <tr key={spec.label} css={styles.specRow}>
                  <td css={styles.specLabel}>{spec.label}</td>
                  <td css={styles.specValue}>{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <section css={styles.similar}>
          <h2 css={styles.blockTitle}>Похожие автомобили</h2>
          <div css={{ marginTop: "20px" }}>
            <CarList cars={similar} />
          </div>
        </section>
      )}
    </Container>
  );
});

const DetailsSkeleton: FC = () => (
  <Container>
    <div css={{ padding: "28px 0" }}>
      <Skeleton width="240px" height="16px" />
    </div>
    <div css={styles.top}>
      <Skeleton height="420px" radius={theme.radius.xl} />
      <div css={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <Skeleton width="60%" height="36px" />
        <Skeleton width="40%" height="18px" />
        <Skeleton width="50%" height="40px" />
        <Skeleton height="54px" radius={theme.radius.md} />
      </div>
    </div>
  </Container>
);

const styles = {
  breadcrumbs: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "8px",
    padding: "24px 0",
    fontSize: "14px",
    color: theme.colors.textMuted,
  },
  crumb: { color: theme.colors.textMuted, textDecoration: "none", "&:hover": { color: theme.colors.primary } },
  crumbSep: { color: theme.colors.border },
  top: {
    display: "grid",
    // minmax(0, …) не даёт колонке растягиваться до натуральной ширины картинки.
    gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
    gap: "40px",
    "@media (max-width: 900px)": { gridTemplateColumns: "1fr" },
  },
  gallery: { minWidth: 0, display: "flex", flexDirection: "column", gap: "16px" },
  mainImageBox: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    // Фиксированная адаптивная высота вместо aspect-ratio — картинка не может раздуться.
    height: "clamp(300px, 34vw, 440px)",
    padding: "28px",
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.xl,
  },
  mainImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "auto",
    objectFit: "contain",
  },
  soldBadge: {
    position: "absolute",
    top: "20px",
    right: "20px",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: 600,
    color: theme.colors.surface,
    backgroundColor: theme.colors.text,
    borderRadius: theme.radius.sm,
  },
  thumbs: { display: "flex", gap: "12px", flexWrap: "wrap" },
  thumb: {
    width: "88px",
    height: "66px",
    padding: "8px",
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    cursor: "pointer",
  },
  thumbActive: { borderColor: theme.colors.primary },
  thumbImg: { width: "100%", height: "100%", objectFit: "contain" },
  summary: { minWidth: 0, display: "flex", flexDirection: "column" },
  badge: {
    alignSelf: "flex-start",
    padding: "5px 12px",
    fontSize: "13px",
    fontWeight: 600,
    color: theme.colors.primary,
    backgroundColor: theme.colors.primarySoft,
    borderRadius: theme.radius.pill,
  },
  title: {
    margin: "16px 0 6px",
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: theme.colors.text,
  },
  subtitle: { margin: 0, fontSize: "16px", color: theme.colors.textMuted },
  chips: { display: "flex", flexWrap: "wrap", gap: "10px", margin: "24px 0" },
  chip: {
    padding: "8px 14px",
    fontSize: "14px",
    fontWeight: 500,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
  },
  priceRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px",
  },
  price: { fontSize: "36px", fontWeight: 800, color: theme.colors.text },
  stockTag: { fontSize: "14px", fontWeight: 600 },
  inStock: { color: theme.colors.success },
  outStock: { color: theme.colors.textMuted },
  actions: { display: "flex", gap: "12px", marginBottom: "16px" },
  favBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "54px",
    height: "54px",
    flexShrink: 0,
    color: theme.colors.textMuted,
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    cursor: "pointer",
    transition: "color 0.2s ease, border-color 0.2s ease",
    "&:hover": { color: theme.colors.primary, borderColor: theme.colors.primary },
  },
  favBtnActive: { color: theme.colors.primary, borderColor: theme.colors.primary },
  note: { margin: 0, fontSize: "13px", color: theme.colors.textMuted },
  details: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
    gap: "48px",
    padding: "56px 0",
    "@media (max-width: 900px)": { gridTemplateColumns: "1fr", gap: "32px" },
  },
  blockTitle: { margin: 0, fontSize: "24px", fontWeight: 800, color: theme.colors.text },
  description: {
    margin: "16px 0 0",
    fontSize: "16px",
    lineHeight: 1.7,
    color: theme.colors.textMuted,
  },
  features: {
    listStyle: "none",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    margin: "16px 0 0",
    padding: 0,
    "@media (max-width: 520px)": { gridTemplateColumns: "1fr" },
  },
  feature: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "15px",
    color: theme.colors.text,
  },
  featureIcon: {
    display: "flex",
    color: theme.colors.success,
    flexShrink: 0,
  },
  specTable: {
    width: "100%",
    marginTop: "16px",
    borderCollapse: "collapse",
  },
  specRow: { borderBottom: `1px solid ${theme.colors.border}` },
  specLabel: {
    padding: "12px 0",
    fontSize: "15px",
    color: theme.colors.textMuted,
    textAlign: "left",
    fontWeight: 400,
  },
  specValue: {
    padding: "12px 0",
    fontSize: "15px",
    fontWeight: 600,
    color: theme.colors.text,
    textAlign: "right",
  },
  similar: { paddingBottom: "40px" },
} as const;

export default CarDetails;
