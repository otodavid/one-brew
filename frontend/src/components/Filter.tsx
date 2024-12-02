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
        <Button variant='icon' size='icon' className='block mr-0 ml-auto'>
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
