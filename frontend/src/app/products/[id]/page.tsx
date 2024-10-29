import { DisplayProduct } from '@/components/DisplayProduct';

export default async function Page({
  params,
}: {
  params: { category: string; id: string; product: string };
}) {
  const { id } = params;

  return (
    <>
      <DisplayProduct productId={id} />
    </>
  );
}
