import Image from 'next/image';
import heroPic from '/public/img/hero-coffee.png';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className='relative isolate'>
      <div className='min-h-[30rem] grid items-center sm:grid sm:grid-cols-[1fr_.5fr] bg-gradient-to-tr sm:from-black/85 sm:from-40% sm:to-transparent sm:to-80% xl:py-24 '>
        <Image
          src={'/img/test2.jpg'}
          alt='brown hero background'
          fill={true}
          className='-z-10 object-cover brightness-[.2] sm:brightness-100'
        />
        <div className='text-center text-background mx-auto py-20 px-4 xs:px-8 sm:px-6 sm:text-left md:px-12 lg:max-w-2xl'>
          <h1 className='font-bold capitalize'>
            Fuel yourself with the{' '}
            <span className='text-primary'>perfect cup</span>
          </h1>
          <p className='my-4 md:max-w-md lg:my-7'>
            More than just a coffee, it&apos;s a feeling. Elevate your morning
            routine with a perfectly brewed cup and enjoy the taste of freshly
            roasted beans.
          </p>

          <Button size={'lg'} className='mx-auto mt-2' asChild={true}>
            <Link href='/menu'>Order now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
