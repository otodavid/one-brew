import { useEffect, useRef } from 'react';

interface Props {
  isComponentOpen: boolean;
  closeComponent: () => void;
}

export default function useClickOutside({
  isComponentOpen,
  closeComponent,
}: Props) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        isComponentOpen &&
        elementRef &&
        !elementRef.current?.contains(event.target as Node) 
      ) {
        // Handle logic for click outside the div
        closeComponent();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isComponentOpen, closeComponent]);

  return elementRef;
}
