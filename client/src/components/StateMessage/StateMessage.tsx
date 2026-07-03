import { FC, ReactNode } from "react";
import { theme } from "../../styles/theme";

interface StateMessageProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

/** Заглушка для состояний загрузки, ошибки и пустого списка. */
const StateMessage: FC<StateMessageProps> = ({ title, description, action }) => (
  <div css={styles.wrapper}>
    <p css={styles.title}>{title}</p>
    {description && <p css={styles.description}>{description}</p>}
    {action}
  </div>
);

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    padding: "80px 20px",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 600,
    color: theme.colors.text,
  },
  description: {
    margin: 0,
    fontSize: "15px",
    color: theme.colors.textMuted,
  },
} as const;

export default StateMessage;
