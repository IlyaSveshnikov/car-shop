import { FC } from "react";
import { Car } from "../../types/car";
import CarCard from "../CarCard/CarCard";

interface CarListProps {
  cars: Car[];
}

/** Адаптивная сетка карточек: подстраивает число колонок под ширину контейнера. */
const CarList: FC<CarListProps> = ({ cars }) => (
  <div css={styles.grid}>
    {cars.map((car) => (
      <CarCard key={car.id} car={car} />
    ))}
  </div>
);

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "24px",
  },
} as const;

export default CarList;
