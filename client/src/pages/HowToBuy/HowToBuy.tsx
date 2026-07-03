import { FC } from "react";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import { theme } from "../../styles/theme";

const STEPS = [
  {
    n: "01",
    title: "Выберите автомобиль",
    text: "Используйте фильтры каталога по марке, цене, году и типу кузова. В карточке — честные характеристики, комплектация и фотографии.",
  },
  {
    n: "02",
    title: "Добавьте в корзину и оставьте заявку",
    text: "Забронируйте автомобиль и оформите заказ. Менеджер свяжется с вами, ответит на вопросы и при желании запишет на тест-драйв.",
  },
  {
    n: "03",
    title: "Выберите способ оплаты",
    text: "Полная оплата, trade-in вашего авто в зачёт или кредит от банков-партнёров по ставке от 4.9%. Поможем подобрать оптимальный вариант.",
  },
  {
    n: "04",
    title: "Оформление и проверка",
    text: "Готовим договор, страховку и полный пакет документов. Автомобиль проходит финальную предпродажную подготовку.",
  },
  {
    n: "05",
    title: "Получите ключи",
    text: "Забирайте автомобиль в салоне или закажите доставку до двери. Дальше — сервисное сопровождение и поддержка.",
  },
];

const FAQ = [
  {
    q: "Можно ли сдать свой автомобиль в trade-in?",
    a: "Да. Оценим вашу машину по рынку за 30 минут и зачтём её стоимость в счёт покупки новой.",
  },
  {
    q: "Доступен ли кредит и рассрочка?",
    a: "Мы работаем с банками-партнёрами и предлагаем кредит от 4.9%. Заявку можно оформить прямо в салоне.",
  },
  {
    q: "Есть ли гарантия?",
    a: "На новые автомобили действует гарантия производителя. Каждое авто проходит проверку по 120+ пунктам.",
  },
  {
    q: "Возможна ли доставка в другой город?",
    a: "Да, организуем доставку автомобиля по всей России транспортной компанией или собственным автовозом.",
  },
];

/** Страница «Как купить»: пошаговый процесс покупки и частые вопросы. */
const HowToBuy: FC = () => (
  <Container>
    <div css={styles.header}>
      <h1 css={styles.title}>Как проходит покупка</h1>
      <p css={styles.subtitle}>
        Пять простых шагов от выбора автомобиля до ключей в руках — с сопровождением на каждом этапе.
      </p>
    </div>

    <div css={styles.steps}>
      {STEPS.map((step) => (
        <div key={step.n} css={styles.step}>
          <span css={styles.stepNum}>{step.n}</span>
          <div>
            <h2 css={styles.stepTitle}>{step.title}</h2>
            <p css={styles.stepText}>{step.text}</p>
          </div>
        </div>
      ))}
    </div>

    <section css={styles.faq}>
      <h2 css={styles.faqTitle}>Частые вопросы</h2>
      <div css={styles.faqList}>
        {FAQ.map((item) => (
          <div key={item.q} css={styles.faqItem}>
            <h3 css={styles.faqQ}>{item.q}</h3>
            <p css={styles.faqA}>{item.a}</p>
          </div>
        ))}
      </div>
    </section>

    <section css={styles.cta}>
      <div>
        <h2 css={styles.ctaTitle}>Остались вопросы?</h2>
        <p css={styles.ctaText}>Начните с каталога — а менеджер поможет с выбором и оформлением.</p>
      </div>
      <Button to="/catalog" size="lg" variant="dark">Перейти в каталог</Button>
    </section>
  </Container>
);

const styles = {
  header: { padding: "48px 0 36px", maxWidth: "720px" },
  title: {
    margin: 0,
    fontSize: "clamp(28px, 4vw, 44px)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: theme.colors.text,
  },
  subtitle: { margin: "12px 0 0", fontSize: "18px", lineHeight: 1.6, color: theme.colors.textMuted },
  steps: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "820px",
  },
  step: {
    display: "flex",
    gap: "24px",
    padding: "28px",
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.lg,
  },
  stepNum: {
    flexShrink: 0,
    fontSize: "28px",
    fontWeight: 800,
    color: theme.colors.primaryLight,
  },
  stepTitle: { margin: "0 0 8px", fontSize: "20px", fontWeight: 700, color: theme.colors.text },
  stepText: { margin: 0, fontSize: "15px", lineHeight: 1.6, color: theme.colors.textMuted },
  faq: { padding: "72px 0 0" },
  faqTitle: {
    margin: "0 0 28px",
    fontSize: "clamp(24px, 3vw, 34px)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: theme.colors.text,
  },
  faqList: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    "@media (max-width: 780px)": { gridTemplateColumns: "1fr" },
  },
  faqItem: {
    padding: "24px",
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.lg,
  },
  faqQ: { margin: "0 0 10px", fontSize: "17px", fontWeight: 700, color: theme.colors.text },
  faqA: { margin: 0, fontSize: "15px", lineHeight: 1.6, color: theme.colors.textMuted },
  cta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "24px",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "72px 0 40px",
    padding: "40px 48px",
    background: `linear-gradient(120deg, ${theme.colors.primary}, ${theme.colors.primaryLight})`,
    borderRadius: theme.radius.xl,
  },
  ctaTitle: { margin: "0 0 8px", fontSize: "26px", fontWeight: 800, color: theme.colors.surface },
  ctaText: { margin: 0, fontSize: "16px", color: "rgba(255,255,255,0.85)" },
} as const;

export default HowToBuy;
