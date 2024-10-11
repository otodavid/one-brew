'use client';

import { convertToLink, convertToText } from '@/lib/helpers';
import { ICategories, ICategoryItem } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MenuSidebar } from './MenuSidebar';
import { MainMenu } from './MainMenu';

export const Categories = () => {
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

  return (
    <div className='lg:grid lg:grid-cols-[10rem_1fr] lg:gap-20 xl:gap-32'>
      <MenuSidebar categories={categories} />
      <MainMenu categories={categories} />
    </div>
  );
};
