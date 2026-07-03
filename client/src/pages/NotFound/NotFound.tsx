import { FC } from "react";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import { theme } from "../../styles/theme";

/** Страница 404 для несуществующих маршрутов. */
const NotFound: FC = () => (
  <Container>
    <div css={styles.wrapper}>
      <span css={styles.code}>404</span>
      <h1 css={styles.title}>Страница не найдена</h1>
      <p css={styles.text}>
        Возможно, ссылка устарела или автомобиль уже продан. Вернитесь в каталог —
        там есть из чего выбрать.
      </p>
      <div css={styles.actions}>
        <Button to="/catalog" size="lg">В каталог</Button>
        <Button to="/" size="lg" variant="secondary">На главную</Button>
      </div>
    </div>
  </Container>
);

const styles = {
  wrapper: {
    maxWidth: "520px",
    margin: "0 auto",
    padding: "96px 0",
    textAlign: "center",
  },
  code: {
    fontSize: "96px",
    fontWeight: 800,
    lineHeight: 1,
    color: theme.colors.primary,
    letterSpacing: "-0.04em",
  },
  title: { margin: "16px 0 12px", fontSize: "30px", fontWeight: 800, color: theme.colors.text },
  text: { margin: "0 0 32px", fontSize: "16px", lineHeight: 1.6, color: theme.colors.textMuted },
  actions: { display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" },
} as const;

export default NotFound;
