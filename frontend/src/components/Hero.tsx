import Image from 'next/image';
import heroPic from '/public/img/hero-coffee.png';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className='relative isolate'>
      <div className='absolute -right-20 -top-36 w-40 h-60 -z-10 bg-hero-bg bg-contain bg-no-repeat -rotate-[135deg]'></div>
      <div className='text-center px-4 py-8'>
        <h1 className='font-bold capitalize mt-4 mb-2'>
          Fuel yourself with the{' '}
          <span className='text-primary'>perfect cup</span>
        </h1>
        <p className=''>
          More than just a coffee, it&apos;s a feeling. Elevate your morning
          routine with a perfectly brewed cup and enjoy the taste of freshly
          roasted beans.
        </p>

        <Button size={'lg'} className='mx-auto mt-6' asChild={true}>
          <Link href='/menu'>Order now</Link>
        </Button>
      </div>
      <div>
        <div className='relative isolate rounded-md'>
          <div
            className='bg-neutral-white/50 absolute left-16 top-32 w-full -z-10 rounded-3xl mx-auto h-3/5'
            aria-hidden='true'
          ></div>
          <Image src={heroPic} alt='Cup of Coffee' />
        </div>
      </div>
    </section>
  );
}
