import {  convertToText } from '@/lib/helpers';
import { CategoryProducts } from '@/components/CategoryProducts';

interface IParams {
  params: { category: string };
}

export default async function Page({ params: { category } }: IParams) {
  return (
    <section className='px-4 py-6'>
      <h2 className='capitalize font-bold text-xl'>
        {convertToText(category)}
      </h2>

      <CategoryProducts category={category} />
    </section>
  );
}
