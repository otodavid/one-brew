import { MenuSidebar } from '@/components/MenuSidebar';
import { ReactNode } from 'react';

export default function MenuLayout({ children }: { children: ReactNode }) {
  return (
    <div className='px-4 py-6 pb-10 min-h-[90vh] xs:px-6 md:px-12 lg:grid lg:grid-cols-[10rem_1fr] lg:gap-20 xl:gap-32 xl:px-16 2xl:px-20 max-w-8xl mx-auto'>
      <MenuSidebar />
      {children}
    </div>
  );
}
