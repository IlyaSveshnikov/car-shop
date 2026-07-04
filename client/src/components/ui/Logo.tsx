import { FC } from "react";
import { theme } from "../../styles/theme";

interface LogoProps {
  /** Размер значка (px). Текст масштабируется относительно него. */
  size?: number;
  /** Показывать ли текстовый логотип рядом со значком. */
  showText?: boolean;
  /** Цвет слова «Auto» (для тёмного подвала передаётся светлый). */
  textColor?: string;
}

/** Логотип AutoHub: значок-руль в градиентном квадрате + вордмарк. */
const Logo: FC<LogoProps> = ({
  size = 34,
  showText = true,
  textColor = theme.colors.text,
}) => (
  <span css={styles.wrap}>
    <LogoMark size={size} />
    {showText && (
      <span css={[styles.word, { fontSize: size * 0.62 }]}>
        <span style={{ color: textColor }}>Auto</span>
        <span css={{ color: theme.colors.primaryLight }}>Hub</span>
      </span>
    )}
  </span>
);

/** Только значок — для favicon-подобных мест. */
export const LogoMark: FC<{ size?: number }> = ({ size = 34 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="autohub-logo" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#6C47FF" />
        <stop offset="1" stopColor="#4F2CD9" />
      </linearGradient>
    </defs>
    <rect width="40" height="40" rx="11" fill="url(#autohub-logo)" />
    <g stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" fill="none">
      <circle cx="20" cy="20" r="9.5" />
      <line x1="20" y1="20" x2="20" y2="10.5" />
      <line x1="20" y1="20" x2="28.2" y2="24.8" />
      <line x1="20" y1="20" x2="11.8" y2="24.8" />
    </g>
    <circle cx="20" cy="20" r="2.7" fill="#ffffff" />
  </svg>
);

const styles = {
  wrap: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
  },
  word: {
    fontWeight: 800,
    letterSpacing: "-0.02em",
    lineHeight: 1,
  },
} as const;

export default Logo;
