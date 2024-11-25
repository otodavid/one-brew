'use client';

import { FullOrderDetail } from '@/components/FullOrderDetail';
import { OrdersSkeletonLoader } from '@/components/Loaders/OrdersSkeletonLoader';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { OrderItem } from '@/lib/types';
import { getFormattedDate } from '@/lib/utils';
import { selectUser } from '@/store/features/userSlice';
import { useAppSelector } from '@/store/hooks';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { toast } from 'sonner';

export default function Orders() {
  const userInfo = useAppSelector(selectUser);

  const {
    data: orders,
    isPending,
    error,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: async (): Promise<OrderItem[]> => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/orders`,
        { params: { email: userInfo.email } }
      );

      return data;
    },

    enabled: !!userInfo.email,
  });

  if (isPending) {
    return <OrdersSkeletonLoader />;
  }

  if (error) {
    toast.error('Somethin went wrong, please refresh and try again');
  }

  return (
    <div className='px-4'>
      <h3>My Orders</h3>

      {orders && (
        <div className='grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-6 py-6 mt-3 items-start'>
          {orders.length > 0 ? (
            orders.map((order: OrderItem) => (
              <Card key={order.orderId}>
                <CardHeader className=''>
                  <div className='flex flex-wrap gap-y-1 gap-x-4'>
                    <div className='relative w-12 aspect-square'>
                      <Image
                        src={order.products[0].image}
                        alt={order.products[0].name}
                        fill={true}
                      />
                    </div>
                    <div>
                      <p className='font-semibold'>
                        Order ID:{' '}
                        <span className='font-normal'>
                          {order.orderId.slice(-10)}
                        </span>
                      </p>
                      <p className='font-semibold'>
                        Purchased:{' '}
                        <span className='font-normal'>
                          {getFormattedDate(order.orderDate)}
                        </span>
                      </p>
                    </div>
                  </div>
                </CardHeader>

                {/* basic order summary */}
                <CardContent className='p-0'>
                  <ul className='border-y p-6 space-y-1'>
                    {order.products.map((item) => (
                      <li
                        key={item.cartProductID}
                        className='flex justify-between'
                      >
                        <span className='capitalize'>{item.name}</span>
                        <span className='font-medium'>
                          &#36;{item.totalPrice.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className='flex justify-between p-6'>
                    <span>{order.products.length} item(s)</span>
                    <span className='font-medium'>
                      &#36;{order.orderAmount}
                    </span>
                  </div>
                  <p></p>
                </CardContent>

                <CardFooter>
                  <FullOrderDetail order={order} />
                </CardFooter>
              </Card>
            ))
          ) : (
            <div>No orders yet.</div>
          )}
        </div>
      )}
    </div>
  );
}
