import { FaMinus, FaPlus } from 'react-icons/fa6';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

interface CustomizationItemProps {
  name: string;
  incrementValue: number;
  maxValue: number;
}

export const CustomizationItem = ({
  name,
  incrementValue,
  maxValue,
}: CustomizationItemProps) => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleAdd = () => {
    setQuantity((prev) => prev + incrementValue);
  };

  const handleSubstract = () => {
    setQuantity((prev) => prev - incrementValue);
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <p className='capitalize'>{name}</p>
        <div className='flex items-center gap-2'>
          <Button
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
