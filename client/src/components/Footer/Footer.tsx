import { FC } from "react";
import { Link } from "react-router-dom";
import { theme } from "../../styles/theme";
import Logo from "../ui/Logo";

const COLUMNS = [
  {
    title: "Каталог",
    links: [
      { to: "/catalog", label: "Все автомобили" },
      { to: "/catalog", label: "В наличии" },
      { to: "/favorites", label: "Избранное" },
    ],
  },
  {
    title: "Компания",
    links: [
      { to: "/", label: "О нас" },
      { to: "/qa", label: "Q&A" },
      { to: "/cart", label: "Корзина" },
    ],
  },
];

/** Подвал сайта: бренд, разделы и контакты. */
const Footer: FC = () => (
  <footer css={styles.footer}>
    <div css={styles.inner}>
      <div css={styles.brandCol}>
        <Link to="/" css={styles.logo}>
          <Logo size={32} textColor={theme.colors.surface} />
        </Link>
        <p css={styles.tagline}>
          Автосалон премиум-класса. Проверенные автомобили, честные цены и
          сопровождение сделки от выбора до выдачи ключей.
        </p>
      </div>

      {COLUMNS.map((col) => (
        <nav key={col.title} css={styles.col}>
          <h4 css={styles.colTitle}>{col.title}</h4>
          {col.links.map((link, i) => (
            <Link key={i} to={link.to} css={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>
      ))}

      <div css={styles.col}>
        <h4 css={styles.colTitle}>Контакты</h4>
        <span css={styles.contact}>Москва, Волгоградский пр-кт, 43, стр 1</span>
        <a href="tel:+78005553535" css={styles.link}>
          +7 800 555 35 35
        </a>
        <a href="mailto:sales@autohub.example" css={styles.link}>
          sales@autohub.example
        </a>
        <span css={styles.contact}>Ежедневно 9:00 – 21:00</span>
      </div>
    </div>

    <div css={styles.bottom}>
      <span>© {new Date().getFullYear()} AutoHub. Демо-проект для портфолио.</span>
      <span>Цены и наличие носят демонстрационный характер.</span>
    </div>
  </footer>
);

const styles = {
  footer: {
    marginTop: "80px",
    backgroundColor: theme.colors.dark,
    color: "#C7C6D4",
  },
  inner: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1.4fr",
    gap: "40px",
    maxWidth: theme.layout.maxWidth,
    margin: "0 auto",
    padding: "56px 24px 40px",
    "@media (max-width: 860px)": { gridTemplateColumns: "1fr 1fr" },
    "@media (max-width: 520px)": { gridTemplateColumns: "1fr" },
  },
  brandCol: {
    maxWidth: "340px",
  },
  logo: {
    display: "inline-flex",
    alignItems: "center",
    textDecoration: "none",
    marginBottom: "16px",
  },
  tagline: {
    margin: 0,
    fontSize: "14px",
    lineHeight: 1.6,
  },
  col: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  colTitle: {
    margin: "0 0 4px",
    fontSize: "15px",
    fontWeight: 700,
    color: theme.colors.surface,
  },
  link: {
    fontSize: "14px",
    color: "#C7C6D4",
    textDecoration: "none",
    transition: "color 0.2s ease",
    "&:hover": { color: theme.colors.surface },
  },
  contact: {
    fontSize: "14px",
    lineHeight: 1.5,
  },
  bottom: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px 24px",
    justifyContent: "space-between",
    maxWidth: theme.layout.maxWidth,
    margin: "0 auto",
    padding: "20px 24px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    fontSize: "13px",
    color: "#8B8A9A",
  },
} as const;

export default Footer;
