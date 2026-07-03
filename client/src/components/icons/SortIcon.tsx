import { FC } from "react";

/** Иконка сортировки (две разнонаправленные стрелки) слева от выпадающего списка. */
export const SortIcon: FC<{ size?: number }> = ({ size = 18 }) => (
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
    <path d="M7 4v16" />
    <path d="M4 17l3 3 3-3" />
    <path d="M17 20V4" />
    <path d="M14 7l3-3 3 3" />
  </svg>
);
