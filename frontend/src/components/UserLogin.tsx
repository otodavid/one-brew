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
              <DropdownMenuItem className='hover:bg-transparent focus:bg-transparent hover:text-primary'>
                <FiUser className='mr-2 h-4 w-4' />
                <Link href={'account/profile'}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className='hover:bg-transparent focus:bg-transparent hover:text-primary'>
                <FaBoxOpen className='mr-2 h-4 w-4' />
                <Link href={'/account/orders'}>My Orders</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className='bg-foreground/5' />
            <DropdownMenuItem className='hover:bg-transparent focus:bg-transparent hover:text-primary'>
              <CiLogout className='mr-2 h-4 w-4' />
              <Link legacyBehavior href='/api/auth/logout' passHref>
                <a className='hover:text-primary'>Log out</a>
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <div className='py-2 px-2'>
            <DropdownMenuItem className='hover:bg-transparent focus:bg-transparent hover:text-primary justify-center'>
              <Link legacyBehavior href='/api/auth/logout' passHref>
                <a className='hover:text-primary border rounded-full px-4 py-2 border-primary w-full text-center'>
                  Log in
                </a>
              </Link>
            </DropdownMenuItem>
            <p className='text-center border-b pb-2 text-sm'>or</p>
            <DropdownMenuItem className='hover:bg-transparent focus:bg-transparent hover:text-primary justify-center pt-2'>
              <Link legacyBehavior href='/api/auth/logout' passHref>
                <a className='bg-primary text-background text-center px-4 py-2 rounded-full w-full'>
                  Create account
                </a>
              </Link>
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
