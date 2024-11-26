import Image from 'next/image';
import Link from 'next/link';
import notFoundImage from '/public/404.svg';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center min-h-[90vh]'>
      <Image src={notFoundImage} alt='404 image' />
      <Button asChild className='mt-4'>
        <Link href='/'>Go to Homepage</Link>
      </Button>
    </div>
  );
}
