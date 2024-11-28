'use client';

import Link from 'next/link';
import { IoBag, IoMenuOutline } from 'react-icons/io5';
import { useRef, useState } from 'react';
import { MobileNav } from './MobileNav';
import { Button } from './ui/button';
import { NAVLINKS } from '@/lib/constants';
import { UserLogin } from './UserLogin';
import { useAppSelector } from '@/store/hooks';
import { selectCart } from '@/store/features/cartSlice';
import { useUser } from '@auth0/nextjs-auth0/client';
import { selectUser } from '@/store/features/userSlice';
import Image from 'next/image';
import logo from '/public/logo.svg';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const cart = useAppSelector(selectCart);
  const { user, error, isLoading } = useUser();
  const userInfo = useAppSelector(selectUser);
  const pathname = usePathname();

  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  if (error) throw new Error(error.message || 'An unexpected error occurred');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(pathname.split('/')[1]);

  return (
    <header className='z-10 border-b'>
      <div className='flex justify-between items-center flex-wrap px-4 py-4 relative max-w-8xl mx-auto xs:px-6 md:px-12 xl:px-16 2xl:px-20'>
        <Link href={'/'}>
          <Image src={logo} alt='One Brew logo' width={120} />
        </Link>

        <div className='flex justify-between gap-16 items-center'>
          <ul className='hidden md:flex md:gap-12 items-center'>
            {NAVLINKS.map((navLink) => (
              <li key={navLink.name} className='hover:text-primary'>
                <Link
                  href={navLink.link}
                  className={`capitalize font-medium hover:text-accent  ${
                    pathname.split('/')[1] === navLink.name
                      ? 'text-accent'
                      : pathname === navLink.link
                      ? 'text-accent'
                      : 'text-foreground'
                  } `}
                >
                  {navLink.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className='relative flex items-center gap-4'>
            <div className='hidden md:block'>
              <UserLogin />
            </div>

            <Button asChild variant={'icon'} size={'icon'}>
              <Link href='/cart' className='relative'>
                <span className='text-background absolute bottom-1.5 text-[.5rem]'>
                  {cart.length}
                </span>
                <IoBag size={20} />
              </Link>
            </Button>

            <Button
              onClick={openModal}
              ref={menuTriggerRef}
              variant={'icon'}
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
      </div>
    </header>
  );
}
