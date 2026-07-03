import { FC } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useCartStore } from "../../stores/context";
import { CartItem } from "../../stores/CartStore";
import { formatMoney } from "../../utils/format";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import StateMessage from "../../components/StateMessage/StateMessage";
import { TrashIcon } from "../../components/icons/TrashIcon";
import { theme } from "../../styles/theme";

/** Страница корзины: позиции с количеством и итоговая стоимость. */
const Cart: FC = observer(() => {
  const cartStore = useCartStore();

  if (cartStore.isEmpty) {
    return (
      <Container>
        <div css={styles.header}>
          <h1 css={styles.title}>Корзина</h1>
        </div>
        <StateMessage
          title="В корзине пока пусто"
          description="Добавьте автомобиль из каталога, чтобы оформить заказ."
          action={<Button to="/catalog">Перейти в каталог</Button>}
        />
      </Container>
    );
  }

  return (
    <Container>
      <div css={styles.header}>
        <h1 css={styles.title}>Корзина</h1>
        <p css={styles.subtitle}>{cartStore.count} шт. на сумму {formatMoney(cartStore.totalPrice)}</p>
      </div>

      <div css={styles.layout}>
        <div css={styles.items}>
          {cartStore.list.map((item) => (
            <CartRow key={item.car.id} item={item} />
          ))}
        </div>

        <aside css={styles.summary}>
          <h2 css={styles.summaryTitle}>Итого</h2>
          <div css={styles.summaryRow}>
            <span>Автомобилей</span>
            <span>{cartStore.count}</span>
          </div>
          <div css={styles.summaryRow}>
            <span>Стоимость</span>
            <span>{formatMoney(cartStore.totalPrice)}</span>
          </div>
          <div css={styles.summaryTotal}>
            <span>К оплате</span>
            <span>{formatMoney(cartStore.totalPrice)}</span>
          </div>
          <Button to="/checkout" size="lg" fullWidth>Оформить заказ</Button>
          <Link to="/catalog" css={styles.continue}>← Продолжить покупки</Link>
        </aside>
      </div>
    </Container>
  );
});

const CartRow: FC<{ item: CartItem }> = observer(({ item }) => {
  const cartStore = useCartStore();
  const { car, qty } = item;

  return (
    <article css={styles.row}>
      <Link to={`/cars/${car.id}`} css={styles.imageBox}>
        <img css={styles.image} src={car.img_src} alt={`${car.brand} ${car.model}`} />
      </Link>

      <div css={styles.info}>
        <Link to={`/cars/${car.id}`} css={styles.name}>{car.brand} {car.model}</Link>
        <p css={styles.meta}>{car.model_year} г. · {car.bodyType} · {car.transmission}</p>
        <p css={styles.unitPrice}>{formatMoney(car.priceValue)}</p>
      </div>

      <div css={styles.controls}>
        <div css={styles.stepper}>
          <button css={styles.stepBtn} onClick={() => cartStore.setQty(car.id, qty - 1)} aria-label="Уменьшить">−</button>
          <span css={styles.qty}>{qty}</span>
          <button css={styles.stepBtn} onClick={() => cartStore.setQty(car.id, qty + 1)} aria-label="Увеличить">+</button>
        </div>
        <span css={styles.linePrice}>{formatMoney(car.priceValue * qty)}</span>
        <button
          css={styles.remove}
          onClick={() => cartStore.remove(car.id)}
          aria-label="Удалить из корзины"
          title="Удалить из корзины"
        >
          <TrashIcon />
        </button>
      </div>
    </article>
  );
});

const styles = {
  header: { padding: "40px 0 28px" },
  title: { margin: 0, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", color: theme.colors.text },
  subtitle: { margin: "8px 0 0", fontSize: "16px", color: theme.colors.textMuted },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 340px",
    gap: "32px",
    paddingBottom: "40px",
    alignItems: "start",
    "@media (max-width: 900px)": { gridTemplateColumns: "1fr" },
  },
  items: { display: "flex", flexDirection: "column", gap: "16px" },
  row: {
    display: "grid",
    gridTemplateColumns: "140px 1fr auto",
    gap: "20px",
    alignItems: "center",
    padding: "16px",
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.lg,
    "@media (max-width: 560px)": { gridTemplateColumns: "100px 1fr", gridTemplateRows: "auto auto" },
  },
  imageBox: {
    display: "block",
    aspectRatio: "16 / 11",
    padding: "10px",
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.md,
  },
  image: { width: "100%", height: "100%", objectFit: "contain" },
  info: { minWidth: 0 },
  name: { fontSize: "18px", fontWeight: 700, color: theme.colors.text, textDecoration: "none", "&:hover": { color: theme.colors.primary } },
  meta: { margin: "6px 0", fontSize: "13px", color: theme.colors.textMuted },
  unitPrice: { margin: 0, fontSize: "15px", fontWeight: 600, color: theme.colors.textMuted },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    "@media (max-width: 560px)": { gridColumn: "1 / -1", justifyContent: "space-between" },
  },
  stepper: {
    display: "flex",
    alignItems: "center",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    overflow: "hidden",
  },
  stepBtn: {
    width: "38px",
    height: "40px",
    fontSize: "18px",
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    border: "none",
    cursor: "pointer",
    "&:hover": { backgroundColor: theme.colors.primarySoft, color: theme.colors.primary },
  },
  qty: { width: "40px", textAlign: "center", fontSize: "15px", fontWeight: 600 },
  linePrice: { minWidth: "110px", textAlign: "right", fontSize: "18px", fontWeight: 800, color: theme.colors.text },
  remove: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    color: theme.colors.danger,
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    cursor: "pointer",
    "&:hover": { backgroundColor: "rgba(229, 72, 77, 0.08)", borderColor: theme.colors.danger },
  },
  summary: {
    position: "sticky",
    top: "88px",
    padding: "24px",
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.lg,
  },
  summaryTitle: { margin: "0 0 18px", fontSize: "20px", fontWeight: 800, color: theme.colors.text },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    fontSize: "15px",
    color: theme.colors.textMuted,
  },
  summaryTotal: {
    display: "flex",
    justifyContent: "space-between",
    margin: "8px 0 20px",
    paddingTop: "16px",
    borderTop: `1px solid ${theme.colors.border}`,
    fontSize: "20px",
    fontWeight: 800,
    color: theme.colors.text,
  },
  continue: {
    display: "block",
    marginTop: "14px",
    textAlign: "center",
    fontSize: "14px",
    color: theme.colors.textMuted,
    textDecoration: "none",
    "&:hover": { color: theme.colors.primary },
  },
} as const;

export default Cart;
