/// <reference types="@emotion/react/types/css-prop" />
import { theme } from "./theme";

// Шрифт Inter подключается через <link> в index.html.
export const GLOBAL_STYLES = {
  "*": {
    boxSizing: "border-box",
  } as const,
  "html, body, #root": {
    margin: 0,
    padding: 0,
    minHeight: "100%",
  },
  body: {
    fontFamily: theme.font,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
    WebkitFontSmoothing: "antialiased",
  },
  a: {
    color: "inherit",
  },
  img: {
    display: "block",
  },
} as const;
