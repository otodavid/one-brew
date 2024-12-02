import React, { ReactNode } from 'react';
import { MenuSidebar } from './MenuSidebar';

export const ProductPageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className='px-4 py-6 pb-10 min-h-[90vh] xs:px-6 md:px-12 lg:grid lg:grid-cols-[10rem_1fr] lg:gap-20 xl:gap-32 xl:px-16 2xl:px-20 max-w-8xl mx-auto'>
      <div className='hidden lg:block'>
        <MenuSidebar />
      </div>
      
      {children}
    </div>
  );
};
