import { FormValues } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { set } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import { formFields, groups } from '@/lib/constants';
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
            <p>{userInfo.firstName + ' ' + userInfo.lastName}</p>
            <p>{userInfo.phone}</p>
          </CardContent>
        </div>

        <div>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{userInfo.address}</p>
            <p>
              {userInfo.city +
                ', ' +
                userInfo.postalCode +
                ', ' +
                userInfo.province}
            </p>
            <p>{userInfo.country}</p>
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
