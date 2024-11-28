import Image from 'next/image';

export default function About() {
  return (
    <div className='pb-20 max-w-8xl mx-auto'>
      <div className='relative px-4 pt-20 pb-4 min-h-96 xs:px-6 md:px-12 lg:pb-8 xl:px-16 2xl:px-20'>
        <h1 className='text-center mb-4'>About us</h1>
        <p className='text-center sm:max-w-xl sm:mx-auto'>
          At One Brew, we believe every cup of coffee has the power to inspire,
          energize, and connect. From the first sip to the last drop, our
          mission is to make each moment unforgettable.
        </p>

        <div className='grid grid-cols-2 items-center gap-2 py-8 sm:grid-cols-4 sm:pt-12 lg:pt-16'>
          <div className='relative aspect-square rounded-lg overflow-hidden'>
            <Image
              src={'/img/about-us-1.jpg'}
              alt='a barrister brewing a coffee drink'
              fill={true}
              className='object-cover'
            />
          </div>
          <div className='relative aspect-video rounded-lg overflow-hidden'>
            <Image
              src={'/img/about-us-2.jpg'}
              alt='a sign post with the word cofffee'
              fill={true}
              className='object-cover'
            />
          </div>
          <div className='relative aspect-video rounded-lg overflow-hidden sm:order-1'>
            <Image
              src={'/img/about-us-4.jpg'}
              alt='a busy coffee shop'
              fill={true}
              className='object-cover'
            />
          </div>
          <div className='relative aspect-square rounded-lg overflow-hidden'>
            <Image
              src={'/img/about-us-3.jpg'}
              alt='about us image'
              fill={true}
              className='object-cover'
            />
          </div>
        </div>
      </div>

      <div className='px-4 xs:px-6 md:px-12 xl:px-16 2xl:px-20 '>
        <div className='py-8 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:gap-10 xl:gap-20'>
          <h2 className='text-center mb-4'>The One Bew story</h2>
          <p className='text-center sm:max-w-2xl sm:mx-auto md:text-left md:mx-0'>
            At One Brew, coffee isn&apos;t just a drink—it&apos;s an experience.
            What began as a small passion for sourcing the finest beans from
            around the world has blossomed into a journey of connecting people
            through rich flavors and aromatic moments. From the bustling coffee
            farms in Ethiopia to the lush plantations of Colombia, every bean in
            our collection has a story to tell.
          </p>
        </div>

        <div className='py-8 space-y-8 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:gap-10 xl:gap-20'>
          <div className='order-2'>
            <h2 className='text-center mb-4 md:text-left'>
              Brewing Purpose with Every Cup
            </h2>
            <p className='text-center sm:max-w-2xl sm:mx-auto md:text-left md:mx-0'>
              We&apos;re on a mission to craft coffee that inspires and
              empowers. Whether it&apos;s starting your day with bold flavors or
              finding comfort in a rich blend, every brew we create is a step
              toward meaningful moments.
            </p>
          </div>
          <div className='relative rounded-lg overflow-hidden w-full aspect-video'>
            <Image
              src={'/img/about-us-5.jpg'}
              alt='a person holding a coffee drink'
              fill={true}
            />
          </div>
        </div>

        <div className='py-8 space-y-8 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:gap-10 xl:gap-20'>
          <div>
            <h2 className='text-center mb-4 md:text-left'>
              Rooted in Responsibility
            </h2>
            <p className='text-center sm:max-w-2xl sm:mx-auto md:text-left md:mx-0'>
              Great coffee starts with respect—for the land, the farmers, and
              the communities that make it possible. At One Brew, we prioritize
              ethical sourcing, sustainable practices, and giving back to those
              who nurture every bean.
            </p>
          </div>

          <div className='relative rounded-lg overflow-hidden w-full aspect-video'>
            <Image
              src={'/img/about-us-6.jpg'}
              alt='coffee beans farmer with a coffee drink'
              fill={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
