'use-client';

import { useEffect } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { FocusTrapProps } from '@/utils/types';
import {
  menuVariant,
  menuItemVariant,
  sideNavVariant,
  closeButtonVariant,
} from '@/utils/animations';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVLINKS } from '@/utils/constants';
import { Modal } from './Modal';
import { Button } from './Button';
import useClickOutside from '@/hooks/useClickOutside';

export function MobileNav({
  isComponentOpen,
  closeComponent,
  trigger,
}: FocusTrapProps) {
  const ref = useClickOutside({ isComponentOpen, closeComponent });

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
        className='w-3/5 h-screen bg-white mr-0 ml-auto p-6'
        ref={ref}
      >
        <motion.button
          variants={closeButtonVariant}
          onClick={closeComponent}
          className='mr-0 ml-auto'
        >
          <FaXmark size={'1rem'} />
        </motion.button>

        <motion.ul
          className='mt-8'
          key={isComponentOpen ? 'present' : 'empty'}
          variants={menuVariant}
          initial={'closed'}
          animate={'open'}
          exit={'closed'}
        >
          {NAVLINKS.map(({ name, link }) => (
            <motion.li key={name} variants={menuItemVariant} className='mb-4'>
              <Link
                href={link}
                className='capitalize text-[#240404] font-medium'
                onClick={closeComponent}
              >
                {name}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        <div className='fixed bottom-6 left-6 right-6'>
          <Button
            style='primary'
            type='link'
            href='login'
            text='Log in'
            className='mb-4'
          />

          <p className='text-center'>
            Don&apos;t have an account?{' '}
            <Link href='login' className='text-accent font-bold'>
              Sign up
            </Link>{' '}
            here
          </p>
        </div>
      </motion.div>
    </Modal>
  );
}
