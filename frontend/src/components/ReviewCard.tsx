import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa6';

interface Props {
  name: string;
  review: string;
  productName: string;
  stars: number;
}

function RenderMultiple({ stars }: { stars: number }) {
  return (
    <div>
      {Array.from({ length: stars }, (_, index) => (
        <FaStar key={index} />
      ))}
    </div>
  );
}

export const ReviewCard = ({ name, review, productName, stars }: Props) => {
  return (
    <div className='relative bg-white rounded-xl px-4 py-8 shadow-lg'>
      <div className='w-16 h-16 rounded-full absolute overflow-hidden -top-8 left-2/4 -translate-x-2/4 border-2 border-accent'>
        <Image
          src='https://api.slingacademy.com/public/sample-photos/25.jpeg'
          alt='Customer Picture'
          fill={true}
        />
      </div>

      <div className='mx-auto mt-6 text-yellow-500 flex w-max'>
        {Array.from({ length: stars }, (_, index) => (
          <FaStar key={index} size={16} />
        ))}
      </div>

      <p className='my-4 text-center text-sm italic'>&apos;{review}&apos;</p>

      <div className='w-8 h-1 border-t mx-auto mb-4'></div>
      <p className='font-semibold text-center text-accent'>{name}</p>
      <p className='text-xs italic text-center'> on the {productName}</p>
    </div>
  );
};
