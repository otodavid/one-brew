import Image from 'next/image';
import React from 'react';
import { Button } from './Button';
import { IoMdAdd } from 'react-icons/io';

interface CardProps {
  imageSrc: string;
  name: string;
  price: number;
  shortDesc: string;
}

export const Card = ({ imageSrc, shortDesc, name, price }: CardProps) => {
  return (
    <div className='border border-primary/15 rounded-2xl hover:bg-white'>
      <div className='relative w-full h-60'>
        <Image
          src={imageSrc}
          alt={name}
          fill={true}
          className='object-contain'
        />
      </div>

      <div className='px-6 py-4'>
        <h4 className='font-bold text-neutral-black'>{name}</h4>

        <div className='grid grid-cols-[1fr_auto] gap-y-4'>
          <p className='text-xs'>{shortDesc}</p>
          <p className='order-last font-medium'>
            <span className='font-extralight'>&#x24;</span>
            {price}
          </p>
          <Button
            style='icon'
            type='button'
            text={<IoMdAdd size={20} />}
            className='row-span-2 self-center'
          />
        </div>
      </div>
    </div>
  );
};
