/** Единые токены оформления, чтобы цвета и отступы не дублировались по компонентам. */
export const theme = {
  colors: {
    primary: "#4F2CD9",
    primaryHover: "#3F1FC4",
    primaryLight: "#6C47FF",
    primarySoft: "#EEEAFB",
    text: "#1A1A1A",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    background: "#F6F6FA",
    surface: "#FFFFFF",
    surfaceMuted: "#FAFAFB",
    success: "#1FA45A",
    danger: "#E5484D",
    star: "#F5A623",
    dark: "#141326",
  },
  radius: {
    sm: "5px",
    md: "10px",
    lg: "16px",
    xl: "24px",
    pill: "999px",
  },
  shadow: {
    card: "0 4px 20px rgba(20, 19, 38, 0.06)",
    lg: "0 18px 50px rgba(20, 19, 38, 0.12)",
  },
  layout: {
    maxWidth: "1280px",
  },
  font: '"Inter", sans-serif',
} as const;
