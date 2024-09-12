import { ReactNode } from 'react';
import { Card } from './Card';

interface FeaturedProps {
  heading: string;
  subheading?: string;
  children: ReactNode;
}

export const Featured = ({ heading, subheading, children }: FeaturedProps) => {
  return (
    <section className='px-4 py-8'>
      <h2 className='font-bold text-xl text-center'>{heading}</h2>
      <p className='text-center'>{subheading}</p>

      <div className='my-6 grid gap-6'>{children}</div>
    </section>
  );
};
