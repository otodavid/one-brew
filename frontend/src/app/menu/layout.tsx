'use client';

import { MenuSidebar } from '@/components/MenuSidebar';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';

export default function MenuLayout({ children }: { children: ReactNode }) {
  const {
    data: categories,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/categories');
      return await res.json();
    },
  });

  if (isError && !isLoading) {
    return <div>An Error occured</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='px-4 py-6 pb-10 xs:px-6 md:px-12 lg:grid lg:grid-cols-[10rem_1fr] lg:gap-20 xl:gap-32 xl:px-16 2xl:px-20'>
      <MenuSidebar categories={categories} />
      {children}
    </div>
  );
}
