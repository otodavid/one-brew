'use client';

import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  text: string | ReactNode;
  type: 'link' | 'button';
  style: 'primary' | 'icon';
  className?: string;
  href?: Url;
}

export const Button = ({
  text,
  type,
  style,
  className,
  href = '',
}: ButtonProps) => {
  let styles: string = '';

  switch (style) {
    case 'primary':
      styles =
        'block bg-neutral-black text-neutral-white px-8 py-3 rounded-full capitalize font-medium hover:bg-accent shadow-lg text-center';
      break;

    case 'icon':
      styles =
        'block bg-neutral-black text-neutral-white px-3 py-3 rounded-full  hover:bg-accent shadow-lg';
      break;
  }

  if (type == 'link')
    return (
      <Link href={href} className={`${styles} ${className}`}>
        {text}
      </Link>
    );

  return <button className={`${styles} ${className}`}>{text}</button>;
};
