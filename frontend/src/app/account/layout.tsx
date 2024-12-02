'use client';

import { selectUser } from '@/store/features/userSlice';
import { useAppSelector } from '@/store/hooks';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { CiLogout } from 'react-icons/ci';
import { FaUserCircle } from 'react-icons/fa';
import { FaBoxOpen } from 'react-icons/fa6';
import { FiUser } from 'react-icons/fi';

export default function AccountLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { user } = useUser();
  const pathname = usePathname();
  const userInfo = useAppSelector(selectUser);

  return (
    <div className='lg:relative lg:flex lg:gap-16 px-4 xs:px-6 md:px-12 xl:px-16 2xl:px-20 max-w-8xl mx-auto my-10 min-h-[80vh]'>
      <div className='hidden lg:bg-card lg:relative lg:block lg:w-[35%] lg:max-w-[20rem] lg:min-h-[30rem] lg:rounded-xl lg:overflow-hidden'>
        {user && (
          <div className='px-4 pb-4 py-6  border-b grid grid-cols-[auto_1fr] items-center gap-x-2 break-words'>
            <div className='text-primary-light'>
              <FaUserCircle size={56} />
            </div>
            <div className='break-words'>
              <p className='break-all tracking-tight'>
                <span className='text-xs font-light block capitalize'>
                  Hi,{' '}
                </span>

                <span className='capitalize font-medium'>
                  {userInfo.firstName ?? userInfo.email ?? user?.email}
                </span>
              </p>
            </div>
          </div>
        )}

        <ul className='mt-4 space-y-4'>
          <li>
            <Link
              href={'/account/profile'}
              className={`flex items-center px-4 py-2 border-l-2 ${
                pathname.split('/')[2] === 'profile'
                  ? 'text-accent border-l-accent font-semibold'
                  : 'hover:text-accent border-l-transparent'
              }`}
            >
              <FiUser className='mr-2 h-4 w-4' />
              Profile
            </Link>
          </li>
          <li>
            <Link
              href={'/account/orders'}
              className={`flex items-center px-4 py-2 border-l-2 ${
                pathname.split('/')[2] === 'orders'
                  ? 'text-accent border-l-accent font-semibold'
                  : 'hover:text-accent border-l-transparent'
              }`}
            >
              <FaBoxOpen className='mr-2 h-4 w-4' />
              My Orders
            </Link>
          </li>
          <li className='absolute bottom-0 flex items-center px-4 py-3 bg-destructive text-destructive-foreground w-full'>
            <CiLogout className='mr-2 h-4 w-4' />
            <a href='/api/auth/logout' className='block w-full'>
              Log out
            </a>
          </li>
        </ul>
      </div>
      <div className='lg:w-[65%] '>{children}</div>
    </div>
  );
}
