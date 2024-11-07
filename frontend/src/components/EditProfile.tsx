import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formFields, formSchema, groups } from '@/lib/constants';
import {
  addUserInfo,
  selectUser,
  updateUserInfo,
} from '@/store/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UserInfo } from '@/lib/types';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface Prop {
  setIsDialogOpen?: Dispatch<SetStateAction<boolean>>;
}

export const EditProfile = ({ setIsDialogOpen }: Prop) => {
  const userInfo = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: userInfo.email ?? '',
      firstName: userInfo.firstName ?? '',
      lastName: userInfo.lastName ?? '',
      phone: userInfo.phone ?? '',
      address: userInfo.address ?? '',
      city: userInfo.city ?? '',
      province: userInfo.province ?? '',
      postalCode: userInfo.postalCode ?? '',
      country: userInfo.country ?? '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: (newUserInfo: UserInfo) => {
      return axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update`,
        newUserInfo
      );
    },
    onSuccess: (data: AxiosResponse) => {
      // Update Redux state 
      dispatch(addUserInfo(data.data));

      console.log(data.data)
    },
    onError: (error: AxiosError) => {
      console.error('Error adding user:', error);
    },
  });

  const handleAddUserInfo = (values: z.infer<typeof formSchema>) => {
    mutate(values);

    if (setIsDialogOpen) {
      setIsDialogOpen(false);
    }
  };

  return (
    <div className='px-4 py-6 mt-6'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAddUserInfo)}
          className='space-y-4'
        >
          {Object.entries(formFields).map(([groupName, values]) => (
            <div key={groupName} className='mb-16'>
              <p className='text-lg mb-4'>{groupName}</p>

              <div>
                {values.map((fieldData) => (
                  <FormField
                    key={fieldData.name}
                    control={form.control}
                    name={fieldData.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{fieldData.label}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder=''
                            {...field}
                            disabled={fieldData.name === 'email' && true}
                            className='disabled:text-foreground/70'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>
          ))}

          <Button type='submit'>Save Changes</Button>
        </form>
      </Form>
    </div>
  );
};
