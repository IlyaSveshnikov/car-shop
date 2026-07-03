import { FC } from "react";
import { keyframes } from "@emotion/react";
import { theme } from "../../styles/theme";

const shimmer = keyframes({
  "0%": { backgroundPosition: "-400px 0" },
  "100%": { backgroundPosition: "400px 0" },
});

interface SkeletonProps {
  width?: string;
  height?: string;
  radius?: string;
  className?: string;
}

/** Пульсирующий плейсхолдер для состояний загрузки. */
const Skeleton: FC<SkeletonProps> = ({
  width = "100%",
  height = "16px",
  radius = theme.radius.sm,
  className,
}) => (
  <span
    className={className}
    css={{
      display: "block",
      width,
      height,
      borderRadius: radius,
      background: `linear-gradient(90deg, #ECECF1 25%, #F5F5F8 37%, #ECECF1 63%)`,
      backgroundSize: "800px 100%",
      animation: `${shimmer} 1.4s ease infinite`,
    }}
  />
);

/** Скелет карточки каталога. */
export const CarCardSkeleton: FC = () => (
  <div
    css={{
      padding: "16px",
      backgroundColor: theme.colors.surface,
      border: `1px solid ${theme.colors.border}`,
      borderRadius: theme.radius.lg,
    }}
  >
    <Skeleton height="180px" radius={theme.radius.md} />
    <div css={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
      <Skeleton width="70%" height="20px" />
      <Skeleton width="50%" height="14px" />
      <Skeleton width="40%" height="22px" />
      <Skeleton height="44px" radius={theme.radius.md} />
    </div>
  </div>
);

/** Ряд скелетов карточек. */
export const CarGridSkeleton: FC<{ count?: number }> = ({ count = 6 }) => (
  <div
    css={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: "24px",
    }}
  >
    {Array.from({ length: count }).map((_, i) => (
      <CarCardSkeleton key={i} />
    ))}
  </div>
);

export default Skeleton;
