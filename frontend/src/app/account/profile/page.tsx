import { Button } from '@/components/ui/button';

export default function Profile() {
  return (
    <div className=''>
      <h3>Profile</h3>

      <div className='border px-4 py-6 mt-6 rounded-lg'>
        <div className='space-y-4'>
          <div>
            <p className='font-light uppercase text-xs tracking-tighter'>
              First Name
            </p>

            <div className='flex justify-between items-center'>
              <p className='font-semibold'>David</p>
              <Button variant={'link'}>Edit</Button>
            </div>
          </div>

          <div>
            <p className='font-light uppercase text-xs tracking-tighter'>
              Last Name
            </p>

            <div className='flex justify-between items-center'>
              <p className='font-semibold'>Ojo</p>
              <Button variant={'link'}>Edit</Button>
            </div>
          </div>

          <div>
            <p className='font-light uppercase text-xs tracking-tighter'>
              Email
            </p>

            <div className='flex justify-between items-center'>
              <p className='font-semibold'>mydevzone0@gmail.com</p>
              <Button variant={'link'}>Edit</Button>
            </div>
          </div>

          <div>
            <p className='font-light uppercase text-xs tracking-tighter'>
              Mobile number
            </p>

            <div className='flex justify-between items-center'>
              <p className='font-semibold'>(xxx)xxx-xxxx</p>
              <Button variant={'link'}>Edit</Button>
            </div>
          </div>

          <div>
            <p className='font-light uppercase text-xs tracking-tighter'>
              Birthday
            </p>

            <div className='flex justify-between items-center'>
              <p className='font-semibold'>DD/MM</p>
              <Button variant={'link'}>Edit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
