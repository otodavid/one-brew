'use client';

import { convertToText } from '@/lib/helpers';
import { IProduct } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { CiCoffeeCup } from 'react-icons/ci';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { CustomizationItem } from './CustomizationItem';
import { Button } from './ui/button';
import { addToCart, selectCart } from '@/store/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
interface ICustomizations {
  dairy: { cream: 0; milk: 0 };
}

export const DisplayProduct = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState<IProduct>({
    name: '',
    categoryName: '',
    description: '',
    id: 0,
    image: '',
    price: 0.0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/products/${productId}`);
        const data = await res.json();

        setProduct(data);
      } catch (err) {
        console.log('could not fetch data');
      }
    };

    fetchProduct();
  }, []);

  const productToAdd: IProduct = {
    id: 1,
    name: 'Hello',
    categoryName: 'Hello',
    description: 'Hello',
    image: '/img/espresso.jpg',
    price: 0,
  };

  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  console.log(product);
  return (
    <>
      <section className='px-4 py-6'>
        <Link
          href={`/menu/${product.categoryName}`}
          className='normal-case flex gap-1 items-center text-sm mb-6'
        >
          <FaLongArrowAltLeft /> Go back
        </Link>

        <div className='grid grid-cols-1 gap-y-8 pb-12'>
          <div>
            <div className='w-full relative h-80 mx-auto rounded-lg overflow-hidden'>
              <Image
                src={product.image}
                alt='Espresso Coffee'
                fill={true}
                className='object-cover'
              />
            </div>
            <div className='flex justify-between items-center flex-wrap pt-6 gap-x-3 gap-y-2'>
              <h2 className='capitalize'>{product.name}</h2>
              <span className='text-primary text-xl font-medium'>
                ${product.price}
              </span>
              <p className='text-sm flex-[1_1_100%]'>{product.description}</p>
            </div>
          </div>
          <div>
            <p className='font-semibold'>Sizing Options</p>

            <RadioGroup defaultValue='small' className='flex gap-8 pt-4'>
              <div className='flex flex-col items-center relative isolate'>
                <RadioGroupItem
                  value='small'
                  id='small'
                  className='absolute left-4 top-2 -z-10 opacity-0 peer'
                />
                <Label
                  htmlFor='small'
                  className='relative flex flex-col gap-2 items-center justify-center bg-primary/5 rounded-full w-16 h-16 border-2 border-transparent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-background'
                >
                  <CiCoffeeCup size='25px' className='' />
                  <p className='absolute -translate-x-2/4 left-2/4 -bottom-11 flex flex-col items-center gap-1.5 font-normal text-foreground'>
                    Small<span className='font-light'>350ml</span>
                  </p>
                </Label>
              </div>
              <div className='flex flex-col items-center relative isolate'>
                <RadioGroupItem
                  value='medium'
                  id='medium'
                  className='absolute left-4 top-2 -z-10 opacity-0 peer'
                />
                <Label
                  htmlFor='medium'
                  className='relative flex flex-col gap-2 items-center justify-center bg-primary/5 rounded-full w-16 h-16 border-2 border-transparent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-background'
                >
                  <CiCoffeeCup size='32px' />
                  <p className='absolute -translate-x-2/4 left-2/4 -bottom-11 flex flex-col items-center gap-1.5 font-normal text-foreground'>
                    Medium<span className='font-light'>450ml</span>
                  </p>
                </Label>
              </div>
              <div className='flex flex-col items-center relative isolate'>
                <RadioGroupItem
                  value='large'
                  id='large'
                  className='absolute left-4 top-2 -z-10 opacity-0 peer'
                />
                <Label
                  htmlFor='large'
                  className='relative flex flex-col gap-2 items-center justify-center bg-primary/5 rounded-full w-16 h-16 border-2 border-transparent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-background'
                >
                  <CiCoffeeCup size='38px' />
                  <p className='absolute -translate-x-2/4 left-2/4 -bottom-11 flex flex-col items-center gap-1.5 font-normal text-foreground'>
                    Large<span className='font-light'>600ml</span>
                  </p>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className='mt-10'>
            <p className='font-semibold'>Customize</p>

            <Accordion type='multiple' className='w-full pt-1'>
              <AccordionItem value='coffee-blend'>
                <AccordionTrigger>Coffee Roast</AccordionTrigger>
                <AccordionContent>
                  <RadioGroup
                    defaultValue='medium-roast'
                    className='*:mb-6 last:mb-0'
                  >
                    <div className='flex flex-row-reverse justify-between'>
                      <RadioGroupItem value='light-roast' id='light-roast' />
                      <Label className='font-normal' htmlFor='light-roast'>
                        light roast
                      </Label>
                    </div>
                    <div className='flex flex-row-reverse justify-between'>
                      <RadioGroupItem value='medium-roast' id='medium-roast' />
                      <Label className='font-normal' htmlFor='medium-roast'>
                        medium roast
                      </Label>
                    </div>
                    <div className='flex flex-row-reverse justify-between'>
                      <RadioGroupItem value='dark-roast' id='dark-roast' />
                      <Label className='font-normal' htmlFor='dark-roast'>
                        dark roast
                      </Label>
                    </div>
                    <div className='flex flex-row-reverse justify-between'>
                      <RadioGroupItem value='decaf' id='decaf' />
                      <Label className='font-normal' htmlFor='decaf'>
                        decaf
                      </Label>
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='dairy'>
                <AccordionTrigger>Dairy</AccordionTrigger>
                <AccordionContent className='flex flex-col gap-y-6'>
                  <CustomizationItem
                    name='cream'
                    incrementValue={1}
                    maxValue={6}
                  />
                  <CustomizationItem
                    name='2% Milk'
                    incrementValue={1}
                    maxValue={6}
                  />
                  <CustomizationItem
                    name='soy milk'
                    incrementValue={1}
                    maxValue={6}
                  />
                  <CustomizationItem
                    name='almond milk'
                    incrementValue={1}
                    maxValue={6}
                  />
                  <CustomizationItem
                    name='oat milk'
                    incrementValue={1}
                    maxValue={6}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='sweetners'>
                <AccordionTrigger>Add Sweetners</AccordionTrigger>
                <AccordionContent className='flex flex-col gap-y-4'>
                  <CustomizationItem
                    name='regular sweetner'
                    incrementValue={0.5}
                    maxValue={3}
                  />

                  <CustomizationItem
                    name='sugar'
                    maxValue={6}
                    incrementValue={0.5}
                  />

                  <CustomizationItem
                    name='classic syrup'
                    maxValue={6}
                    incrementValue={0.5}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='espresso-shots'>
                <AccordionTrigger>Espresso Shots</AccordionTrigger>
                <AccordionContent className='flex flex-col gap-y-4'>
                  <CustomizationItem
                    name='Add shots'
                    incrementValue={1}
                    maxValue={6}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='syrup'>
                <AccordionTrigger>Add Syrup</AccordionTrigger>
                <AccordionContent className='flex flex-col gap-y-6'>
                  <CustomizationItem
                    name='caramel syrup'
                    incrementValue={1}
                    maxValue={6}
                  />
                  <CustomizationItem
                    name='strawberry syrup'
                    incrementValue={1}
                    maxValue={6}
                  />
                  <CustomizationItem
                    name='vanilla syrup'
                    incrementValue={1}
                    maxValue={6}
                  />
                  <CustomizationItem
                    name='chocolate syrup'
                    incrementValue={1}
                    maxValue={6}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='topping'>
                <AccordionTrigger>Add Toppings</AccordionTrigger>
                <AccordionContent>
                  <CustomizationItem
                    name='Whipped Cream'
                    maxValue={1}
                    incrementValue={1}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <Button onClick={() => dispatch(addToCart(productToAdd))}>
            Add to Cart
          </Button>
        </div>
      </section>
    </>
  );
};
