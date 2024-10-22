import { IoIosArrowRoundBack } from 'react-icons/io';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    console.error(error.data?.message || error.statusText);
  } else if (error instanceof Error) {
    console.error(error.message);
  } else if (typeof error === 'string') {
    console.error(error);
  } else {
    console.error('Unknown error');
  }

  return (
    <div className='min-h-screen w-screen flex flex-col justify-center items-center'>
      <div className='w-4/5'>
        <img
          src='/src/assets/error-page.svg'
          className=''
          alt='Error page svg'
        />
      </div>
      <Link
        to={'/'}
        className='bg-slate-900 text-white py-2 px-4 w-max rounded-lg flex items-center gap-x-1'
      >
        <IoIosArrowRoundBack />
        Go to Homepage{' '}
      </Link>
    </div>
  );
}
