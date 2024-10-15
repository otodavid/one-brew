'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { FiUser } from 'react-icons/fi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { FaBoxOpen } from 'react-icons/fa6';
import { CiLogout } from 'react-icons/ci';

export const UserLogin = () => {
  const { user, error, isLoading } = useUser();

  if (error) return <div>{error.message}</div>;

  return (
    <div className='hidden md:text-white md:py-0.5 md:flex-auto md:w-full md:flex md:gap-2 md:items-center md:justify-end bg-primary xs:px-6 md:px-12 xl:px-16 2xl:px-20'>
      {isLoading ? (
        <>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            version='1.0'
            width='16px'
            height='16px'
            viewBox='0 0 128 128'
          >
            <path
              fill='#ffffff'
              d='M64.4 16a49 49 0 0 0-50 48 51 51 0 0 0 50 52.2 53 53 0 0 0 54-52c-.7-48-45-55.7-45-55.7s45.3 3.8 49 55.6c.8 32-24.8 59.5-58 60.2-33 .8-61.4-25.7-62-60C1.3 29.8 28.8.6 64.3 0c0 0 8.5 0 8.7 8.4 0 8-8.6 7.6-8.6 7.6z'
            >
              <animateTransform
                attributeName='transform'
                type='rotate'
                from='0 64 64'
                to='360 64 64'
                dur='1400ms'
                repeatCount='indefinite'
              ></animateTransform>
            </path>
          </svg>
          <p>Loading...</p>
        </>
      ) : user ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={'link'}
                className='text-white hover:no-underline text-sm'
              >
                {' '}
                <FiUser className='mr-2' /> Hey, {user.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 text-foreground text-sm'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className='bg-foreground/5' />
              <DropdownMenuGroup>
                <DropdownMenuItem className='hover:bg-transparent focus:bg-transparent hover:text-primary'>
                  <FiUser className='mr-2 h-4 w-4' />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className='hover:bg-transparent focus:bg-transparent hover:text-primary'>
                  <FaBoxOpen className='mr-2 h-4 w-4' />
                  <span>My Orders</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className='bg-foreground/5' />
              <DropdownMenuItem className='hover:bg-transparent focus:bg-transparent hover:text-primary'>
                <CiLogout className='mr-2 h-4 w-4' />
                <Link legacyBehavior href='/api/auth/logout' passHref>
                  <a className='hover:text-primary'>Log out</a>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <div className='flex gap-2 items-center'>
          <Link legacyBehavior href='/api/auth/login' passHref>
            <a className='text-primary bg-white rounded-full px-5 py-1 my-1'>
              Log in
            </a>
          </Link>
          <span>or</span>
          <Link href={'/api/auth/login'} className='hover:no-underline'>
            Create account
          </Link>
        </div>
      )}
    </div>
  );
};
