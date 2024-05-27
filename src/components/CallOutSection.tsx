import React, { ReactNode } from 'react';

interface CallOutSectionProps {
  children: ReactNode;
}

export const CallOutSection = ({ children }: CallOutSectionProps) => {
  return (
    <div className='bg-gradient-to-br from-[#efd1c92d] to-[#EFD1C9] rounded-3xl px-6 py-12 mx-4 my-8'>
      {children}
    </div>
  );
};
