'use client';

import { FaMinus, FaPlus } from 'react-icons/fa6';
import { Button } from './ui/button';
import { useContext, useEffect, useState } from 'react';
import { CustomizeContext } from './DisplayProduct';
import { ICustomizeDetails } from '@/lib/types';

interface CustomizationItemProps {
  name: string;
  maxValue: number;
  price: number;
}

export const CustomizationItem = ({
  name,
  maxValue,
  price,
}: CustomizationItemProps) => {
  const [quantity, setQuantity] = useState<number>(0);
  const context = useContext(CustomizeContext);
  // const [addonName, setAddonName] = useState<string>('');

  if (!context) {
    throw new Error('Context Provider is undefined');
  }

  const { customizeDetails, setCustomizeDetails, cartItem, setCartItem } =
    context;

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleSubstract = () => {
    setQuantity((prev) => prev - 1);
  };

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
  }, [quantity, name, setCustomizeDetails]);

  useEffect(() => {
    setCartItem((prev) => ({
      ...prev,

      addons: [
        ...prev.addons,
        {
          name: customizeDetails.size,
          price: price,
          quantity: quantity,
        },
      ],
    }));
  }, [customizeDetails.addons]);

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
