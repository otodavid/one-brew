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
import {
  Dispatch,
  FormEvent,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCart } from '@/store/features/cartSlice';
import { CartItemComponent } from '@/components/CartItemComponent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormValues } from '@/lib/types';
import { addUserInfo, selectUser } from '@/store/features/userSlice';
import { formFields, formSchema } from '@/lib/constants';

interface Prop {
  isFormFilled: boolean;
  setIsFormFilled: Dispatch<SetStateAction<boolean>>;
}

export const CheckoutForm = ({ isFormFilled, setIsFormFilled }: Prop) => {
  const cart = useAppSelector(selectCart);
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsFormFilled(true);
    dispatch(addUserInfo(values));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
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

        <Card>
          <CardHeader>
            <CardTitle> Review</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {cart.map((item, index) => (
              <CartItemComponent
                item={item}
                index={index}
                key={item.id}
                isEditable={false}
              />
            ))}
          </CardContent>
        </Card>

        {!isFormFilled && (
          <Button type='submit' className='block w-full'>
            Continue to Payment
          </Button>
        )}
      </form>
    </Form>
  );
};
