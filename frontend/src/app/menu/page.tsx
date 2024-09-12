import pool from '@/db/config';
import { getCategories } from '@/db/queries';
import { convertToLink } from '@/lib/helpers';
import Image from 'next/image';
import Link from 'next/link';

export default async function Menu() {
  let categories = await getCategories();

  return (
    <div className='px-4 py-6'>
      <h2 className='text-3xl font-bold'>Menu</h2>

      {/* Drinks section */}
      <section className='py-6'>
        <h3 className='text-xl font-semibold border-b pb-2'>Drinks</h3>

        <div className='grid grid-cols-[repeat(auto-fit_minmax(auto_1fr))] gap-8 pt-6'>
          {categories.map(
            ({ category_id, category_name, category_type, category_image }) =>
              category_type === 'drinks' && (
                <Link
                  href={`/menu/${convertToLink(category_name)}`}
                  className='grid grid-cols-[auto_1fr] items-center gap-4 group'
                  key={category_id}
                >
                  <div className='rounded-full overflow-hidden'>
                    <Image
                      src={category_image}
                      alt='Machiato coffee'
                      width={75}
                      height={75}
                      className='object-cover object-center aspect-square'
                    />
                  </div>
                  <p className='font-medium group-hover:text-primary capitalize'>
                    {category_name}
                  </p>
                </Link>
              )
          )}
        </div>
      </section>

      {/* Food section */}
      <section className='py-6'>
        <h2 className='text-xl font-semibold border-b pb-2'>Food</h2>

        <div className='grid grid-cols-[repeat(auto-fit_minmax(auto_1fr))] gap-8 pt-6'>
          {categories.map(
            ({ category_id, category_name, category_type, category_image }) =>
              category_type === 'food' && (
                <Link
                  href={`/menu/${convertToLink(category_name)}`}
                  className='grid grid-cols-[auto_1fr] items-center gap-4 group'
                  key={category_id}
                >
                  <div className='rounded-full overflow-hidden'>
                    <Image
                      src={category_image}
                      alt='Machiato coffee'
                      width={75}
                      height={75}
                      className='object-cover object-center aspect-square'
                    />
                  </div>
                  <p className='font-medium group-hover:text-primary capitalize'>
                    {category_name}
                  </p>
                </Link>
              )
          )}
        </div>
      </section>
    </div>
  );
}
