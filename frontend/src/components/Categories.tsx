'use client';

import { convertToLink, convertToText } from '@/lib/helpers';
import { ICategories, ICategoryItem } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MenuSidebar } from './MenuSidebar';
import { MainMenu } from './MainMenu';
import { useFetchCategories } from '@/hooks/useFetchCategories';

export const Categories = () => {
  const categories = useFetchCategories();

  return (
    <div className='lg:grid lg:grid-cols-[10rem_1fr] lg:gap-20 xl:gap-32'>
      <MenuSidebar categories={categories} />
      <MainMenu categories={categories} />
    </div>
  );
};
