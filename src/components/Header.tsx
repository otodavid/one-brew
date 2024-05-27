'use client';

import Link from 'next/link';
import { FaRegUserCircle, FaShoppingBag } from 'react-icons/fa';
import { IoMenuOutline } from 'react-icons/io5';
import Popover from './Popover';
import { useRef, useState } from 'react';
import { MobileNav } from './MobileNav';

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
    <header className='flex justify-between px-4 py-6 relative z-10'>
      <Link href={'/'}>One Brew</Link>

      <div className='flex justify-between gap-16'>
        <div className='relative flex gap-4'>
          <button>
            <FaShoppingBag size={18} />
          </button>

          {/* <button ref={userButtonRef} onClick={openPopOver}>
            <FaRegUserCircle size={18} />
          </button> */}

          <Popover
            trigger={userButtonRef.current}
            closeComponent={closePopOver}
            isComponentOpen={isOpen}
            className='absolute right-0 top-8 rounded-md'
          >
            <button className='block'>first</button>
            <button className='block'>Hello</button>
            <button className='block'>last</button>
          </Popover>

          <button onClick={openModal} ref={menuTriggerRef}>
            <IoMenuOutline size={18} />
          </button>

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
