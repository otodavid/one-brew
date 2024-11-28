import { getFormattedDate } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import Image from 'next/image';
import { CartItem, OrderItem } from '@/lib/types';

export const FullOrderDetail = ({ order }: { order: OrderItem }) => {
  return (
    <Dialog>
      <DialogTrigger className='bg-accent hover:accent-accent-dark px-8 py-2 rounded-full text-background w-full'>
        View Order
      </DialogTrigger>

      {/* View full order modal */}
      <DialogContent className='p-0 max-w-2xl'>
        <div className='max-h-[90svh] overflow-y-scroll px-6 py-8 space-y-6'>
          <DialogHeader>
            <DialogTitle className='uppercase text-center'>
              order details
            </DialogTitle>
          </DialogHeader>

          <div className='text-foreground text-left'>
            <div className='space-y-4'>
              <div>
                <p className='capitalize font-medium'>order number:</p>
                <p className='font-light'>{order.orderId.slice(-10)}</p>
              </div>

              <div>
                <p className='capitalize font-medium'>order date:</p>
                <p className='font-light'>
                  {getFormattedDate(order.orderDate)}
                </p>
              </div>

              <div>
                <p className='capitalize font-medium'>your details:</p>
                <p className='font-light'>{order.userEmail}</p>
              </div>
            </div>
          </div>

          {/* order summary items */}
          <div>
            <h4 className='uppercase mb-2'>order summary</h4>
            {order.products.map((item: CartItem) => (
              <div
                className='flex flex-wrap gap-4 py-6 border-t first:border-t-0 last-of-type:border-b-0 last-of-type:pb-0'
                key={item.cartProductID}
              >
                <div className='self-start relative h-20 w-20 rounded-full overflow-hidden'>
                  <Image
                    src={item.image}
                    fill={true}
                    alt={item.name}
                    className='object-cover'
                  />
                </div>
                <div className='flex-1 items-center'>
                  <div className='flex justify-between items-center mb-1 capitalize'>
                    <p>{item.name}</p>

                    <span className='font-medium'>&#36;{item.price}</span>
                  </div>

                  <div className='grid gap-1.5 font-medium'>
                    <p className='text-xs capitalize font-light'>
                      {item.categoryName}
                    </p>

                    {item.size.name && (
                      <div className='text-xs grid grid-cols-[auto_1fr_auto]  gap-2 mt-2'>
                        <p className='text-xs capitalize flex-1 font-normal'>
                          {item.size.name}
                        </p>
                        <div className='border-b border-dotted'></div>
                        <span className='font-medium'>
                          + &#36;
                          {(item.size.price - item.price).toFixed(2)}
                        </span>
                      </div>
                    )}

                    {item.addons.length > 0 && (
                      <>
                        {item.addons.map((addon: any) => (
                          <div
                            key={addon.name}
                            className='text-xs grid grid-cols-[auto_1fr_auto] gap-2'
                          >
                            <p className='flex-1 capitalize font-normal'>
                              {addon.name}
                            </p>
                            <div className='border-b border-dotted'></div>
                            <span className='font-medium'>
                              + &#36;
                              {(addon.price * addon.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </>
                    )}

                    <div className='text-xs flex justify-between mt-3'>
                      <p>Quantity</p>
                      <p className='font-medium'>x{item.quantity}</p>
                    </div>

                    <p className='mr-0 ml-auto font-medium mt-4'>
                      &#36;{item.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* summary of order charges */}
          <div className='my-4'>
            <h4 className='uppercase mb-2 border-b pb-2'>Summary of charges</h4>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <p>Subtotal:</p>
                <span className='uppercase'>
                  &#36;
                  {order.products
                    .reduce((acc, curr) => acc + curr.totalPrice, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className='flex justify-between text-sm'>
                <p>Delivery:</p>
                &#36;
                {(
                  order.orderAmount -
                  order.products.reduce((acc, curr) => acc + curr.totalPrice, 0)
                ).toFixed(2)}
              </div>
              <div className='flex justify-between'>
                <p className='font-bold'>Total:</p>
                <span className='font-bold'>
                  &#36;
                  {order.orderAmount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
