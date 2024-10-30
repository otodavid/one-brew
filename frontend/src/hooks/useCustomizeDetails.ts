import { useState } from 'react';

export const useCounter = () => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleSubstract = () => {
    setQuantity((prev) => prev - 1);
  };

  return {
    quantity,
    handleAdd,
    handleSubstract,
  };
};
