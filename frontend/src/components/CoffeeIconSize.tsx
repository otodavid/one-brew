import { CiCoffeeCup } from 'react-icons/ci';

export const CoffeeIconSize = ({ size }: { size: string }) => {
    return (
      <>
        {size.toLowerCase() === 'small' && <CiCoffeeCup size='25px' />}
  
        {size.toLowerCase() === 'medium' && <CiCoffeeCup size='32px' />}
  
        {size.toLowerCase() === 'large' && <CiCoffeeCup size='38px' />}
      </>
    );
  };