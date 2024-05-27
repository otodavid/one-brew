import Image from 'next/image';
import heroPic from '/public/img/hero-coffee.png';
import { Button } from './Button';

export default function Hero() {
  return (
    <section className='relative isolate'>
      <div className='absolute -right-20 -top-36 w-40 h-60 -z-10 bg-hero-bg bg-contain bg-no-repeat opacity-10 -rotate-[135deg]'></div>
      <div className='text-center px-6 py-8'>
        <h1 className='text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9A703D] to-neutral-black via-primary'>
          ONE BREW
        </h1>
        <h3 className='text-xl font-bold capitalize text-primary mt-4 mb-2'>
          Fuel with the perfect cup
        </h3>
        <p className='text-primary'>
          More than just a coffee, it&apos;s a feeling. Elevate your morning
          routine with a perfectly brewed cup and enjoy the taste of freshly
          roasted beans.
        </p>

        <Button
          type='button'
          text='order now'
          style='primary'
          className='mx-auto mt-6'
        />
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
