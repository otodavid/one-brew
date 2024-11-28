import { ReviewCard } from './ReviewCard';

export const ReviewsList = () => {
  return (
    <div className='max-w-8xl mx-auto px-4 py-10 xs:px-6 md:px-12 xl:px-16 2xl:px-20'>
      <h2 className='text-center'>What our Customers Say</h2>

      <div className='py-8 mt-10 grid gap-y-20 sm:grid-cols-3 sm:gap-x-4 lg:gap-x-8 2xl:gap-x-12'>
        <ReviewCard
          name='Emma Carter'
          review='The coffee beans I ordered were incredibly fresh and full of flavor! The packaging was beautiful, and I loved the brewing tips included. Definitely my go-to coffee shop from now on!'
          productName='Espresso'
          stars={4}
        />
        <ReviewCard
          name='Lucas Rivera'
          review='I tried the medium roast blend, and it was smooth and aromatic—perfect for my morning routine. Shipping was quick, though I wish there were more decaf options available.'
          productName='Iced Latte'
          stars={5}
        />
        <ReviewCard
          name='Sophia Bennett'
          review="Hands down the best espresso beans I've ever tried! The rich, chocolatey undertones are divine. Plus, the customer service was top-notch when I had questions about grinding techniques"
          productName='Machiato'
          stars={4}
        />
      </div>
    </div>
  );
};
