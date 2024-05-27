import { ReactNode } from 'react';
import { Card } from './Card';

interface FeaturedProps {
  heading: string;
  subheading?: string;
  children: ReactNode;
}

export const Featured = ({ heading, subheading, children }: FeaturedProps) => {
  return (
    <section className='px-6'>
      <h2 className='font-bold text-xl text-center'>{heading}</h2>
      <p className='text-center'>{subheading}</p>

      <div className='my-6'>{children}</div>
    </section>
  );
};
