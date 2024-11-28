import { CategoryProducts } from '@/components/CategoryProducts';

interface Props {
  params: { category: string; id: string };
}

export default async function Page({ params: { category, id } }: Props) {
  return (
    <section className='px-4 py-0 pb-20 xs:px-6 md:px-12 xl:px-16 2xl:px-20'>
      <CategoryProducts categoryName={category} categoryId={id} />
    </section>
  );
}
