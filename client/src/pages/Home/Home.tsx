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
import { ShieldIcon } from "../../components/icons/ShieldIcon";
import { ChecklistIcon } from "../../components/icons/ChecklistIcon";
import { ExchangeIcon } from "../../components/icons/ExchangeIcon";
import { AwardIcon } from "../../components/icons/AwardIcon";
import { theme } from "../../styles/theme";

const TRUST = [
  {
    icon: <ShieldIcon />,
    title: "Юридическая чистота",
    text: "Полный отчёт по VIN и проверка истории до подписания договора.",
  },
  {
    icon: <ChecklistIcon />,
    title: "Проверка 120+ пунктов",
    text: "Каждый автомобиль проходит диагностику перед выставлением в продажу.",
  },
  {
    icon: <ExchangeIcon />,
    title: "Trade-in за 30 минут",
    text: "Оценим вашу машину по рынку и зачтём в стоимость новой.",
  },
  {
    icon: <AwardIcon />,
    title: "Официальный дилер",
    text: "Гарантия производителя и сервисное обслуживание в одном месте.",
  },
];

const VALUES = [
  {
    title: "Прозрачность",
    text: "Показываем реальную историю авто, отчёт по VIN и честную цену без скрытых доплат.",
  },
  {
    title: "Качество",
    text: "Каждый автомобиль проходит диагностику по 120+ пунктам перед продажей.",
  },
  {
    title: "Забота",
    text: "Сопровождаем сделку от первого звонка до выдачи ключей и после неё.",
  },
];

// Фото для hero-блока лежит в static на сервере (проксируется Vite в разработке).
const HERO_IMAGE = "/static/images/hero_image.png";

const Home: FC = () => {
  const featured = useAsync(
    () => fetchCars({ sort: "price_desc", limit: 6, filter: { onlyAvailable: true } }),
    []
  );
  const reviews = useAsync(() => fetchReviews(), []);

  return (
    <div>
      {/* Hero — editorial */}
      <section css={styles.hero}>
        <div css={styles.heroImageWrap}>
          <img css={styles.heroImage} src={HERO_IMAGE} alt="Автомобиль AutoHub" />
          <span css={styles.heroImageFade} />
        </div>
        <Container>
          <div css={styles.heroContent}>
            <h1 css={styles.heroTitle}>
              Автомобиль
              <br />
              мечты. <span css={styles.accent}>Без&nbsp;рисков.</span>
            </h1>
            <p css={styles.heroSubtitle}>
              Проверенные автомобили ведущих брендов, прозрачные цены и
              сопровождение сделки от выбора до выдачи ключей.
            </p>
            <div css={styles.heroActions}>
              <Button to="/catalog" size="lg">Смотреть каталог</Button>
              <Button to="/qa" size="lg" variant="secondary">Как проходит покупка</Button>
            </div>
            <div css={styles.statCards}>
              {[
                { value: "18+", label: "авто в наличии" },
                { value: "4", label: "премиум-бренда" },
                { value: "12 лет", label: "на рынке" },
              ].map((stat) => (
                <div key={stat.label} css={styles.statCard}>
                  <span css={styles.statValue}>{stat.value}</span>
                  <span css={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
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

      {/* About */}
      <section css={styles.aboutBand}>
        <Container>
          <div css={styles.aboutGrid}>
            <div>
              <span css={styles.eyebrow}>О компании</span>
              <h2 css={[styles.sectionTitle, { marginTop: "16px" }]}>
                AutoHub — автомобили, которым доверяют
              </h2>
              <p css={styles.aboutText}>
                Мы помогаем покупать автомобили спокойно и без рисков. С 2014 года
                подбираем проверенные машины премиум-брендов, берём на себя проверку,
                документы и подготовку — чтобы вам осталось только сесть за руль.
              </p>
              <p css={styles.aboutText}>
                Сегодня это команда специалистов, собственный центр диагностики и
                сервис полного цикла: подбор, trade-in, кредит, страхование и
                постпродажная поддержка. Принцип неизменен — честность важнее сделки.
              </p>
            </div>
            <div css={styles.valuesCol}>
              {VALUES.map((value) => (
                <div key={value.title} css={styles.valueCard}>
                  <h3 css={styles.valueTitle}>{value.title}</h3>
                  <p css={styles.valueText}>{value.text}</p>
                </div>
              ))}
            </div>
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

const styles = {
  hero: {
    position: "relative",
    overflow: "hidden",
    background: `radial-gradient(760px 460px at 6% 8%, ${theme.colors.primarySoft}, transparent 55%), ${theme.colors.background}`,
  },
  heroImageWrap: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: "46%",
    "@media (max-width: 900px)": {
      position: "static",
      width: "100%",
    },
  },
  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    "@media (max-width: 900px)": { height: "auto", aspectRatio: "16 / 10" },
  },
  heroImageFade: {
    position: "absolute",
    inset: 0,
    background: `linear-gradient(90deg, ${theme.colors.background} 0%, rgba(246,246,250,0.55) 26%, transparent 62%)`,
    "@media (max-width: 900px)": { display: "none" },
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    maxWidth: "580px",
    padding: "104px 0 108px",
    "@media (max-width: 900px)": { maxWidth: "100%", padding: "44px 0 56px" },
  },
  eyebrow: {
    display: "inline-block",
    marginBottom: "22px",
    padding: "6px 14px",
    fontSize: "13px",
    fontWeight: 600,
    color: theme.colors.primary,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.pill,
    boxShadow: theme.shadow.card,
  },
  heroTitle: {
    margin: "0 0 24px",
    fontSize: "clamp(46px, 7.5vw, 92px)",
    lineHeight: 0.98,
    fontWeight: 800,
    letterSpacing: "-0.03em",
    color: theme.colors.text,
  },
  accent: { color: theme.colors.primary },
  heroSubtitle: {
    margin: "0 0 32px",
    maxWidth: "440px",
    fontSize: "18px",
    lineHeight: 1.6,
    color: theme.colors.textMuted,
  },
  heroActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "14px",
  },
  statCards: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    marginTop: "48px",
  },
  statCard: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "16px 22px",
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.lg,
    boxShadow: theme.shadow.card,
  },
  statValue: { fontSize: "26px", fontWeight: 800, lineHeight: 1, color: theme.colors.text },
  statLabel: { fontSize: "13px", color: theme.colors.textMuted },
  trustGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "24px",
    marginTop: "56px",
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
  trustIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    color: theme.colors.primary,
    backgroundColor: theme.colors.primarySoft,
    borderRadius: theme.radius.md,
  },
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
  aboutBand: {
    margin: "72px 0 0",
    padding: "72px 0",
    backgroundColor: theme.colors.surface,
    borderTop: `1px solid ${theme.colors.border}`,
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: "48px",
    alignItems: "center",
    "@media (max-width: 860px)": { gridTemplateColumns: "1fr" },
  },
  aboutText: {
    margin: "16px 0 0",
    fontSize: "16px",
    lineHeight: 1.7,
    color: theme.colors.textMuted,
  },
  valuesCol: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  valueCard: {
    padding: "22px",
    backgroundColor: theme.colors.surfaceMuted,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.lg,
  },
  valueTitle: { margin: "0 0 8px", fontSize: "18px", fontWeight: 700, color: theme.colors.text },
  valueText: { margin: 0, fontSize: "14px", lineHeight: 1.55, color: theme.colors.textMuted },
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
