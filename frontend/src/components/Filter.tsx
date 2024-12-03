import React from 'react';
import { MenuSidebar } from './MenuSidebar';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { IoFilterCircleOutline } from 'react-icons/io5';

export const Filter = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='icon'
          className='text-accent flex items-center gap-1 mr-0 ml-auto'
        >
          <p>Filter</p>
          <IoFilterCircleOutline size={18} />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className='my-4'>
          <SheetTitle>Filter</SheetTitle>
          <SheetDescription className='sr-only'>
            Filter through all the products using their categories or by viewing
            them all
          </SheetDescription>
        </SheetHeader>

        <MenuSidebar />
      </SheetContent>
    </Sheet>
  );
};
