import { FC } from "react";
import { theme } from "../../styles/theme";

interface RatingProps {
  value: number;
  size?: number;
}

/** Пять звёзд с закрашенной частью по значению рейтинга (1–5). */
const Rating: FC<RatingProps> = ({ value, size = 18 }) => (
  <div css={{ display: "inline-flex", gap: "2px" }} aria-label={`Оценка ${value} из 5`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star key={star} filled={star <= value} size={size} />
    ))}
  </div>
);

const Star: FC<{ filled: boolean; size: number }> = ({ filled, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z"
      fill={filled ? theme.colors.star : "none"}
      stroke={filled ? theme.colors.star : theme.colors.border}
      strokeWidth={filled ? 0 : 1.5}
      strokeLinejoin="round"
    />
  </svg>
);

export default Rating;
