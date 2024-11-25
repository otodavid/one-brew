'use client';

import { handleProductSizeVolume, saveToLocalStorage } from '@/lib/utils';
import { CartItem, ICustomizeDetails, Product } from '@/lib/types';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Button } from './ui/button';
import { addToCart, selectCart } from '@/store/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { CoffeeIconSize } from './CoffeeIconSize';
import { CustomizationItem } from './CustomizationItem';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Counter } from './Counter';
import { useCounter } from '@/hooks/useCounter';
import { toast } from 'sonner';
import axios from 'axios';
import { selectUser } from '@/store/features/userSlice';
import { v4 as uuidv4 } from 'uuid';
import { DisplayProductSkeletonLoader } from './Loaders/DisplayProductSkeletonLoader';

export const DisplayProduct = ({ productId }: { productId: string }) => {
  const router = useRouter();
  const cart = useAppSelector(selectCart);
  const cartItemRef = useRef<CartItem | null>(null);
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUser);

  const [customizeDetails, setCustomizeDetails] = useState<ICustomizeDetails>({
    size: { name: '', price: 0 },
    addons: [],
  });
  const { quantity, handleAdd, handleSubtract } = useCounter({ startValue: 1 });

  // fetch product data
  const {
    data: product,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: async (): Promise<Product> => {
      const res = await fetch(`http://localhost:5000/products/${productId}`);
      return await res.json();
    },
  });

  const { mutate } = useMutation({
    mutationFn: async ({ email, item }: { email: string; item: CartItem }) => {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/cart/add`,
        {
          email,
          item,
        }
      );

      return data.data;
    },

    onSuccess: () => {
      dispatch(addToCart(cartItemRef.current));

      console.log(cartItemRef.current);

      toast.success('added to cart', {
        className: 'toast-style',
      });
    },

    onError: (error) => {
      toast.error('Something went wrong. Please refresh and try again', {
        className: 'toast-style',
      });

      console.log(error);
    },
  });

  const handleSizeDetails = (value: string) => {
    let getPrice: number = 0;
    if (product) {
      product.sizes.forEach(
        (size) => size.name === value && (getPrice = size.price)
      );
    }

    setCustomizeDetails((prev) => ({
      ...prev,

      size: { name: value, price: getPrice },
    }));
  };

  useEffect(() => {
    if (product && product.sizes.length !== 0) {
      setCustomizeDetails((prev) => ({
        ...prev,

        size: { name: product.sizes[0].name, price: product.sizes[0].price },
      }));
    }
  }, [product]);

  const handleAddToCart = useCallback(() => {
    let totalPrice = 0;

    if (product) {
      cartItemRef.current = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        categoryName: product.categoryName,
        categoryType: product.categoryType,
        size: {
          name: customizeDetails.size.name,
          price: customizeDetails.size.price,
        },
        addons: [...customizeDetails.addons],
        quantity: quantity,
        totalPrice: product.price,
        cartProductID: uuidv4(),
      };
    }

    if (cartItemRef.current) {
      // if product has addons and sizes, get total price using those criteria
      if (product?.addons.length !== 0 && product?.sizes.length !== 0) {
        cartItemRef.current.totalPrice =
          customizeDetails.size.price +
          customizeDetails.addons.reduce((prev, curr) => {
            const total = curr.price * curr.quantity;
            return prev + total;
          }, 0);
      } else {
        cartItemRef.current.totalPrice = product.price * quantity;
      }
    }

    // if user is signed in, add to db data, else save to local storage
    if (userInfo.email && cartItemRef.current) {
      mutate({
        email: userInfo.email,
        item: cartItemRef.current,
      });
    } else {
      dispatch(addToCart(cartItemRef.current));

      toast.success('added to cart', {
        className: 'toast-style',
      });
    }
  }, [
    dispatch,
    mutate,
    userInfo.email,
    customizeDetails.addons,
    customizeDetails.size.name,
    customizeDetails.size.price,
    product,
    quantity,
  ]);

  useEffect(() => {
    if (userInfo.email === '' && cartItemRef.current !== null) {
      saveToLocalStorage(cart);
    }
  }, [cart, userInfo.email]);

  if (isError && !isLoading) {
    return <div>An Error occured</div>;
  }

  if (isLoading) {
    return <DisplayProductSkeletonLoader />;
  }

  return (
    <>
      {product && (
        <section className='px-4 py-6 pb-12 mx-auto xs:px-6 md:px-12 md:max-w-xl lg:max-w-8xl xl:px-16 lg:grid lg:grid-cols-2 lg:gap-x-8 xl:gap-x-16 2xl:px-20'>
          <div className='lg:col-span-2'>
            <Button
              onClick={() => router.back()}
              variant={'link'}
              className='normal-case flex gap-1 items-center text-sm mb-6'
            >
              <FaLongArrowAltLeft /> Go back
            </Button>
          </div>

          <div className='w-full relative h-80 mx-auto rounded-lg overflow-hidden md:h-max md:aspect-video md:mx-auto lg:max-w-none lg:aspect-square lg:w-full'>
            <Image
              src={product.image}
              alt='Espresso Coffee'
              fill={true}
              className='object-cover'
            />
          </div>

          <div className='grid grid-cols-1 content-start md:mx-auto lg:pr-8 xl:max-w-xl '>
            <div className='flex justify-between items-center flex-wrap pt-6 gap-x-3 gap-y-2 lg:pt-0'>
              <span
                className='uppercase text-xs text-primary/80 flex-[1_1_100%] w-full tracking-wider'
                defaultValue={product.categoryType}
              >
                {product.categoryType}
              </span>
              <h2 className='capitalize'>{product.name}</h2>
              <h2 className='text-primary'>&#36; {product.price}</h2>
              <p className='text-sm flex-[1_1_100%] lg:mt-3'>
                {product.description}
              </p>
            </div>
            <div className='mt-6'>
              {/* sizing options */}
              {product.sizes.length > 0 && (
                <div>
                  <p className='font-semibold'>Sizing Options</p>

                  <RadioGroup
                    defaultValue={product.sizes[0].name}
                    className='flex gap-8 pt-4'
                    onValueChange={(value) => handleSizeDetails(value)}
                  >
                    {product.sizes
                      .sort((a, b) => a.price - b.price)
                      .map((size) => (
                        <div
                          className='flex flex-col items-center relative isolate'
                          key={size.name}
                        >
                          <RadioGroupItem
                            value={size.name}
                            id={size.name}
                            className='absolute left-4 top-2 -z-10 opacity-0 peer'
                          />
                          <Label
                            htmlFor={size.name}
                            className='relative flex flex-col gap-2 items-center justify-center bg-primary/5 rounded-full w-16 h-16 border-2 border-transparent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-background'
                          >
                            <CoffeeIconSize size={size.name} />
                            <p className='absolute -translate-x-2/4 left-2/4 -bottom-11 flex flex-col items-center gap-1.5 font-normal text-foreground capitalize'>
                              {size.name}
                              <span className='font-light'>
                                {handleProductSizeVolume(size.name)}
                              </span>
                            </p>
                          </Label>
                        </div>
                      ))}
                  </RadioGroup>
                </div>
              )}

              {/* Customize */}
              {product.addons.length > 0 && (
                <div className='mt-20'>
                  <p className='font-semibold'>Customize</p>

                  <Accordion type='multiple' className='w-full pt-1'>
                    {product.addons.map((addon) => (
                      <AccordionItem value={addon.type} key={addon.type}>
                        <AccordionTrigger>{addon.type}</AccordionTrigger>
                        <AccordionContent className='flex flex-col gap-y-6'>
                          {addon.items.map((item) => (
                            <CustomizationItem
                              key={item.name}
                              name={item.name}
                              maxValue={6}
                              price={item.price}
                              setCustomizeDetails={setCustomizeDetails}
                            />
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              {/* Quantity */}
              {product.categoryType === 'food' && (
                <div>
                  <Accordion type='multiple' className='w-full pt-1'>
                    <AccordionItem value={'quantity'} key='quantity'>
                      <AccordionTrigger>Select quantity</AccordionTrigger>
                      <AccordionContent className='flex justify-between'>
                        <p>Quantity</p>
                        <div className='flex items-center gap-4'>
                          <Counter
                            quantity={quantity}
                            handleAdd={handleAdd}
                            handleSubtract={handleSubtract}
                            maxValue={10}
                            startValue={1}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </div>

            <Button onClick={handleAddToCart} className='mt-8 w-full block'>
              Add to Cart
            </Button>
          </div>
        </section>
      )}
    </>
  );
};
