import { FC } from "react";

interface HeartIconProps {
  /** Залитое сердце — для активного состояния «в избранном». */
  filled?: boolean;
  size?: number;
}

/** Иконка-сердце. В зависимости от filled рисуется залитой или контурной. */
export const HeartIcon: FC<HeartIconProps> = ({ filled = false, size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
