import { FC, FormEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../stores/context";
import { formatMoney } from "../../utils/format";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import StateMessage from "../../components/StateMessage/StateMessage";
import { theme } from "../../styles/theme";

interface FormValues {
  name: string;
  phone: string;
  email: string;
  contactMethod: string;
  comment: string;
}

type Errors = Partial<Record<keyof FormValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Укажите имя (минимум 2 символа)";
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10) errors.phone = "Введите корректный номер телефона";
  if (!EMAIL_RE.test(values.email.trim())) errors.email = "Введите корректный e-mail";
  return errors;
}

/** Оформление заказа: контактные данные, валидация и сводка корзины. */
const Checkout: FC = observer(() => {
  const cartStore = useCartStore();
  const navigate = useNavigate();

  const [values, setValues] = useState<FormValues>({
    name: "",
    phone: "",
    email: "",
    contactMethod: "phone",
    comment: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  if (cartStore.isEmpty) {
    return (
      <Container>
        <div css={styles.header}><h1 css={styles.title}>Оформление заказа</h1></div>
        <StateMessage
          title="Корзина пуста"
          description="Добавьте автомобиль, чтобы оформить заказ."
          action={<Button to="/catalog">Перейти в каталог</Button>}
        />
      </Container>
    );
  }

  const setField = (field: keyof FormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const orderId = `AH-${Math.floor(100000 + Math.random() * 900000)}`;
    const total = cartStore.totalPrice;
    const count = cartStore.count;
    cartStore.clear();
    navigate("/order/success", { state: { orderId, total, count, name: values.name } });
  };

  return (
    <Container>
      <div css={styles.header}>
        <h1 css={styles.title}>Оформление заказа</h1>
        <p css={styles.subtitle}>Заполните контактные данные — менеджер свяжется с вами для подтверждения</p>
      </div>

      <div css={styles.layout}>
        <form css={styles.form} onSubmit={handleSubmit} noValidate>
          <Field label="Имя и фамилия" error={errors.name}>
            <input css={inputStyle(!!errors.name)} value={values.name} onChange={setField("name")} placeholder="Иван Иванов" />
          </Field>
          <div css={styles.two}>
            <Field label="Телефон" error={errors.phone}>
              <input css={inputStyle(!!errors.phone)} value={values.phone} onChange={setField("phone")} placeholder="+7 900 000-00-00" inputMode="tel" />
            </Field>
            <Field label="E-mail" error={errors.email}>
              <input css={inputStyle(!!errors.email)} value={values.email} onChange={setField("email")} placeholder="you@example.com" inputMode="email" />
            </Field>
          </div>
          <Field label="Удобный способ связи">
            <select css={inputStyle(false)} value={values.contactMethod} onChange={setField("contactMethod")}>
              <option value="phone">Телефонный звонок</option>
              <option value="whatsapp">WhatsApp / Telegram</option>
              <option value="email">E-mail</option>
            </select>
          </Field>
          <Field label="Комментарий к заказу">
            <textarea
              css={[inputStyle(false), { height: "110px", padding: "12px 14px", resize: "vertical" }]}
              value={values.comment}
              onChange={setField("comment")}
              placeholder="Пожелания по комплектации, время для звонка и т.п."
            />
          </Field>

          <Button type="submit" size="lg">Подтвердить заказ</Button>
          <p css={styles.disclaimer}>
            Нажимая «Подтвердить заказ», вы соглашаетесь на обработку персональных данных.
            Это демо-магазин — оплата не производится.
          </p>
        </form>

        <aside css={styles.summary}>
          <h2 css={styles.summaryTitle}>Ваш заказ</h2>
          {cartStore.list.map((item) => (
            <div key={item.car.id} css={styles.summaryItem}>
              <span css={styles.summaryItemName}>
                {item.car.brand} {item.car.model}
                {item.qty > 1 && <span css={styles.summaryQty}> × {item.qty}</span>}
              </span>
              <span>{formatMoney(item.car.priceValue * item.qty)}</span>
            </div>
          ))}
          <div css={styles.summaryTotal}>
            <span>К оплате</span>
            <span>{formatMoney(cartStore.totalPrice)}</span>
          </div>
        </aside>
      </div>
    </Container>
  );
});

const Field: FC<{ label: string; error?: string; children: React.ReactNode }> = ({ label, error, children }) => (
  <label css={styles.field}>
    <span css={styles.label}>{label}</span>
    {children}
    {error && <span css={styles.error}>{error}</span>}
  </label>
);

const inputStyle = (hasError: boolean) =>
  ({
    width: "100%",
    height: "48px",
    padding: "0 14px",
    fontSize: "15px",
    fontFamily: theme.font,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    border: `1px solid ${hasError ? theme.colors.danger : theme.colors.border}`,
    borderRadius: theme.radius.md,
    outline: "none",
    "&:focus": { borderColor: theme.colors.primary },
  }) as const;

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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "28px",
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.lg,
  },
  two: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    "@media (max-width: 520px)": { gridTemplateColumns: "1fr" },
  },
  field: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "14px", fontWeight: 600, color: theme.colors.text },
  error: { fontSize: "13px", color: theme.colors.danger },
  disclaimer: { margin: 0, fontSize: "13px", lineHeight: 1.5, color: theme.colors.textMuted },
  summary: {
    position: "sticky",
    top: "88px",
    padding: "24px",
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.lg,
  },
  summaryTitle: { margin: "0 0 18px", fontSize: "20px", fontWeight: 800, color: theme.colors.text },
  summaryItem: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    padding: "10px 0",
    fontSize: "14px",
    color: theme.colors.text,
  },
  summaryItemName: { color: theme.colors.textMuted },
  summaryQty: { color: theme.colors.text, fontWeight: 600 },
  summaryTotal: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
    paddingTop: "16px",
    borderTop: `1px solid ${theme.colors.border}`,
    fontSize: "20px",
    fontWeight: 800,
    color: theme.colors.text,
  },
} as const;

export default Checkout;
