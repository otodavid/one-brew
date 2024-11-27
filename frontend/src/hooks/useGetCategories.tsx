import { Categories } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetCategories = () => {
  const {
    data: categories,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Categories[]> => {
      const { data } = await axios.get('http://localhost:5000/categories');
      return data;
    },
  });

  if (isError && !isLoading) {
    console.log('error in client', error);
    // throw new Error(error.message || 'An unexpected error occurred');
  }

  return { categories, isLoading, isError, error };
};
