import { convertToLink, convertToText } from '@/lib/helpers';
import { ICategories } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  categories: ICategories;
}

export const MainMenu = ({ categories }: Props) => {
  console.log(categories);
  return (
    <div>
      <h2 className='mb-2 lg:mb-8'>Menu</h2>
      {/* Drinks section */}
      <section className='py-6 lg:pt-0'>
        <h4 className='border-b pb-2'>Drinks</h4>

        <div className='grid grid-cols-[repeat(auto-fill,minmax(18rem,_1fr))] gap-8 pt-6'>
          {categories.drinks.map((category, index) => (
            <Link
              href={`/menu/${category.name}`}
              className='grid grid-cols-[auto_1fr] items-center gap-4 group'
              key={index}
            >
              <div className='rounded-full overflow-hidden'>
                <Image
                  src={category.image}
                  alt='Machiato coffee'
                  width={75}
                  height={75}
                  className='object-cover object-center aspect-square'
                />
              </div>
              <p className='font-medium group-hover:text-primary capitalize'>
                {convertToText(category.name)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* food section */}
      <section className='py-6'>
        <h4 className='border-b pb-2'>Food</h4>

        <div className='grid grid-cols-[repeat(auto-fit_minmax(auto_1fr))] gap-8 pt-6'>
          {categories.food.map((category, index) => (
            <Link
              href={`/menu/${convertToLink(category.name)}`}
              className='grid grid-cols-[auto_1fr] items-center gap-4 group'
              key={index}
            >
              <div className='rounded-full overflow-hidden'>
                <Image
                  src={category.image}
                  alt='Machiato coffee'
                  width={75}
                  height={75}
                  className='object-cover object-center aspect-square'
                />
              </div>
              <p className='font-medium group-hover:text-primary capitalize'>
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
