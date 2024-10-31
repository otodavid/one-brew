'use client';

import { convertToText, handleProductSizeVolume } from '@/lib/helpers';
import { CartItem, IContext, ICustomizeDetails, Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { createContext, FormEvent, useEffect, useState } from 'react';
import { FaLongArrowAltLeft, FaMinus, FaPlus } from 'react-icons/fa';
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
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Counter } from './Counter';
import { useCounter } from '@/hooks/useCounter';

export const CustomizeContext = createContext<IContext | undefined>(undefined);

export const DisplayProduct = ({ productId }: { productId: string }) => {
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

  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const router = useRouter();

  const [customizeDetails, setCustomizeDetails] = useState<ICustomizeDetails>({
    size: { name: '', price: 0 },
    addons: [],
  });
  const { quantity, handleAdd, handleSubtract } = useCounter({ startValue: 1 });

  const dispatch = useAppDispatch();

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

  const handleCart = () => {
    let totalPrice = 0;

    if (product?.addons.length !== 0 && product?.sizes.length !== 0) {
      totalPrice =
        customizeDetails.size.price +
        customizeDetails.addons.reduce((prev, curr) => {
          const total = curr.price * curr.quantity;
          return prev + total;
        }, 0);
    } else {
      totalPrice = product.price * quantity;
    }

    if (product) {
      setCartItem({
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
        totalPrice: totalPrice,
      });
    }
  };

  useEffect(() => {
    dispatch(addToCart(cartItem));
    console.log(cartItem);
  }, [cartItem, dispatch]);

  if (isError && !isLoading) {
    return <div>An Error occured</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
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
              <span className='uppercase text-xs text-primary/80 flex-[1_1_100%] w-full tracking-wider'>
                {product.categoryType}
              </span>
              <h2 className='capitalize'>{product.name}</h2>
              <h2 className='text-primary'>&#36; {product.price}</h2>
              <p className='text-sm flex-[1_1_100%] lg:mt-3'>
                {product.description}
              </p>
            </div>
            <form className='mt-6'>
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
            </form>

            <Button onClick={handleCart} className='mt-8 w-full block'>
              Add to Cart
            </Button>
          </div>
        </section>
      )}
    </>
  );
};
