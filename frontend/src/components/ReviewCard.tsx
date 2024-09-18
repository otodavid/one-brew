import Image from 'next/image';
import React from 'react';

export const ReviewCard = () => {
  return (
    <div className='relative bg-white rounded-xl px-4 py-8 shadow-lg'>
      <div className='w-16 h-16 rounded-full absolute overflow-hidden -top-8 left-2/4 -translate-x-2/4 border-2 border-primary'>
        <Image
          src='https://api.slingacademy.com/public/sample-photos/25.jpeg'
          alt='Customer Picture'
          fill={true}
        />
      </div>

      <div className='w-16 mx-auto mt-4'>
        <p>Ratings</p>
      </div>

      <p className='my-4 text-center'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui pariatur
        praesentium ab voluptas mollitia sed delectus perspiciatis recusandae
        dolor, nesciunt possimus esse fuga rerum repellat omnis nemo, commodi id
        ex.
      </p>

      <p className='font-semibold text-center text-primary'>Ophelia Ritchie</p>
      <p className='text-xs italic text-center'> on the American Expresso</p>
    </div>
  );
};
