import Image from 'next/image';
import loader from '/public/loader.gif';

export default function Loading() {
  return (
    <div className='min-h-[90vh] w-screen flex flex-col justify-center items-center gap-4 pb-10'>
      <div className='w-20 relative aspect-square'>
        <Image
          src={loader}
          alt='coffee machine loader'
          priority={true}
          fill={true}
          unoptimized={true}
        />
      </div>

      <p className='italic text-sm text-center max-w-60'>
        Good things take time, just like a perfect brew.
      </p>
    </div>
  );
}
