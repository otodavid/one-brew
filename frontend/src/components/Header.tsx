'use client';

import Link from 'next/link';
import { FaRegUserCircle, FaShoppingBag } from 'react-icons/fa';
import { IoMenuOutline } from 'react-icons/io5';
import Popover from './Popover';
import { useRef, useState } from 'react';
import { MobileNav } from './MobileNav';
import { Button } from './ui/button';
import { NAVLINKS } from '@/lib/constants';

export default function Header() {
  const userButtonRef = useRef<HTMLButtonElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const openPopOver = () => {
    setIsOpen(true);
  };

  const closePopOver = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className='flex justify-between items-center px-4 py-4 relative z-10 border-b xs:px-6 md:px-12 xl:px-16 2xl:px-20'>
      <Link href={'/'}>One Brew</Link>

      <div className='flex justify-between gap-16 items-center'>
        <ul className='hidden md:flex md:gap-12 items-center'>
          {NAVLINKS.map(({ name, link }) => (
            <li key={name} className='hover:text-primary'>
              <Link href={link} className='capitalize font-medium'>
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <div className='relative flex gap-4'>
          <Button asChild variant={'ghost'} size={'icon'}>
            <Link href='/cart'>
              <FaShoppingBag size={20} />
            </Link>
          </Button>

          {/* <button ref={userButtonRef} onClick={openPopOver}>
            <FaRegUserCircle size={18} />
          </button> */}

          <Button
            onClick={openModal}
            ref={menuTriggerRef}
            variant={'ghost'}
            size={'icon'}
            className='md:hidden'
          >
            <IoMenuOutline size={20} />
          </Button>

          <MobileNav
            closeComponent={closeModal}
            isComponentOpen={isModalOpen}
            trigger={menuTriggerRef.current}
          />
        </div>
      </div>
    </header>
  );
}
