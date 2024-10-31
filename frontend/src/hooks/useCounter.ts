import { useState } from 'react';

interface Props {
  startValue?: number;
}

export const useCounter = ({ startValue }: Props = {}) => {
  const [quantity, setQuantity] = useState<number>(startValue ?? 0);

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleSubtract = () => {
    setQuantity((prev) => prev - 1);
  };

  return {
    quantity,
    handleAdd,
    handleSubtract,
  };
};
