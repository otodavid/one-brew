'use client';

import { FaMinus, FaPlus } from 'react-icons/fa6';
import { Button } from './ui/button';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { ICustomizeDetails } from '@/lib/types';
import { useCounter } from '@/hooks/useCustomizeDetails';

interface CustomizationItemProps {
  name: string;
  maxValue: number;
  price: number;
  setCustomizeDetails: Dispatch<SetStateAction<ICustomizeDetails>>;
}

export const CustomizationItem = ({
  name,
  maxValue,
  price,
  setCustomizeDetails,
}: CustomizationItemProps) => {
  const { quantity, handleAdd, handleSubstract } = useCounter();

  useEffect(() => {
    if (quantity > 0) {
      setCustomizeDetails((prev: ICustomizeDetails) => {
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
          <Button
            type='button'
            disabled={quantity === 0 ? true : false}
            variant={'outline'}
            size={'icon'}
            className={`w-5 h-5 ${quantity === 0 && 'disabled:opacity-30'}`}
            onClick={handleSubstract}
          >
            <FaMinus size={'14px'} />
          </Button>
          <span>{quantity}</span>
          <Button
            type='button'
            disabled={quantity === maxValue ? true : false}
            variant={'outline'}
            size={'icon'}
            className={`w-5 h-5 ${
              quantity === maxValue && 'disabled:opacity-30'
            }`}
            onClick={handleAdd}
          >
            <FaPlus size={'14px'} />
          </Button>
        </div>
      </div>
    </div>
  );
};
