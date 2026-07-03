import { FC } from "react";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import { theme } from "../../styles/theme";

const VALUES = [
  { title: "Прозрачность", text: "Показываем реальную историю авто, отчёт по VIN и честную цену без скрытых доплат." },
  { title: "Качество", text: "Каждый автомобиль проходит диагностику по 120+ пунктам перед продажей." },
  { title: "Забота", text: "Сопровождаем сделку от первого звонка до выдачи ключей и после неё." },
];

const STATS = [
  { value: "12 лет", label: "на автомобильном рынке" },
  { value: "8 500+", label: "довольных клиентов" },
  { value: "4.9 / 5", label: "средняя оценка" },
  { value: "48 часов", label: "средний срок сделки" },
];

/** Страница «О нас»: история, ценности и цифры компании. */
const About: FC = () => (
  <div>
    <section css={styles.hero}>
      <Container>
        <span css={styles.eyebrow}>О компании</span>
        <h1 css={styles.title}>AutoHub — автомобили, которым доверяют</h1>
        <p css={styles.lead}>
          Мы помогаем людям покупать автомобили спокойно и без рисков. С 2014 года
          подбираем проверенные машины премиум-брендов, берём на себя проверку,
          документы и подготовку — чтобы вам осталось только сесть за руль.
        </p>
        <Button to="/catalog" size="lg">Смотреть каталог</Button>
      </Container>
    </section>

    <Container>
      <div css={styles.statsGrid}>
        {STATS.map((stat) => (
          <div key={stat.label} css={styles.statCard}>
            <div css={styles.statValue}>{stat.value}</div>
            <div css={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      <section css={styles.block}>
        <h2 css={styles.blockTitle}>Наши ценности</h2>
        <div css={styles.valuesGrid}>
          {VALUES.map((value) => (
            <div key={value.title} css={styles.valueCard}>
              <h3 css={styles.valueTitle}>{value.title}</h3>
              <p css={styles.valueText}>{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section css={styles.storyBlock}>
        <h2 css={styles.blockTitle}>Как всё начиналось</h2>
        <p css={styles.story}>
          AutoHub вырос из небольшого семейного автосалона в Москве. Мы видели, как
          часто покупка машины превращается в стресс: непрозрачные цены, сомнительная
          история, давление менеджеров. Мы решили сделать иначе — построить салон,
          в который хочется вернуться и который советуют друзьям.
        </p>
        <p css={styles.story}>
          Сегодня это команда специалистов, собственный центр диагностики и сервис
          полного цикла: подбор, trade-in, кредит, страхование и постпродажная
          поддержка. Но принцип остался прежним — честность важнее сиюминутной сделки.
        </p>
      </section>
    </Container>
  </div>
);

const styles = {
  hero: {
    padding: "64px 0",
    background: `radial-gradient(900px 400px at 20% 0%, ${theme.colors.primarySoft}, transparent 60%), ${theme.colors.background}`,
  },
  eyebrow: {
    display: "inline-block",
    marginBottom: "16px",
    padding: "6px 14px",
    fontSize: "13px",
    fontWeight: 600,
    color: theme.colors.primary,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.pill,
    boxShadow: theme.shadow.card,
  },
  title: {
    margin: "0 0 20px",
    fontSize: "clamp(30px, 5vw, 48px)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: theme.colors.text,
    maxWidth: "760px",
  },
  lead: {
    margin: "0 0 32px",
    fontSize: "18px",
    lineHeight: 1.6,
    color: theme.colors.textMuted,
    maxWidth: "680px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "24px",
    marginTop: "-40px",
    "@media (max-width: 780px)": { gridTemplateColumns: "1fr 1fr" },
  },
  statCard: {
    padding: "26px",
    textAlign: "center",
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.lg,
    boxShadow: theme.shadow.card,
  },
  statValue: { fontSize: "30px", fontWeight: 800, color: theme.colors.primary },
  statLabel: { marginTop: "6px", fontSize: "14px", color: theme.colors.textMuted },
  block: { padding: "72px 0 0" },
  blockTitle: {
    margin: "0 0 28px",
    fontSize: "clamp(24px, 3vw, 34px)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: theme.colors.text,
  },
  valuesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    "@media (max-width: 780px)": { gridTemplateColumns: "1fr" },
  },
  valueCard: {
    padding: "28px",
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.lg,
  },
  valueTitle: { margin: "0 0 10px", fontSize: "19px", fontWeight: 700, color: theme.colors.text },
  valueText: { margin: 0, fontSize: "15px", lineHeight: 1.6, color: theme.colors.textMuted },
  storyBlock: { padding: "72px 0", maxWidth: "760px" },
  story: {
    margin: "0 0 18px",
    fontSize: "17px",
    lineHeight: 1.7,
    color: theme.colors.textMuted,
  },
} as const;

export default About;
