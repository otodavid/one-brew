import { ReactNode } from 'react';

interface FeaturedProps {
  heading: string;
  subheading?: string;
  children: ReactNode;
}

export const Featured = ({ heading, subheading, children }: FeaturedProps) => {
  return (
    <section className='px-4 py-16 max-w-8xl mx-auto xs:px-6 md:px-12 xl:px-16 2xl:py-24 2xl:px-20'>
      <h2 className='text-center'>{heading}</h2>
      <p className='text-center max-w-lg mx-auto mt-2'>{subheading}</p>

      {children}
    </section>
  );
};
