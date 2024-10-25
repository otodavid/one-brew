'use-client';

import { useEffect } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { FocusTrapProps } from '@/lib/types';
import {
  menuVariant,
  menuItemVariant,
  sideNavVariant,
  closeButtonVariant,
} from '@/lib/animations';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVLINKS } from '@/lib/constants';
import { Modal } from './Modal';
import useClickOutside from '@/hooks/useClickOutside';
import { Button } from './ui/button';
import { useUser } from '@auth0/nextjs-auth0/client';
import { FiUser } from 'react-icons/fi';
import { FaBoxOpen } from 'react-icons/fa6';

const MotionButton = motion(Button);

export function MobileNav({
  isComponentOpen,
  closeComponent,
  trigger,
}: FocusTrapProps) {
  const ref = useClickOutside({ isComponentOpen, closeComponent });
  const { user } = useUser();

  useEffect(() => {
    const bodyElement = document.querySelector('body') as HTMLBodyElement;

    if (isComponentOpen) {
      bodyElement.style.height = '100vh';
      bodyElement.style.overflow = 'hidden';
    } else {
      bodyElement.style.height = 'auto';
      bodyElement.style.overflow = 'visible';
    }
  }, [isComponentOpen]);

  return (
    <Modal
      isComponentOpen={isComponentOpen}
      closeComponent={closeComponent}
      portalId='Mobile-navigation'
      trigger={trigger}
      className='block'
    >
      <motion.div
        variants={sideNavVariant}
        initial={'hidden'}
        animate='visible'
        exit={'exit'}
        className='w-3/4 h-screen bg-white mr-0 ml-auto py-6'
        ref={ref}
      >
        <MotionButton
          variant={'outline'}
          size='icon'
          variants={closeButtonVariant}
          onClick={closeComponent}
          className='mr-6 ml-auto'
        >
          <FaXmark size={'1rem'} />
        </MotionButton>

        <motion.ul
          className='mt-8 px-6'
          key={isComponentOpen ? 'present' : 'empty'}
          variants={menuVariant}
          initial={'closed'}
          animate={'open'}
          exit={'closed'}
        >
          {NAVLINKS.map(({ name, link }) => (
            <motion.li key={name} variants={menuItemVariant} className='mb-6'>
              <Link
                href={link}
                className='capitalize font-medium'
                onClick={closeComponent}
              >
                {name}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {user && (
          <div className='fixed bottom-0 right-0 left-0 border-t px-6 py-4 bg-black/5'>
            <h3>My Account</h3>
            <p className='pt-2 pb-6'>Hey, {user.email}</p>
            <ul>
              <li>
                <Link
                  href={'/account/profile'}
                  className='flex items-center mb-4'
                  onClick={closeComponent}
                >
                  <FiUser className='mr-2 h-4 w-4' />
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href={'/account/orders'}
                  className='flex items-center'
                  onClick={closeComponent}
                >
                  <FaBoxOpen className='mr-2 h-4 w-4' />
                  My Orders
                </Link>
              </li>
            </ul>

            <Link legacyBehavior href={'/api/auth/logout'} passHref>
              <a className='block text-center w-4/5 bg-primary text-background mx-auto mb-6 rounded-full p-2 mt-10'>
                Log out
              </a>
            </Link>
          </div>
        )}

        <div className='fixed bottom-6 left-6 right-6'>
          {!user && (
            <>
              <Link legacyBehavior href={'/api/auth/login'} passHref>
                <a className='block text-center w-full bg-primary text-background mx-auto mb-6 rounded-full p-2'>
                  Log in
                </a>
              </Link>

              <p className='text-center text-sm'>
                Don&apos;t have an account?{' '}
                <Link legacyBehavior href='/api/auth/signup'>
                  <a className='font-bold text-primary hover:underline'>
                    Create Account
                  </a>
                </Link>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </Modal>
  );
}
