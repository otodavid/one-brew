import Image from 'next/image';
import React, { ReactNode } from 'react';
import { GiCoffeeBeans, GiCoffeeCup } from 'react-icons/gi';
import { IoChatbubbles, IoChatbubblesOutline } from 'react-icons/io5';
import image from '/public/img/community.jpg';
import beanIcon from '/public/coffee-beans.svg';
import { CiCoffeeBean } from 'react-icons/ci';
import { VscCoffee } from 'react-icons/vsc';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const data = [
  {
    heading: 'Premium Coffee Beans',
    description: 'We source and pick the finest beans around the world for you',
    icon: <CiCoffeeBean />,
  },
  {
    heading: 'Delicious Drinks',
    description: 'Our skilled baristas create drinks with precision and love',
    icon: <VscCoffee />,
  },
  {
    heading: 'Community focus',
    description:
      'We actively support beans from around the world our local community',
    icon: <IoChatbubblesOutline />,
  },
];

export const Community = () => {
  return (
    <div className='grid max-w-8xl mx-auto px-4 py-10 mb-10 gap-4 md:px-12 lg:px-6 lg:gap-6 lg:grid-cols-[.7fr_1fr] xl:px-16 xl:gap-12 2xl:px-20 2xl:gap-16'>
      <div className='grid grid-cols-2 gap-4 grid-rows-[7rem_7rem] xs:grid-rows-[10rem_10rem] md:grid-rows-[12rem_12rem] 2xl:'>
        <div className='relative rounded-xl overflow-hidden'>
          <Image
            src={'/img/community11.jpg'}
            alt='first part split of a coffee shop'
            sizes='(max-width: 768) 50vw, 25vw'
            className='object-cover brightness-75'
            fill={true}
          />
        </div>
        <div className='relative rounded-xl overflow-hidden'>
          <Image
            src={'/img/community12.jpg'}
            alt='second part split of a coffee shop'
            sizes='(max-width: 768) 50vw, 25vw'            className='object-cover brightness-75 object-center'
            fill={true}
          />
        </div>
        <div className='relative rounded-xl  col-span-2 overflow-hidden'>
          <Image
            src={'/img/community13.jpg'}
            alt='third part split of a coffee shop'
            className='object-cover brightness-75'
            sizes='(max-width: 768) 100vw, 50vw'
            fill={true}
          />
        </div>
      </div>

      <div className='lg:self-center'>
        <div className='px-4 pt-6 lg:pt-0 lg:px-0'>
          <h2 className='text-center mb-3 lg:text-left'>
            Excellence in Every Sip
          </h2>
          <p className='text-center sm:w-4/5 sm:mx-auto lg:w-full lg:text-left lg:mx-0'>
            Our commitment to excellence ensures every cup delights your senses.
            From sourcing the finest beans to crafting each brew with care, we
            aim to elevate your coffee experience. Every sip reflects our
            passion for quality and dedication to delivering the perfect cup.
          </p>

          <div className='pt-6 grid gap-4 grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] lg:gap-4 lg:py-0 lg:pt-10 xl:gap-4'>
            {data.map((item, id) => (
              <Card key={id}>
                <CardHeader>
                  <CardTitle className='flex gap-4 items-center md:block'>
                    <div className='rounded-full self-center flex justify-center items-center text-accent text-3xl sm:self-start sm:mb-5 w-max'>
                      {item.icon}
                    </div>
                    <p className='font-semibold text-lg'>{item.heading}</p>
                  </CardTitle>
                  <CardContent className='px-0 text-sm'>
                    {item.description}
                  </CardContent>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
