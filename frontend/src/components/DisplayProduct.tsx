'use client';

import { convertToText } from '@/lib/helpers';
import { IProduct, IDetailedProduct } from '@/lib/types';
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

const ProductSizeImage = ({ size }: { size: string }) => {
  return (
    <>
      {size.toLowerCase() === 'small' && <CiCoffeeCup size='25px' />}

      {size.toLowerCase() === 'medium' && <CiCoffeeCup size='32px' />}

      {size.toLowerCase() === 'large' && <CiCoffeeCup size='38px' />}
    </>
  );
};

export const DisplayProduct = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState<IDetailedProduct>({
    name: '',
    categoryName: '',
    description: '',
    id: 0,
    image: '',
    price: 0.0,
    categoryId: 0,
    sizes: [{ name: '', price: 0 }],
    addons: [{ type: '', items: [{ name: '', price: 0.0 }] }],
    coffeeBlend: true,
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
  }, [productId]);

  console.log(product);

  const productToAdd: IProduct = {
    id: 1,
    name: 'Hello',
    categoryName: 'Hello',
    description: 'Hello',
    image: '/img/espresso.jpg',
    price: 0,
  };

  const handleProductSizeVolume = (size: string) => {
    let volume;

    switch (size.toLowerCase()) {
      case 'small':
        volume = '250ml';
        break;
      case 'medium':
        volume = '350ml';
        break;
      case 'large':
        volume = '550ml';
        break;
    }

    return volume;
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

        <div className='grid grid-cols-1 pb-12'>
          <div className='mb-8'>
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

          {/* sizing options */}
          {product.sizes[0].name != '' && (
            <div>
              <p className='font-semibold'>Sizing Options</p>

              <RadioGroup
                defaultValue={product.sizes[0].name}
                className='flex gap-8 pt-4'
              >
                {product.sizes
                  .sort((a, b) => a.price - b.price)
                  .map((size) => (
                    <div className='flex flex-col items-center relative isolate'>
                      <RadioGroupItem
                        value={size.name}
                        id={size.name}
                        className='absolute left-4 top-2 -z-10 opacity-0 peer'
                      />
                      <Label
                        htmlFor={size.name}
                        className='relative flex flex-col gap-2 items-center justify-center bg-primary/5 rounded-full w-16 h-16 border-2 border-transparent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-background'
                      >
                        <ProductSizeImage size={size.name} />
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
          {(product.coffeeBlend || product.addons[0].type != '') && (
            <div className='mt-20'>
              <p className='font-semibold'>Customize</p>

              <Accordion type='multiple' className='w-full pt-1'>
                {product.coffeeBlend && (
                  <AccordionItem value='coffee-blend'>
                    <AccordionTrigger>Coffee Blend</AccordionTrigger>
                    <AccordionContent>
                      <RadioGroup
                        defaultValue='medium-roast'
                        className='*:mb-6 last:mb-0'
                      >
                        <div className='flex flex-row-reverse justify-between'>
                          <RadioGroupItem
                            value='light-roast'
                            id='light-roast'
                          />
                          <Label className='font-normal' htmlFor='light-roast'>
                            light roast
                          </Label>
                        </div>
                        <div className='flex flex-row-reverse justify-between'>
                          <RadioGroupItem
                            value='medium-roast'
                            id='medium-roast'
                          />
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
                )}

                {product.addons[0].type != '' &&
                  product.addons.map((addon) => (
                    <AccordionItem value={addon.type}>
                      <AccordionTrigger>{addon.type}</AccordionTrigger>
                      <AccordionContent className='flex flex-col gap-y-6'>
                        {addon.items.map((item) => (
                          <CustomizationItem
                            name={item.name}
                            incrementValue={1}
                            maxValue={6}
                          />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                {/* <AccordionItem value='sweetners'>
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
              </AccordionItem> */}
              </Accordion>
            </div>
          )}

          <Button onClick={() => dispatch(addToCart(productToAdd))} className='mt-8'>
            Add to Cart
          </Button>
        </div>
      </section>
    </>
  );
};
