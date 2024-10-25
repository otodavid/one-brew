import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className='fixed z-20 top-0 left-0 w-full flex items-center gap-x-8 px-4 py-4 border-b'>
      <Link to={'/'} className='border-r pr-4'>
        One Brew
      </Link>
      <p className='uppercase font-semibold'>Admin</p>
    </header>
  );
};
