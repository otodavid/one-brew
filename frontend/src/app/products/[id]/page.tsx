import { DisplayProduct } from '@/components/DisplayProduct';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <DisplayProduct productId={id} />
    </>
  );
}
