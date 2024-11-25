import { z } from 'zod';
import { FormFieldsByGroup } from './types';
import { BiCategory } from 'react-icons/bi';
import { IconType } from 'react-icons/lib';
import { IoHomeOutline } from 'react-icons/io5';
import { IoMdInformationCircleOutline } from 'react-icons/io';

export const NAVLINKS: { name: string; link: string; icon: IconType }[] = [
  { name: 'home', link: '/', icon: IoHomeOutline },
  { name: 'menu', link: '/menu', icon: BiCategory },
  { name: 'about', link: '/about', icon: IoMdInformationCircleOutline },
];

export const groups = {
  contact: 'Contact Information',
  shipping: 'Shipping Address',
} as const;

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please input a valid email' }),
  firstName: z.string().min(1, { message: 'First Name is required' }),
  lastName: z.string().min(1, { message: 'Lasst Name is required' }),
  phone: z.string().min(1, { message: 'Please input a valid number' }),
  address: z.string().min(1, { message: 'Please enter a correct address' }),
  country: z.string().min(1, { message: 'Country is required' }),
  province: z.string().min(1, { message: 'Province/State is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  postalCode: z.string().min(1, { message: 'Postal Code is required' }),
});

export const formFields: FormFieldsByGroup = {
  [groups.contact]: [
    { name: 'email', label: 'Email' },
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'phone', label: 'Phone' },
  ],
  [groups.shipping]: [
    { name: 'address', label: 'Address' },
    { name: 'city', label: 'City' },
    { name: 'province', label: 'Province' },
    { name: 'postalCode', label: 'Postal Code' },
    { name: 'country', label: 'Country' },
  ],
};
