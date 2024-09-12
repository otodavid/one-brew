import { createPortal } from 'react-dom';
import { PopOverProps } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import useFocusTrap from '@/hooks/useFocusTrap';

export function Modal({
  isComponentOpen,
  closeComponent,
  children,
  portalId,
  trigger,
}: PopOverProps) {
  const modalWrapperRef = useFocusTrap({
    isComponentOpen,
    closeComponent,
    trigger,
  });

  if (typeof window !== 'undefined')
    return createPortal(
      <AnimatePresence mode='wait'>
        {isComponentOpen && (
          <motion.div
            key={isComponentOpen ? 'modal-open' : 'modal-closed'}
            role='dialog'
            aria-modal='true'
            aria-labelledby={portalId}
            id={portalId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
            }}
            className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-50'
            transition={{ duration: 0.3 }}
            ref={modalWrapperRef}
          >
            <div>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );
}
