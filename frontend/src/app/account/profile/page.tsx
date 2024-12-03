'use client';

import { EditProfile } from '@/components/EditProfile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
import { formFields } from '@/lib/constants';
import { selectUser } from '@/store/features/userSlice';
import { useAppSelector } from '@/store/hooks';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';

export default withPageAuthRequired(function Profile() {
  const userInfo = useAppSelector(selectUser);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { user, isLoading } = useUser();

  if (isLoading && !user && !userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className=''>
      <h2 className='mb-4'>Profile</h2>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className='mr-0 ml-auto w-32 bg-primary hover:bg-primary-light text-primary-foreground'
            onClick={() => setIsDialogOpen(true)}
          >
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-[90vw] sm:max-w-lg max-h-[80vh] overflow-auto rounded-md py-8'>
          <DialogHeader>
            <h3 className='uppercase text-center'>Edit Profile</h3>
            <DialogDescription className='text-center'>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <EditProfile setIsDialogOpen={setIsDialogOpen} />
        </DialogContent>
      </Dialog>

      <div className='mt-4 grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-8 items-start [&_div:first-of-type_#target:first-child_p:last-child]:lowercase'>
        {Object.entries(formFields).map(([groupName, values]) => (
          <Card key={groupName} className=''>
            <CardHeader className='border-b'>
              <h4>{groupName}</h4>
            </CardHeader>

            <CardContent>
              <div className='space-y-4 pt-6'>
                {values.map(({ name, label }) => (
                  <div key={name} id='target'>
                    <p className='font-light uppercase text-xs tracking-tighter'>
                      {label}
                    </p>

                    {!!userInfo[name] ? (
                      <p className='font-normal capitalize'>{userInfo[name]}</p>
                    ) : (
                      <p className='italic text-sm'>---</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
});
