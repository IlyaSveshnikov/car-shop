import { FC } from "react";
import { Link } from "react-router-dom";
import { fetchCars } from "../../api/cars";
import { fetchReviews } from "../../api/reviews";
import { useAsync } from "../../hooks/useAsync";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import Rating from "../../components/ui/Rating";
import CarList from "../../components/CarList/CarList";
import { CarGridSkeleton } from "../../components/ui/Skeleton";
import { theme } from "../../styles/theme";

const TRUST = [
  {
    icon: "🛡️",
    title: "Юридическая чистота",
    text: "Полный отчёт по VIN и проверка истории до подписания договора.",
  },
  {
    icon: "🔧",
    title: "Проверка 120+ пунктов",
    text: "Каждый автомобиль проходит диагностику перед выставлением в продажу.",
  },
  {
    icon: "🔄",
    title: "Trade-in за 30 минут",
    text: "Оценим вашу машину по рынку и зачтём в стоимость новой.",
  },
  {
    icon: "🏆",
    title: "Официальный дилер",
    text: "Гарантия производителя и сервисное обслуживание в одном месте.",
  },
];

const STEPS = [
  { n: "01", title: "Выбираете авто", text: "Каталог с фильтрами и честными характеристиками." },
  { n: "02", title: "Оставляете заявку", text: "Бронируете автомобиль и записываетесь на тест-драйв." },
  { n: "03", title: "Оформляем сделку", text: "Помогаем с кредитом, страховкой и документами." },
  { n: "04", title: "Забираете ключи", text: "Выдаём подготовленный автомобиль или доставляем к вам." },
];

const Home: FC = () => {
  const featured = useAsync(
    () => fetchCars({ sort: "price_desc", limit: 6, filter: { onlyAvailable: true } }),
    []
  );
  const reviews = useAsync(() => fetchReviews(), []);
  const heroImage = featured.data?.items[0]?.img_src;

  return (
    <div>
      {/* Hero */}
      <section css={styles.hero}>
        <Container>
          <div css={styles.heroGrid}>
            <div css={styles.heroText}>
              <span css={styles.eyebrow}>Автосалон премиум-класса</span>
              <h1 css={styles.heroTitle}>
                Автомобиль мечты — <span css={styles.accent}>без переплат и рисков</span>
              </h1>
              <p css={styles.heroSubtitle}>
                Проверенные автомобили ведущих брендов, прозрачные цены и
                сопровождение сделки от выбора до выдачи ключей.
              </p>
              <div css={styles.heroActions}>
                <Button to="/catalog" size="lg">Смотреть каталог</Button>
                <Button to="/how-to-buy" size="lg" variant="dark">Как проходит покупка</Button>
              </div>
              <div css={styles.stats}>
                <Stat value="18+" label="авто в наличии" />
                <Stat value="4" label="премиум-бренда" />
                <Stat value="12 лет" label="на рынке" />
              </div>
            </div>
            <div css={styles.heroImageBox}>
              {heroImage && (
                <img css={styles.heroImage} src={heroImage} alt="Автомобиль AutoHub" />
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Trust */}
      <Container>
        <div css={styles.trustGrid}>
          {TRUST.map((item) => (
            <div key={item.title} css={styles.trustCard}>
              <span css={styles.trustIcon}>{item.icon}</span>
              <h3 css={styles.trustTitle}>{item.title}</h3>
              <p css={styles.trustText}>{item.text}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Featured */}
      <Container>
        <section css={styles.section}>
          <div css={styles.sectionHead}>
            <div>
              <h2 css={styles.sectionTitle}>Популярные модели</h2>
              <p css={styles.sectionSubtitle}>Автомобили, которые чаще всего выбирают наши клиенты</p>
            </div>
            <Link to="/catalog" css={styles.sectionLink}>Весь каталог →</Link>
          </div>
          {featured.loading ? (
            <CarGridSkeleton count={3} />
          ) : featured.data ? (
            <CarList cars={featured.data.items.slice(0, 3)} />
          ) : (
            <p css={styles.sectionSubtitle}>Не удалось загрузить подборку.</p>
          )}
        </section>
      </Container>

      {/* How it works */}
      <section css={styles.howBand}>
        <Container>
          <h2 css={[styles.sectionTitle, { color: theme.colors.surface, textAlign: "center" }]}>
            Как проходит покупка
          </h2>
          <p css={[styles.sectionSubtitle, { color: "#B9B8CB", textAlign: "center", marginBottom: "40px" }]}>
            Четыре простых шага — от выбора до ключей в руках
          </p>
          <div css={styles.stepsGrid}>
            {STEPS.map((step) => (
              <div key={step.n} css={styles.stepCard}>
                <span css={styles.stepNumber}>{step.n}</span>
                <h3 css={styles.stepTitle}>{step.title}</h3>
                <p css={styles.stepText}>{step.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Reviews */}
      <Container>
        <section css={styles.section}>
          <div css={styles.sectionHead}>
            <div>
              <h2 css={styles.sectionTitle}>Отзывы клиентов</h2>
              <p css={styles.sectionSubtitle}>Реальные истории покупок в AutoHub</p>
            </div>
          </div>
          {reviews.data && (
            <div css={styles.reviewsGrid}>
              {reviews.data.slice(0, 6).map((review) => (
                <figure key={review.id} css={styles.reviewCard}>
                  <Rating value={review.rating} />
                  <blockquote css={styles.reviewText}>«{review.text}»</blockquote>
                  <figcaption css={styles.reviewAuthor}>
                    <strong>{review.author}</strong>
                    <span css={styles.reviewMeta}>
                      {review.city} · {review.car}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>
      </Container>

      {/* CTA */}
      <Container>
        <section css={styles.cta}>
          <div>
            <h2 css={styles.ctaTitle}>Готовы выбрать свой автомобиль?</h2>
            <p css={styles.ctaText}>Более 18 проверенных авто в наличии. Подберём под ваш бюджет.</p>
          </div>
          <Button to="/catalog" size="lg" variant="dark">Перейти в каталог</Button>
        </section>
      </Container>
    </div>
  );
};

const Stat: FC<{ value: string; label: string }> = ({ value, label }) => (
  <div>
    <div css={styles.statValue}>{value}</div>
    <div css={styles.statLabel}>{label}</div>
  </div>
);

const styles = {
  hero: {
    padding: "64px 0 72px",
    background: `radial-gradient(1100px 500px at 15% 0%, ${theme.colors.primarySoft}, transparent 60%), ${theme.colors.background}`,
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "1.1fr 1fr",
    gap: "48px",
    alignItems: "center",
    "@media (max-width: 900px)": { gridTemplateColumns: "1fr" },
  },
  heroText: { maxWidth: "560px" },
  eyebrow: {
    display: "inline-block",
    marginBottom: "18px",
    padding: "6px 14px",
    fontSize: "13px",
    fontWeight: 600,
    color: theme.colors.primary,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.pill,
    boxShadow: theme.shadow.card,
  },
  heroTitle: {
    margin: "0 0 20px",
    fontSize: "clamp(34px, 5vw, 56px)",
    lineHeight: 1.05,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: theme.colors.text,
  },
  accent: { color: theme.colors.primary },
  heroSubtitle: {
    margin: "0 0 32px",
    fontSize: "18px",
    lineHeight: 1.6,
    color: theme.colors.textMuted,
  },
  heroActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "14px",
    marginBottom: "40px",
  },
  stats: {
    display: "flex",
    gap: "40px",
  },
  statValue: { fontSize: "30px", fontWeight: 800, color: theme.colors.text },
  statLabel: { fontSize: "14px", color: theme.colors.textMuted },
  heroImageBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: "16 / 11",
    padding: "24px",
    background: `linear-gradient(135deg, ${theme.colors.surface}, ${theme.colors.surfaceMuted})`,
    borderRadius: theme.radius.xl,
    boxShadow: theme.shadow.lg,
    "@media (max-width: 900px)": { order: -1 },
  },
  heroImage: { width: "100%", height: "100%", objectFit: "contain" },
  trustGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "24px",
    marginTop: "-40px",
    "@media (max-width: 900px)": { gridTemplateColumns: "1fr 1fr" },
    "@media (max-width: 520px)": { gridTemplateColumns: "1fr" },
  },
  trustCard: {
    padding: "26px",
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.lg,
    boxShadow: theme.shadow.card,
  },
  trustIcon: { fontSize: "28px" },
  trustTitle: { margin: "14px 0 8px", fontSize: "17px", fontWeight: 700, color: theme.colors.text },
  trustText: { margin: 0, fontSize: "14px", lineHeight: 1.55, color: theme.colors.textMuted },
  section: { padding: "72px 0 0" },
  sectionHead: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "28px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "clamp(26px, 3vw, 36px)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: theme.colors.text,
  },
  sectionSubtitle: { margin: "8px 0 0", fontSize: "16px", color: theme.colors.textMuted },
  sectionLink: {
    fontSize: "15px",
    fontWeight: 600,
    color: theme.colors.primary,
    textDecoration: "none",
    whiteSpace: "nowrap",
    "&:hover": { textDecoration: "underline" },
  },
  howBand: {
    margin: "72px 0 0",
    padding: "72px 0",
    backgroundColor: theme.colors.dark,
  },
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "24px",
    "@media (max-width: 900px)": { gridTemplateColumns: "1fr 1fr" },
    "@media (max-width: 520px)": { gridTemplateColumns: "1fr" },
  },
  stepCard: {
    padding: "28px",
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: theme.radius.lg,
  },
  stepNumber: { fontSize: "28px", fontWeight: 800, color: theme.colors.primaryLight },
  stepTitle: { margin: "14px 0 8px", fontSize: "18px", fontWeight: 700, color: theme.colors.surface },
  stepText: { margin: 0, fontSize: "14px", lineHeight: 1.55, color: "#B9B8CB" },
  reviewsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
  },
  reviewCard: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    margin: 0,
    padding: "26px",
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.lg,
  },
  reviewText: {
    margin: 0,
    fontSize: "15px",
    lineHeight: 1.6,
    color: theme.colors.text,
  },
  reviewAuthor: { display: "flex", flexDirection: "column", gap: "2px", marginTop: "auto" },
  reviewMeta: { fontSize: "13px", color: theme.colors.textMuted },
  cta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "24px",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "72px 0 0",
    padding: "48px",
    background: `linear-gradient(120deg, ${theme.colors.primary}, ${theme.colors.primaryLight})`,
    borderRadius: theme.radius.xl,
  },
  ctaTitle: { margin: "0 0 8px", fontSize: "28px", fontWeight: 800, color: theme.colors.surface },
  ctaText: { margin: 0, fontSize: "16px", color: "rgba(255,255,255,0.85)" },
} as const;

export default Home;
