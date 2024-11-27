import { CategoryType, CategoryItem } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export const useFetchCategories = () => {
  const [categories, setCategories] = useState<CategoryType>({
    drinks: [],
    food: [],
  });

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<CategoryItem[]> => {
      const { data } = await axios.get('http://localhost:5000/categories');

      return data;
    },
  });

  if (!isLoading && isError) {
    throw new Error(error.message || 'An unexpected error occurred');
  }

  if (data) {
    const drinksData = data.filter((category) => category.type === 'drinks');
    const foodData = data.filter((category) => category.type === 'food');

    setCategories((prev: CategoryType) => ({
      ...prev,

      drinks: [...drinksData],
    }));

    setCategories((prev: CategoryType) => ({
      ...prev,

      food: [...foodData],
    }));
  }

  return categories;
};
