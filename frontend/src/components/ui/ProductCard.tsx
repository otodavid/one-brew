import { IoMdAdd } from 'react-icons/io';
import { Button } from './button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardImage,
  CardTitle,
} from './card';
import { BiSolidMagicWand } from 'react-icons/bi';
import { convertToLink, sanitizeData } from '@/lib/helpers';
import Link from 'next/link';
import { IProduct } from '@/lib/types';

export const ProductCard = ({
  id,
  name,
  category,
  description,
  image,
  price,
}: {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  price: string | number;
}) => {
  return (
    <Card>
      <CardImage imageSrc={image} alt={name} />

      <CardHeader>
        <CardTitle className='capitalize'>{sanitizeData(name)}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className='flex justify-between  items-center flex-wrap gap-3 mt-2'>
        <p className='font-bold'>
          <span className='text-xs font-extralight'>Starts at </span>${price}
        </p>
        <Button asChild={true}>
          <Link href={`/menu/${category}/${id}/${convertToLink(name)}`}>
            <BiSolidMagicWand size={'16'} className='mr-1.5' /> Customize
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
