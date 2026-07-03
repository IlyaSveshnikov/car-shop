import { FC } from "react";
import { useLocation } from "react-router-dom";
import { formatMoney } from "../../utils/format";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import { CheckIcon } from "../../components/icons/CheckIcon";
import { theme } from "../../styles/theme";

interface OrderState {
  orderId?: string;
  total?: number;
  count?: number;
  name?: string;
}

const STEPS = [
  "Менеджер свяжется с вами в течение 15 минут для подтверждения.",
  "Согласуем комплектацию, способ оплаты и дату выдачи.",
  "Готовим автомобиль и документы — вам остаётся забрать ключи.",
];

/** Экран успешного оформления заказа. */
const OrderSuccess: FC = () => {
  const state = (useLocation().state ?? {}) as OrderState;
  const orderId = state.orderId ?? "AH-000000";

  return (
    <Container>
      <div css={styles.wrapper}>
        <span css={styles.badge}><CheckIcon size={34} /></span>
        <h1 css={styles.title}>
          {state.name ? `${state.name}, спасибо за заказ!` : "Спасибо за заказ!"}
        </h1>
        <p css={styles.subtitle}>
          Заказ <strong css={styles.orderId}>№ {orderId}</strong> принят и передан менеджеру.
        </p>

        {(state.count || state.total) && (
          <div css={styles.receipt}>
            {state.count != null && (
              <div css={styles.receiptRow}>
                <span>Автомобилей в заказе</span>
                <span>{state.count}</span>
              </div>
            )}
            {state.total != null && (
              <div css={[styles.receiptRow, styles.receiptTotal]}>
                <span>Сумма заказа</span>
                <span>{formatMoney(state.total)}</span>
              </div>
            )}
          </div>
        )}

        <div css={styles.steps}>
          <h2 css={styles.stepsTitle}>Что дальше</h2>
          <ol css={styles.stepsList}>
            {STEPS.map((step, i) => (
              <li key={i} css={styles.step}>
                <span css={styles.stepNum}>{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div css={styles.actions}>
          <Button to="/catalog" size="lg">Вернуться в каталог</Button>
          <Button to="/" size="lg" variant="secondary">На главную</Button>
        </div>
      </div>
    </Container>
  );
};

const styles = {
  wrapper: {
    maxWidth: "560px",
    margin: "0 auto",
    padding: "64px 0 48px",
    textAlign: "center",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "72px",
    height: "72px",
    marginBottom: "24px",
    color: theme.colors.surface,
    backgroundColor: theme.colors.success,
    borderRadius: "50%",
  },
  title: { margin: "0 0 12px", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 800, color: theme.colors.text },
  subtitle: { margin: "0 0 28px", fontSize: "17px", color: theme.colors.textMuted },
  orderId: { color: theme.colors.primary },
  receipt: {
    padding: "20px 24px",
    marginBottom: "28px",
    textAlign: "left",
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.lg,
  },
  receiptRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    fontSize: "15px",
    color: theme.colors.textMuted,
  },
  receiptTotal: {
    marginTop: "8px",
    paddingTop: "16px",
    borderTop: `1px solid ${theme.colors.border}`,
    fontSize: "18px",
    fontWeight: 800,
    color: theme.colors.text,
  },
  steps: {
    padding: "24px",
    marginBottom: "32px",
    textAlign: "left",
    backgroundColor: theme.colors.primarySoft,
    borderRadius: theme.radius.lg,
  },
  stepsTitle: { margin: "0 0 16px", fontSize: "17px", fontWeight: 700, color: theme.colors.text },
  stepsList: { listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", margin: 0, padding: 0 },
  step: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    fontSize: "15px",
    lineHeight: 1.5,
    color: theme.colors.text,
  },
  stepNum: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "24px",
    height: "24px",
    fontSize: "13px",
    fontWeight: 700,
    color: theme.colors.surface,
    backgroundColor: theme.colors.primary,
    borderRadius: "50%",
  },
  actions: { display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" },
} as const;

export default OrderSuccess;
