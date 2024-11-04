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
import { Dispatch, SetStateAction } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectCart } from '@/store/features/cartSlice';
import { CartItem } from '@/components/CartItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormValues } from '@/lib/types';

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please input a valid email' }),
  address: z.string().min(1, { message: 'Please enter a correct address' }),
  phone: z.string().min(1, { message: 'Please input a valid number' }),
  country: z.string().min(1, { message: 'Country is required' }),
  state: z.string().min(1, { message: 'Province/State is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  postalCode: z.string().min(1, { message: 'Postal Code is required' }),
});

interface Prop {
  formValues: FormValues | undefined;
  setFormValues: Dispatch<SetStateAction<FormValues | undefined>>;
  isFormFilled: boolean;
  setIsFormFilled: Dispatch<SetStateAction<boolean>>;
}

export const CheckoutForm = ({
  formValues,
  isFormFilled,
  setIsFormFilled,
  setFormValues,
}: Prop) => {
  const cart = useAppSelector(selectCart);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: formValues?.email.value ?? '',
      phone: formValues?.phone.value ?? '',
      address: formValues?.address.value ?? '',
      city: formValues?.city.value ?? '',
      state: formValues?.state.value ?? '',
      postalCode: formValues?.postalCode.value ?? '',
      country: formValues?.country.value ?? '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormValues((prev) => ({
      ...prev,

      email: { group: 'information', value: values.email },
      phone: { group: 'information', value: values.phone },
      address: { group: 'shipping', value: values.address },
      city: { group: 'shipping', value: values.city },
      state: { group: 'shipping', value: values.state },
      postalCode: { group: 'shipping', value: values.postalCode },
      country: { group: 'shipping', value: values.country },
    }));

    setIsFormFilled(true);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle>My Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='example@gmail.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder='1234567890' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle> Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder='Street address' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='postalCode'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='state'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province/State</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle> Review</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {cart.map((item, index) => (
              <CartItem
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
