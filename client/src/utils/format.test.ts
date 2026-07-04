import { describe, it, expect } from "vitest";
import {
  formatMoney,
  formatPriceFrom,
  formatMileage,
  pluralize,
  pluralizePositions,
  pluralizeCars,
} from "./format";

// Разделитель разрядов у ru-локали — неразрывный пробел (зависит от ICU),
// поэтому нормализуем любые пробелы к обычному перед сравнением.
const norm = (s: string) => s.replace(/\s/g, " ");

describe("format money", () => {
  it("форматирует число как цену с разделителями разрядов", () => {
    expect(norm(formatMoney(54333))).toBe("$54 333");
    expect(norm(formatMoney(1000000))).toBe("$1 000 000");
  });

  it("добавляет приставку «от»", () => {
    expect(norm(formatPriceFrom(54333))).toBe("от $54 333");
  });
});

describe("format mileage", () => {
  it("нулевой пробег — «новый»", () => {
    expect(formatMileage(0)).toBe("новый");
  });

  it("ненулевой пробег — с единицей «км»", () => {
    expect(norm(formatMileage(15000))).toBe("15 000 км");
  });
});

describe("pluralize", () => {
  it("выбирает форму по русским правилам", () => {
    expect(pluralize(1, "a", "b", "c")).toBe("a");
    expect(pluralize(2, "a", "b", "c")).toBe("b");
    expect(pluralize(5, "a", "b", "c")).toBe("c");
    expect(pluralize(11, "a", "b", "c")).toBe("c");
    expect(pluralize(21, "a", "b", "c")).toBe("a");
    expect(pluralize(22, "a", "b", "c")).toBe("b");
  });

  it("склоняет «позиция» и «автомобиль»", () => {
    expect(pluralizePositions(1)).toBe("позиция");
    expect(pluralizePositions(2)).toBe("позиции");
    expect(pluralizePositions(5)).toBe("позиций");
    expect(pluralizeCars(1)).toBe("автомобиль");
    expect(pluralizeCars(3)).toBe("автомобиля");
    expect(pluralizeCars(5)).toBe("автомобилей");
  });
});
