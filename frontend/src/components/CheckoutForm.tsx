'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserInfo } from '@/lib/types';
import { addUserInfo, selectUser } from '@/store/features/userSlice';
import { formFields, formSchema } from '@/lib/constants';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CheckoutReview } from './CheckoutReview';

interface Prop {
  isFormFilled: boolean;
  setIsFormFilled: Dispatch<SetStateAction<boolean>>;
}

export const CheckoutForm = ({ isFormFilled, setIsFormFilled }: Prop) => {
  const userInfo = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  let form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      country: '',
    },
  });

  useEffect(() => {
    if (userInfo) {
      form.reset({
        email: userInfo.email ?? '',
        firstName: userInfo.firstName ?? '',
        lastName: userInfo.lastName ?? '',
        phone: userInfo.phone ?? '',
        address: userInfo.address ?? '',
        city: userInfo.city ?? '',
        province: userInfo.province ?? '',
        postalCode: userInfo.postalCode ?? '',
        country: userInfo.country ?? '',
      });
    }
  }, [userInfo, form]);

  const { mutate } = useMutation({
    mutationFn: (newUserInfo: UserInfo) => {
      return axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update`,
        newUserInfo,
        { headers: { 'Content-Type': 'application/json' } }
      );
    },
    onSuccess: () => {
      toast.success('Your information was updated successfully');
    },
    onError: (error: AxiosError) => {
      toast.error('Error updating user data');
      console.error('Error updating user data:', error);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsFormFilled(true);

    // check if any value in user info data state is empty
    const isUserInfoIncomplete = Object.values(userInfo).some(
      (value) => value === ''
    );

    // check if the values in userInfo state and form values match
    const isUserInfoUpdated = Object.keys(values).some((key) => {
      const typedKey = key as keyof typeof userInfo;
      return values[typedKey] !== userInfo[typedKey];
    });

    if (isUserInfoIncomplete || isUserInfoUpdated) {
      mutate(values);
    }

    dispatch(addUserInfo(values));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full grid lg:grid-cols-[1fr_.7fr] gap-6 items-start'
      >
        <div className='space-y-6'>
          {Object.entries(formFields).map(([groupName, fieldData]) => (
            <Card key={groupName}>
              <CardHeader>
                <CardTitle>{groupName}</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {fieldData.map(({ name, label }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          <Input placeholder='' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='space-y-6'>
          <CheckoutReview />

          {!isFormFilled && (
            <Button type='submit' className='block w-full col-start-2'>
              Continue to Payment
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
