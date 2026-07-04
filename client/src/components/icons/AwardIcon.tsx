import { FC } from "react";

/** Медаль — официальный дилер / гарантия. */
export const AwardIcon: FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="5" />
    <path d="M8.5 12.5L7 21l5-3 5 3-1.5-8.5" />
  </svg>
);
