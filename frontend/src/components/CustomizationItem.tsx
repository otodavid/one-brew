'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { CustomizeDetails } from '@/lib/types';
import { useCounter } from '@/hooks/useCounter';
import { Counter } from './Counter';

interface CustomizationItemProps {
  name: string;
  maxValue: number;
  price: number;
  setCustomizeDetails: Dispatch<SetStateAction<CustomizeDetails>>;
}

export const CustomizationItem = ({
  name,
  maxValue,
  price,
  setCustomizeDetails,
}: CustomizationItemProps) => {
  const { quantity, handleAdd, handleSubtract } = useCounter();

  useEffect(() => {
    if (quantity > 0) {
      setCustomizeDetails((prev: CustomizeDetails) => {
        const itemExists = prev.addons.some((item) => item.name === name);

        if (itemExists) {
          return {
            ...prev,
            addons: prev.addons.map((item) =>
              item.name === name ? { ...item, quantity, price } : item
            ),
          };
        } else {
          return {
            ...prev,
            addons: [...prev.addons, { name, quantity, price }],
          };
        }
      });
    }
  }, [quantity, name, price, setCustomizeDetails]);

  return (
    <div>
      <div className='flex justify-between items-center'>
        <p className='capitalize'>{name}</p>
        <div className='flex items-center gap-2'>
          <Counter
            quantity={quantity}
            handleAdd={handleAdd}
            handleSubtract={handleSubtract}
          />
        </div>
      </div>
    </div>
  );
};
