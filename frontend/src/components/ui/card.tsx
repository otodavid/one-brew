import * as React from 'react';

import { cn } from '@/lib/utils';
import Image from 'next/image';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl bg-card text-foreground shadow overflow-hidden group',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn('font-semibold tracking-tight capitalize', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';

interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  alt: string;
}

const CardImage = React.forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, imageSrc, alt, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center pt-0 relative w-full h-60 overflow-hidden',
        className
      )}
      {...props}
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill={true}
        className='object-cover object-center group-hover:scale-105 transition-transform duration-300'
        sizes='(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         25vw'
      />
    </div>
  )
);
CardImage.displayName = 'CardImage';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardImage,
};
