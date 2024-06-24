'use client';

import Image from 'next/image';
import image from '/public/img/menu-espresso.png';
import { useParams } from 'next/navigation';
import { CiCoffeeCup } from 'react-icons/ci';

interface IParams {
  params: { product: string };
}

export default function Page({ params: { product } }: IParams) {
  const params = useParams<{ category: string; product: string }>();

  // console.log(params.category.replaceAll('-', ' '));
  return (
    <section className='px-6'>
      <div>
        <div className='w-2/4 relative h-60 mx-auto '>
          <Image
            src={image}
            alt='Espresso Coffee'
            fill={true}
            className='object-contain'
          />
        </div>
        <h2 className='font-semibold text-xl text-center'>{product}</h2>
        <p className='text-sm text-center'>
          A strong, full-bodied coffee shot made from finely-ground coffee
          beans.
        </p>
      </div>

      <div className='mx-auto w-72'>
        <div className=' my-6'>
          <h3 className='font-semibold text-center'>Sizing Options</h3>
          <div className='flex items-end justify-center gap-8 pt-6'>
            <div className='flex flex-col items-center'>
              <CiCoffeeCup fontSize={'30px'} />
              <span className='text-xs capitalize font-medium'>small</span>
            </div>

            <div className='flex flex-col items-center'>
              <CiCoffeeCup fontSize={'40px'} />
              <span className='text-xs capitalize font-medium'>medium</span>
            </div>

            <div className='flex flex-col items-center'>
              <CiCoffeeCup fontSize={'50px'} />
              <span className='text-xs capitalize font-medium'>large</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className='font-semibold text-center'>
            Additinal Customizations
          </h3>

          <div>
            <select
              name='coffee blend'
              id=''
              className='w-full bg-transparent border border-gray-200 py-2 px-4 rounded-lg'
            >
              <option
                value=''
                className='bg-red-400 hidden appearance-none'
                disabled
              >
                Coffee Blend
              </option>
              <option value='Light Roast' aria-label='Light Roast'>
                Light Roast
              </option>
              <option value='Medium Roast' aria-label='Medium Roast'>
                Medium Roast
              </option>
              <option value='Dark Roast' aria-label='Dark Roast'>
                Dark Roast
              </option>
              <option value='Decaf' aria-label='Decaf'>
                Decaf
              </option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
