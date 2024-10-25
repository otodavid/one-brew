import { ReviewCard } from './ReviewCard';

export const ReviewsList = () => {
  return (
    <div className='max-w-8xl mx-auto px-4 py-10 xs:px-6 md:px-12 xl:px-16 2xl:px-20'>
      <h2 className='text-center'>What our Customers Say</h2>

      <div className='py-8 mt-10 grid gap-y-20 sm:grid-cols-3 sm:gap-x-4 lg:gap-x-8 2xl:gap-x-12'>
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </div>
  );
};
