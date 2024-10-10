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

const MotionButton = motion(Button);

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
        <MotionButton
          variant={'outline'}
          size='icon'
          variants={closeButtonVariant}
          onClick={closeComponent}
          className='mr-0 ml-auto'
        >
          <FaXmark size={'1rem'} />
        </MotionButton>

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
                className='capitalize font-medium'
                onClick={closeComponent}
              >
                {name}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        <div className='fixed bottom-6 left-6 right-6'>
          <Button asChild className='mb-4 w-full'>
            <Link href={'login'}>Log in</Link>
          </Button>

          <p className='text-center'>
            Don&apos;t have an account?{' '}
            <Link
              href='login'
              className='font-bold text-primary hover:underline'
            >
              Sign up{' '}
            </Link>
            here
          </p>
        </div>
      </motion.div>
    </Modal>
  );
}
