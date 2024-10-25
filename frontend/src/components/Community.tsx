import Image from 'next/image';
import React, { ReactNode } from 'react';
import { GiCoffeeBeans, GiCoffeeCup } from 'react-icons/gi';
import { IoChatbubbles, IoChatbubblesOutline } from 'react-icons/io5';
import image from '/public/img/community.jpg';
import beanIcon from '/public/coffee-beans.svg';
import { CiCoffeeBean } from 'react-icons/ci';
import { VscCoffee } from 'react-icons/vsc';

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

interface CardProps {
  icon: ReactNode;
  heading: string;
  description: string;
}

const Card = ({ icon, heading, description }: CardProps) => {
  return (
    <div className='grid grid-cols-[auto_1fr] items-center gap-4 rounded-lg px-4 py-4 sm:block hover:shadow-lg'>
      <div className='w-16 h-16 text-4xl rounded-full self-center flex justify-center items-center text-accent bg-primary-dark sm:w-14 sm:h-14 sm:self-start sm:mb-5 lg:w-10 lg:h-10 lg:text-2xl'>
        {icon}
      </div>
      <div>
        <p className='font-semibold text-neutral-black leading-none mb-3'>
          {heading}
        </p>
        <p className='text-sm font-light'>{description}</p>
      </div>
    </div>
  );
};

export const Community = () => {
  return (
    <div className='grid max-w-8xl mx-auto px-4 py-10 mb-10 gap-4 md:px-12 lg:px-6 lg:gap-6 lg:grid-cols-2 xl:px-16 xl:gap-12 2xl:px-20 2xl:gap-16'>
      <div className='grid grid-cols-2 gap-4 grid-rows-[7rem_7rem] xs:grid-rows-[10rem_10rem] md:grid-rows-[12rem_12rem] 2xl:'>
        <div className='relative rounded-xl overflow-hidden'>
          <Image
            src={'/img/community11.jpg'}
            alt='coffee cafe 1'
            className='object-cover brightness-75'
            fill={true}
          />
        </div>
        <div className='relative rounded-xl overflow-hidden'>
          <Image
            src={'/img/community12.jpg'}
            alt='coffee cafe 2'
            className='object-cover brightness-75 object-center'
            fill={true}
          />
        </div>
        <div className='relative rounded-xl  col-span-2 overflow-hidden'>
          <Image
            src={'/img/community13.jpg'}
            alt='coffee cafe 3'
            className='object-cover brightness-75'
            fill={true}
          />
        </div>
      </div>

      <div className='lg:self-center'>
        <div className='px-4 pt-6 lg:pt-0 lg:px-0'>
          <h2 className='text-center mb-2 lg:text-left'>
            Excellence in Every Sip
          </h2>
          <p className='text-center sm:w-4/5 sm:mx-auto lg:w-full lg:text-left lg:mx-0'>
            Our commitment to excellence ensures every cup delights your senses.
            From sourcing the finest beans to crafting each brew with care, we
            aim to elevate your coffee experience. Every sip reflects our
            passion for quality and dedication to delivering the perfect cup.
          </p>
          <div className='pt-6 grid gap-4 sm:grid-cols-3 lg:gap-1 lg:py-0 lg:pt-5 xl:gap-4'>
            {data.map((item, id) => (
              <Card
                key={id}
                description={item.description}
                heading={item.heading}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
