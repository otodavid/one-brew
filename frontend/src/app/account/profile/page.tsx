'use client';

import { EditProfile } from '@/components/EditProfile';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { formFields } from '@/lib/constants';
import { UserInfo } from '@/lib/types';
import { selectUser } from '@/store/features/userSlice';
import { useAppSelector } from '@/store/hooks';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export default function Profile() {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  // const { data } = useQuery({
  //   queryKey: ['user'],
  //   queryFn: async (): Promise<void> => {
  //     await axios.post(`${process.env.BACKEND_URL}/user/add`, userInfo);
  //   },
  // });

  const handleAdd = async () => {
    const res = await axios.post(
      `${process.env.BACKEND_URL}/user/add`,
      userInfo
    );
  };

  const user = useAppSelector(selectUser);

  return (
    <div className=''>
      <h3 className='mb-4'>Profile</h3>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className='mr-0 ml-auto'
            onClick={() => setIsDialogOpen(true)}
          >
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-[90vw] sm:max-w-[425px] max-h-[80vh] overflow-auto rounded-md'>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <EditProfile setIsDialogOpen={setIsDialogOpen} />

          <DialogFooter>
            <DialogClose>
              <Button type='submit'>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className='border px-4 py-6 mt-6 rounded-lg'>
        <div className='space-y-4'>
          {Object.entries(formFields).map(([groupName, values]) => (
            <div key={groupName} className='mb-10'>
              <p className='text-lg mb-4 font-medium'>{groupName}</p>

              <div className='space-y-4'>
                {values.map(({ name, label }) => (
                  <div key={name}>
                    <p className='font-light uppercase text-xs tracking-tighter'>
                      {label}
                    </p>

                    <p className='font-medium'>{user[name]}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
