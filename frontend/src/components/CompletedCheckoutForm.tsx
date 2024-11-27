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

interface Prop {
  setIsFormFilled: Dispatch<SetStateAction<boolean>>;
}

export const CompletedCheckoutForm = ({ setIsFormFilled }: Prop) => {
  const userInfo = useAppSelector(selectUser);

  return (
    <div>
      <Card>
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
    </div>
  );
};
