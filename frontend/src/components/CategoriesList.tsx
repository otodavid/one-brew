'use client';

import { MenuSidebar } from './MenuSidebar';
import { MainMenu } from './MainMenu';
import { useFetchCategories } from '@/hooks/useFetchCategories';
import { useQuery } from '@tanstack/react-query';

export const CategoriesList = () => {
  const {
    data: categories,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['products'],
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
    <div>
      <MainMenu categories={categories} />
    </div>
  );
};
