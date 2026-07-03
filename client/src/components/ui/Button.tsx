import { ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { theme } from "../../styles/theme";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  /** Если задано — рендерится как react-router ссылка. */
  to?: string;
}

/** Универсальная кнопка/ссылка с общими вариантами оформления. */
const Button = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  to,
  type,
  children,
  ...rest
}: ButtonProps) => {
  const style = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && { width: "100%" },
  ];

  if (to) {
    return (
      <Link to={to} css={style} aria-label={rest["aria-label"]}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} css={style} {...rest}>
      {children}
    </button>
  );
};

const styles = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: theme.font,
    fontWeight: 600,
    textDecoration: "none",
    border: "1px solid transparent",
    borderRadius: theme.radius.md,
    cursor: "pointer",
    transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
    whiteSpace: "nowrap",
    "&:disabled": {
      backgroundColor: theme.colors.border,
      borderColor: theme.colors.border,
      color: theme.colors.textMuted,
      cursor: "not-allowed",
    },
  },
  md: { height: "44px", padding: "0 22px", fontSize: "15px" },
  lg: { height: "54px", padding: "0 30px", fontSize: "16px" },
  primary: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.surface,
    "&:hover:not(:disabled)": { backgroundColor: theme.colors.primaryHover },
  },
  secondary: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    color: theme.colors.text,
    "&:hover:not(:disabled)": { borderColor: theme.colors.primary, color: theme.colors.primary },
  },
  ghost: {
    backgroundColor: theme.colors.primarySoft,
    color: theme.colors.primary,
    "&:hover:not(:disabled)": { backgroundColor: "#E3DCF8" },
  },
  dark: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.dark,
    "&:hover:not(:disabled)": { backgroundColor: "#EDEDF2" },
  },
} as const;

export default Button;
