import useClickOutside from '@/hooks/useClickOutside';
import useFocusTrap from '@/hooks/useFocusTrap';
import { PopOverProps } from '@/lib/types';

export default function Popover({
  trigger,
  closeComponent,
  isComponentOpen,
  className,
  children,
}: PopOverProps) {
  const popOverContentRef = useFocusTrap({
    isComponentOpen,
    closeComponent,
    trigger,
  });
  const popOverWrapperRef = useClickOutside({
    isComponentOpen,
    closeComponent,
  });

  if (!isComponentOpen) return null;

  return (
    <div ref={popOverWrapperRef} className={`shadow-lg p-4 ${className}`}>
      <div ref={popOverContentRef}>{children}</div>
    </div>
  );
}
