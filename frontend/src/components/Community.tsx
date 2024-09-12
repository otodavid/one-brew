import Image from 'next/image';
import React, { ReactNode } from 'react';
import { GiCoffeeBeans, GiCoffeeCup } from 'react-icons/gi';
import { IoChatbubbles, IoChatbubblesOutline } from 'react-icons/io5';
import image from '/public/img/community.png';
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
    <div className='grid grid-cols-[auto_1fr] items-center gap-4 group'>
      <div className='w-20 h-20 text-4xl rounded-full self-center flex justify-center items-center text-accent bg-primary-dark'>
        {icon}
      </div>
      <div>
        <p className='font-semibold text-neutral-black'>{heading}</p>
        <p className='text-sm font-light'>{description}</p>
      </div>
    </div>
  );
};

export const Community = () => {
  return (
    <div className='grid grid-cols-1 py-6'>
      <div>
        <Image src={image} alt='Cup of coffee' />
      </div>
      <div className='px-4 pt-6'>
        <h2 className='text-2xl font-medium text-center'>
          Premium Coffee, <span className='font-bold'>Perfect</span> Every Time
        </h2>
        <p className='text-center'>
          Our commitment to excellence ensures every cup delights your senses.
        </p>
        <div className='pt-10 grid gap-6'>
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
  );
};
