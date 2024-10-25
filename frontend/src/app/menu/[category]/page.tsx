import { CategoryProducts } from '@/components/CategoryProducts';

interface IParams {
  params: { category: string };
}

export default async function Page({ params: { category } }: IParams) {
  return (
    <section className='px-4 py-6 pb-20 xs:px-6 md:px-12 xl:px-16 2xl:px-20'>
      <CategoryProducts category={category} />
    </section>
  );
}
