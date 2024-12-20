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
import { NAVLINKS } from '@/lib/constants';
import { Modal } from './Modal';
import useClickOutside from '@/hooks/useClickOutside';
import { Button } from './ui/button';
import { useUser } from '@auth0/nextjs-auth0/client';
import { FaBoxOpen } from 'react-icons/fa6';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/features/userSlice';
import { Accordion, AccordionTrigger } from './ui/accordion';
import { ImProfile } from 'react-icons/im';
import { AccordionContent, AccordionItem } from '@radix-ui/react-accordion';
import { FaRegUserCircle } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const MotionButton = motion(Button);

export function MobileNav({
  isComponentOpen,
  closeComponent,
  trigger,
}: FocusTrapProps) {
  const ref = useClickOutside({ isComponentOpen, closeComponent });
  const { user } = useUser();
  const userInfo = useAppSelector(selectUser);
  const pathname = usePathname();

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
        className='w-3/4 min-h-svh bg-white mr-0 ml-auto py-6'
        ref={ref}
      >
        <MotionButton
          variant={'outline'}
          size='icon'
          variants={closeButtonVariant}
          onClick={closeComponent}
          className='mr-6 ml-auto'
        >
          <FaXmark size={16} />
        </MotionButton>

        <motion.ul
          className='mt-8 px-6'
          key={isComponentOpen ? 'present' : 'empty'}
          variants={menuVariant}
          initial={'closed'}
          animate={'open'}
          exit={'closed'}
        >
          {NAVLINKS.map((navLink) => (
            <motion.li
              key={navLink.name}
              variants={menuItemVariant}
              className='mb-6'
            >
              <Link
                href={navLink.link}
                className={`flex items-center gap-2 capitalize font-medium ${
                  pathname === navLink.link
                    ? 'text-foreground'
                    : 'text-foreground'
                }`}
                onClick={closeComponent}
              >
                {<navLink.icon />}
                {navLink.name}
              </Link>
            </motion.li>
          ))}
          {user && (
            <motion.li variants={menuItemVariant} className=''>
              <Accordion asChild type='single' collapsible>
                <AccordionItem value='my account'>
                  <AccordionTrigger className='py-0'>
                    <p className='flex items-center gap-2 capitalize font-medium text-base'>
                      <FaRegUserCircle size={18} />
                      My Account
                    </p>
                  </AccordionTrigger>

                  <AccordionContent>
                    <ul className='py-4 px-4'>
                      <motion.li variants={menuItemVariant}>
                        <Link
                          href={'/account/profile'}
                          className='flex items-center gap-2 text-sm mb-4'
                          onClick={closeComponent}
                        >
                          <ImProfile size={14} />
                          Profile
                        </Link>
                      </motion.li>
                      <motion.li variants={menuItemVariant}>
                        <Link
                          href={'/account/orders'}
                          className='flex items-center gap-2 text-sm'
                          onClick={closeComponent}
                        >
                          <FaBoxOpen size={14} />
                          My Orders
                        </Link>
                      </motion.li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.li>
          )}
        </motion.ul>

        <div className='fixed bottom-6 left-6 right-6'>
          {!user ? (
            <>
              <Button className='block mb-2 w-full p-0'>
                <a href={'/api/auth/login'} className='w-full block p-2'>
                  Log in
                </a>
              </Button>

              <p className='text-center text-sm'>
                Don&apos;t have an account?{' '}
                <a
                  href='/api/auth/signup'
                  className='font-bold text-foreground hover:underline'
                >
                  Create Account
                </a>
              </p>
            </>
          ) : (
            <a
              href={'/api/auth/logout'}
              className='block text-center w-4/5 bg-destructive text-destructive-foreground mx-auto mb-6 rounded-full p-2 mt-10'
            >
              Log out
            </a>
          )}
        </div>
      </motion.div>
    </Modal>
  );
}
