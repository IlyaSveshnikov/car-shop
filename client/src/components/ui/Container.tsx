import { FC, ReactNode } from "react";
import { theme } from "../../styles/theme";

/** Центрированный контейнер с единой максимальной шириной и боковыми отступами. */
const Container: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={className}
    css={{
      width: "100%",
      maxWidth: theme.layout.maxWidth,
      margin: "0 auto",
      padding: "0 24px",
    }}
  >
    {children}
  </div>
);

export default Container;
