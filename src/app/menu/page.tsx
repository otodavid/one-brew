import Image from 'next/image';
import Link from 'next/link';

export default function Menu() {
  return (
    <div className='px-6'>
      <h1 className='text-3xl font-bold'>Menu</h1>

      {/* Drinks section */}
      <section className='py-6'>
        <h2 className='text-xl font-semibold border-b pb-2'>Drinks</h2>

        <div className='grid grid-cols-[repeat(auto-fit_minmax(auto_1fr))] gap-8 pt-6'>
          <Link
            href={'/menu/espresso-based-coffee'}
            className='grid grid-cols-[auto_1fr] items-center gap-4 group'
          >
            <div className='rounded-full bg-secondary-accent relative w-16 h-16'>
              <Image
                src='/img/menu-espresso.png'
                alt='Machiato coffee'
                fill={true}
                className='object-cover object-bottom'
              />
            </div>
            <p className='font-medium group-hover:text-accent'>
              Espresso-Based Drinks
            </p>
          </Link>

          <Link
            href={'/menu/cold-iced-coffee'}
            className='grid grid-cols-[auto_1fr] items-center gap-4 group'
          >
            <div className='rounded-full bg-secondary-accent relative w-16 h-16'>
              <Image
                src='/img/menu-iced.png'
                alt='Iced Latte'
                fill={true}
                className='object-contain'
              />
            </div>
            <p className='font-medium group-hover:text-accent'>
              Cold brew and Iced coffee
            </p>
          </Link>

          <Link
            href={'/menu/bottled-beverages'}
            className='grid grid-cols-[auto_1fr] items-center gap-4 group'
          >
            <div className='rounded-full bg-secondary-accent relative w-16 h-16'>
              <Image
                src='/img/menu-bottled.png'
                alt='Bottled Juice'
                fill={true}
                className='object-contain object-bottom'
              />
            </div>
            <p className='font-medium group-hover:text-accent'>
              Bottled Beverages
            </p>
          </Link>
        </div>
      </section>

      {/* Food section */}
      <section className='py-6'>
        <h2 className='text-xl font-semibold border-b pb-2'>Food</h2>

        <div className='grid grid-cols-[repeat(auto-fit_minmax(auto_1fr))] gap-8 pt-6'>
          <Link
            href={'/menu-bakery'}
            className='grid grid-cols-[auto_1fr] items-center gap-4 group'
          >
            <div className='rounded-full bg-secondary-accent relative w-16 h-16'>
              <Image
                src='/img/menu-bakery.png'
                alt='Bread bun'
                fill={true}
                className='object-contain object-center'
              />
            </div>
            <p className='font-medium group-hover:text-accent'>Bakery</p>
          </Link>

          <Link
            href={'/menu-snaks'}
            className='grid grid-cols-[auto_1fr] items-center gap-4 group'
          >
            <div className='rounded-full bg-secondary-accent relative w-16 h-16'>
              <Image
                src='/img/menu-snacks.png'
                alt='Chocolate bites'
                fill={true}
                className='object-contain'
              />
            </div>
            <p className='font-medium group-hover:text-accent'>
              Snacks and sweets
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
