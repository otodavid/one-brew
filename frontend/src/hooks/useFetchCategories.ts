import { ICategories, ICategoryItem } from '@/lib/types';
import { useEffect, useState } from 'react';

export const useFetchCategories = () => {
  const [categories, setCategories] = useState<ICategories>({
    drinks: [],
    food: [],
  });
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/categories', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data: ICategoryItem[] = await res.json();

        const drinksData = data.filter(
          (category) => category.type === 'drinks'
        );
        const foodData = data.filter((category) => category.type === 'food');

        setCategories((prev: ICategories) => ({
          ...prev,

          drinks: [...drinksData],
        }));

        setCategories((prev: ICategories) => ({
          ...prev,

          food: [...foodData],
        }));
      } catch (err) {
        console.log('Could not fetch data');
      }
    };

    fetchCategories();
  }, []);

  return categories;
};
