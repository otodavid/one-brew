import { CartItem } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { removeFromCart, selectCart } from '@/store/features/cartSlice';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { selectUser } from '@/store/features/userSlice';
import { toast } from 'sonner';
import { saveToLocalStorage } from '@/lib/utils';

interface Props {
  item: CartItem;
  isEditable?: boolean;
}

export const CartItemComponent = ({ item, isEditable = true }: Props) => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUser);
  const cart = useAppSelector(selectCart);

  const { mutate } = useMutation({
    mutationFn: async ({
      email,
      cartProductID,
    }: {
      email: string;
      cartProductID: string;
    }) => {
      const data = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/cart/delete-item`,
        {
          email,
          cartProductID,
        }
      );

      return data.data;
    },

    onSuccess: (data) => {
      dispatch(removeFromCart(item.cartProductID));

      toast.success('Item removed successfully', {
        className: 'toast-style',
      });
    },

    onError: (error) => {
      console.log(item.cartProductID);
      toast.error('Could not remove item from cart', {
        className: 'toast-style',
      });
    },
  });

  const handleDeleteFromCart = () => {
    if (userInfo.email) {
      mutate({ email: userInfo.email, cartProductID: item.cartProductID });
    } else {
      dispatch(removeFromCart(item.cartProductID));
      saveToLocalStorage(cart);
    }
  };

  return (
    <div className='flex flex-wrap gap-4 py-4 border-t first:border-t-0 last-of-type:border-b-0'>
      <div className='self-start relative h-20 w-20 rounded-full overflow-hidden'>
        <Image
          src={item.image}
          fill={true}
          alt={item.name}
          className='object-cover'
        />
      </div>
      <div className='flex-1 items-center'>
        <div className='flex justify-between items-center mb-1'>
          <Link
            href={`/products/${item.id}`}
            className='capitalize font-medium'
          >
            {item.name}
          </Link>

          <span className='font-semibold w-16'>&#36; {item.price}</span>
        </div>

        <div className='grid gap-1.5 font-medium'>
          <p className='text-xs capitalize font-light'>{item.categoryName}</p>

          {item.size.name && (
            <div className='text-xs grid grid-cols-[auto_1fr_auto]  gap-2 mt-2'>
              <p className='text-xs capitalize flex-1 font-normal'>
                {item.size.name}
              </p>
              <div className='border-b border-dotted'></div>
              <span className='font-semibold'>
                + &#36; {(item.size.price - item.price).toFixed(2)}
              </span>
            </div>
          )}
          {item.addons.length > 0 && (
            <>
              {item.addons.map((addon) => (
                <div
                  key={addon.name}
                  className='text-xs grid grid-cols-[auto_1fr_auto] gap-2'
                >
                  <p className='flex-1 capitalize font-normal'>{addon.name}</p>
                  <div className='border-b border-dotted'></div>
                  <span className='font-semibold'>
                    + &#36; {(addon.price * addon.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </>
          )}

          <div className='text-xs flex justify-between mt-3'>
            <p>Quantity</p>
            <p className='font-semibold'>x{item.quantity}</p>
          </div>
        </div>
      </div>

      {isEditable && (
        <div className='flex-[1_1_100%] flex justify-end gap-2 pt-2'>
          <Button
            variant={'ghost'}
            size={'icon'}
            onClick={handleDeleteFromCart}
          >
            <MdOutlineDeleteOutline size={'18'} className='text-destructive' />
          </Button>
        </div>
      )}
    </div>
  );
};
