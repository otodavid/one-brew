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
import { convertToLink, convertToText } from '@/lib/utils';
import Link from 'next/link';
import { ProductSummary } from '@/lib/types';

export const ProductCard = ({
  id,
  name,
  categoryName,
  description,
  image,
  price,
}: ProductSummary) => {
  return (
    <Card>
      <Link href={`/products/${id}`} className='grid'>
        <CardImage imageSrc={image} alt={name} />

        <CardHeader className='py-0 pt-6'>
          <CardTitle className='capitalize'>{convertToText(name)}</CardTitle>
          <CardDescription className='capitalize font-light'>
            {categoryName}
          </CardDescription>
        </CardHeader>

        <CardContent className='flex justify-between items-center flex-wrap pt-6'>
          <p className=''>${price.toFixed(2)}</p>
          <Button>
            <BiSolidMagicWand size={'16'} className='mr-1.5' /> Customize
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
};
