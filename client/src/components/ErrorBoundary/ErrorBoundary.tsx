import { Component, ErrorInfo, ReactNode } from "react";
import { theme } from "../../styles/theme";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Ловит ошибки рендера, чтобы одна упавшая страница не обрушивала всё приложение
 * в пустой экран. Показывает мягкий фолбэк с предложением перезагрузить.
 */
class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // В реальном проекте здесь была бы отправка в Sentry и т.п.
    console.error("Необработанная ошибка UI:", error, info);
  }

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    return (
      <div css={styles.wrapper}>
        <h1 css={styles.title}>Что-то пошло не так</h1>
        <p css={styles.text}>
          Произошла непредвиденная ошибка. Попробуйте перезагрузить страницу.
        </p>
        <div css={styles.actions}>
          <button css={styles.primary} onClick={() => window.location.reload()}>
            Перезагрузить
          </button>
          <a css={styles.secondary} href="/">
            На главную
          </a>
        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    maxWidth: "520px",
    margin: "0 auto",
    padding: "96px 24px",
    textAlign: "center",
  },
  title: { margin: "0 0 12px", fontSize: "28px", fontWeight: 800, color: theme.colors.text },
  text: { margin: "0 0 28px", fontSize: "16px", lineHeight: 1.6, color: theme.colors.textMuted },
  actions: { display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" },
  primary: {
    height: "48px",
    padding: "0 24px",
    fontSize: "15px",
    fontWeight: 600,
    fontFamily: theme.font,
    color: theme.colors.surface,
    backgroundColor: theme.colors.primary,
    border: "none",
    borderRadius: theme.radius.md,
    cursor: "pointer",
  },
  secondary: {
    display: "inline-flex",
    alignItems: "center",
    height: "48px",
    padding: "0 24px",
    fontSize: "15px",
    fontWeight: 600,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    textDecoration: "none",
  },
} as const;

export default ErrorBoundary;
