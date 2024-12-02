'use client'; // Error boundaries must be Client Components

import Image from 'next/image';
import { useEffect } from 'react';
import errorImage from '/public/error.svg';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; statusCode?: number };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const getErrorMessage = () => {
    if (error.statusCode === 404) {
      return 'The page you’re looking for was not found.';
    }
    if (error.statusCode === 500) {
      return 'There was a problem with our server. Please try again later.';
    }
    if (error.message.includes('Network')) {
      return 'There was a network issue. Please check your connection.';
    }
    return 'An unexpected error occurred. Please try again.';
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-[80vh] p-4'>
      {error.statusCode ? (
        <h2 className='text-center text-4xl text-opacity-80'>
          {error.statusCode}
        </h2>
      ) : (
        <h2>Something went wrong</h2>
      )}
      
      <p className='text-center'>{getErrorMessage()}</p>
      <Image src={errorImage} alt='error page illustration' />
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
