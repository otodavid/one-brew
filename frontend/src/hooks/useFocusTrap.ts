import { FocusTrapProps } from '@/lib/types';
import { useEffect, useRef } from 'react';

type ElmentType = HTMLAnchorElement | HTMLButtonElement | HTMLInputElement;

export default function useFocusTrap({
  isComponentOpen,
  closeComponent,
  trigger,
}: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstElement = useRef<ElmentType | undefined | null>(null);
  const lastElement = useRef<ElmentType | undefined | null>(null);

  useEffect(() => {
    if (isComponentOpen) {
      const focusableElements = containerRef.current?.querySelectorAll(
        'button, a, input'
      ) as NodeListOf<ElmentType> | undefined;

      firstElement.current = focusableElements && focusableElements[0];
      lastElement.current =
        focusableElements && focusableElements[focusableElements.length - 1];
    }
  }, [isComponentOpen, containerRef]);

  useEffect(() => {
    // focus on first focusable Element
    if (isComponentOpen && firstElement.current) {
      firstElement.current.focus();
    }
  }, [isComponentOpen, firstElement]);

  useEffect(() => {
    const handleFocus = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && !e.shiftKey && e.target === lastElement.current) {
        e.preventDefault();
        firstElement.current?.focus();
      } else if (
        e.key === 'Tab' &&
        e.shiftKey &&
        e.target === firstElement.current
      ) {
        e.preventDefault();
        lastElement.current?.focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeComponent();

        trigger?.focus();
      }
    };

    document.addEventListener('keydown', handleFocus);

    return () => {
      document.removeEventListener('keydown', handleFocus);
    };
  }, [firstElement, lastElement, closeComponent, trigger]);

  return containerRef;
}
