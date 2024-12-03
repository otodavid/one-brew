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
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/features/userSlice';
import { FaRegUserCircle } from 'react-icons/fa';

export const UserLogin = () => {
  const { user, error, isLoading } = useUser();
  const userInfo = useAppSelector(selectUser);

  if (error) throw new Error(error.message || 'An unexpected error occurred');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className='px-2'>
          <FaRegUserCircle size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 text-foreground text-sm'>
        {user ? (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className='bg-foreground/5' />
            <DropdownMenuGroup>
              <DropdownMenuItem className='hover:bg-transparent focus:bg-transparent'>
                <Link
                  href={'/account/profile'}
                  className='flex items-center gap-2 hover:text-accent'
                >
                  <FiUser className='h-4 w-4' />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className='hover:bg-transparent focus:bg-transparent'>
                <Link
                  href={'/account/orders'}
                  className='flex items-center gap-2 hover:text-accent'
                >
                  <FaBoxOpen className='h-4 w-4' />
                  My Orders
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className='bg-foreground/5' />
            <DropdownMenuItem className='hover:bg-transparent focus:bg-transparent'>
              <a
                href='/api/auth/logout'
                className='text-destructive flex items-center gap-2 py-2'
              >
                <CiLogout className='h-4 w-4' />
                Log out
              </a>
            </DropdownMenuItem>
          </>
        ) : (
          <div className='py-2 px-2'>
            <DropdownMenuItem className='hover:bg-transparent focus:bg-transparent hover:text-foreground justify-center'>
              <Button variant={'outline'} className='w-full p-0' size={'sm'}>
                <a href='/api/auth/login' className='p-3 w-full'>
                  Log in
                </a>
              </Button>
            </DropdownMenuItem>
            <p className='text-center border-b pb-2 text-sm'>or</p>
            <DropdownMenuItem className='hover:bg-transparent focus:bg-transparent hover:text-foreground justify-center pt-2'>
              <Button variant={'default'} className='w-full p-0' size={'sm'}>
                <a href='/api/auth/signup' className='p-3 w-full'>
                  Create account
                </a>
              </Button>
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
