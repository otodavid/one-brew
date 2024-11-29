import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { Dispatch, SetStateAction } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/features/userSlice';
import { CheckoutReview } from './CheckoutReview';
import { StripeWrapper } from './StripeWrapper';

interface Prop {
  setIsFormFilled: Dispatch<SetStateAction<boolean>>;
}

export const CompletedCheckoutForm = ({ setIsFormFilled }: Prop) => {
  const userInfo = useAppSelector(selectUser);

  return (
    <div className='w-full grid md:grid-cols-[1fr_.7fr] gap-6 items-start md:grid-rows-[25.5rem_20rem_1fr]'>
      <Card className='md:col-start-1 md:row-span-1'>
        <div>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{userInfo.email}</p>
            <p className='capitalize'>
              {userInfo.firstName + ' ' + userInfo.lastName}
            </p>
            <p>{userInfo.phone}</p>
          </CardContent>
        </div>

        <div>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{userInfo.address}</p>
            <p className='capitalize'>
              {userInfo.city +
                ', ' +
                userInfo.postalCode +
                ', ' +
                userInfo.province}
            </p>
            <p className='capitalize'>{userInfo.country}</p>
          </CardContent>
        </div>

        <CardFooter>
          <Button variant={'link'} onClick={() => setIsFormFilled(false)}>
            Edit
          </Button>
        </CardFooter>
      </Card>

      <div className='md:row-span-4 md:col-start-2'>
        <CheckoutReview />
      </div>

      <Card className='md:col-start-1 md:row-span-2'>
        <CardHeader>
          <CardTitle> Payment </CardTitle>
        </CardHeader>

        <CardContent>
          <StripeWrapper />
        </CardContent>
      </Card>
    </div>
  );
};
