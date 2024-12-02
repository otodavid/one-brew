import Image from 'next/image';
import React, { ReactNode } from 'react';

interface CallOutSectionProps {
  bgImagePath: string;
  imageDesc: string;
  children: ReactNode;
}

export const CallOutSection = ({
  bgImagePath,
  imageDesc,
  children,
}: CallOutSectionProps) => {
  return (
    <div className='relative px-4 w-full py-20 overflow-hidden isolate xs:px-6 md:py-28 md:px-12 lg:px-28'>
      <Image
        src={bgImagePath}
        alt={imageDesc}
        fill={true}
        sizes='70vw'
        className='object-cover inset-0 -z-10 brightness-[.3]'
      />
      <div className='text-background'>{children}</div>
    </div>
  );
};
