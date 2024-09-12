import { ReviewCard } from './ReviewCard';

export const CustomerReviews = () => {
  return (
    <div className='px-4 py-8'>
      <h2 className='text-2xl font-bold text-center'>What our Customers Say</h2>

      <div className='py-8 mt-10 grid gap-16'>
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </div>
  );
};
