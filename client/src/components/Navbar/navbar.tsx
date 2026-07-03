import { FC, ReactNode } from "react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { useCartStore, useFavoritesStore } from "../../stores/context";
import { theme } from "../../styles/theme";
import { HeartIcon } from "../icons/HeartIcon";
import { CartIcon } from "../icons/CartIcon";

const NAV_LINKS = [
  { to: "/catalog", label: "Каталог" },
  { to: "/how-to-buy", label: "Как купить" },
  { to: "/about", label: "О нас" },
];

/** Верхняя панель сайта: логотип, навигация и иконки избранного/корзины. */
const Navbar: FC = observer(() => {
  const favoritesStore = useFavoritesStore();
  const cartStore = useCartStore();

  return (
    <header css={styles.header}>
      <div css={styles.inner}>
        <Link to="/" css={styles.logo} aria-label="AutoHub — на главную">
          <span css={styles.logoMark}>◈</span>
          Auto<span css={styles.logoAccent}>Hub</span>
        </Link>

        <nav css={styles.nav}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              css={styles.navLink}
              style={({ isActive }) =>
                isActive ? { color: theme.colors.primary } : undefined
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div css={styles.actions}>
          <IconLink
            to="/favorites"
            label="Избранное"
            count={favoritesStore.count}
            icon={<HeartIcon size={22} />}
          />
          <IconLink
            to="/cart"
            label="Корзина"
            count={cartStore.count}
            icon={<CartIcon size={22} />}
          />
        </div>
      </div>
    </header>
  );
});

const IconLink: FC<{
  to: string;
  label: string;
  count: number;
  icon: ReactNode;
}> = ({ to, label, count, icon }) => (
  <NavLink
    to={to}
    css={styles.iconLink}
    style={({ isActive }) =>
      isActive ? { color: theme.colors.primary } : undefined
    }
    aria-label={`${label}${count ? `: ${count}` : ""}`}
  >
    <span css={styles.iconWrap}>
      {icon}
      {count > 0 && <span css={styles.badge}>{count}</span>}
    </span>
    <span css={styles.iconLabel}>{label}</span>
  </NavLink>
);

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    backgroundColor: theme.colors.surface,
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  inner: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
    maxWidth: theme.layout.maxWidth,
    margin: "0 auto",
    padding: "16px 24px",
  },
  logo: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "22px",
    fontWeight: 800,
    color: theme.colors.text,
    textDecoration: "none",
    letterSpacing: "-0.02em",
  },
  logoMark: {
    color: theme.colors.primary,
    fontSize: "20px",
  },
  logoAccent: {
    color: theme.colors.primary,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "28px",
    "@media (max-width: 760px)": { display: "none" },
  },
  navLink: {
    fontSize: "15px",
    fontWeight: 500,
    color: theme.colors.text,
    textDecoration: "none",
    transition: "color 0.2s ease",
    "&:hover": { color: theme.colors.primary },
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginLeft: "auto",
  },
  iconLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px",
    borderRadius: theme.radius.md,
    color: theme.colors.text,
    textDecoration: "none",
    transition: "background-color 0.2s ease, color 0.2s ease",
    "&:hover": {
      backgroundColor: theme.colors.primarySoft,
      color: theme.colors.primary,
    },
  },
  iconWrap: {
    position: "relative",
    display: "inline-flex",
  },
  badge: {
    position: "absolute",
    top: "-8px",
    right: "-10px",
    minWidth: "18px",
    height: "18px",
    padding: "0 5px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: 700,
    color: theme.colors.surface,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.pill,
  },
  iconLabel: {
    fontSize: "15px",
    fontWeight: 500,
    "@media (max-width: 520px)": { display: "none" },
  },
} as const;

export default Navbar;
