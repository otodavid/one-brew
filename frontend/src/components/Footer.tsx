import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';

export const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='max-w-8xl mx-auto py-12 px-4 xs:px-6 md:px-12 md:flex md:items-start md:justify-between md:pb-6 xl:px-16 2xl:px-20'>
        <div className=' grid gap-x-16 gap-y-8 justify-center text-center xs:grid-cols-[repeat(3,auto)] xs:justify-start xs:text-left md:mx-0'>
          <div>
            <h5 className=' mb-3'>About us</h5>
            <ul>
              <li className='font-light text-sm mb-2'>Our Company</li>
              <li className='font-light text-sm mb-2'>Our coffee</li>
              <li className='font-light text-sm mb-2'>Our story</li>
            </ul>
          </div>

          <div>
            <h5 className=' mb-3'>Services</h5>
            <ul>
              <li className='font-light text-sm mb-2'>Order on the web</li>
              <li className='font-light text-sm mb-2'>Order Ahead</li>
              <li className='font-light text-sm mb-2'>Delivery</li>
            </ul>
          </div>

          <div>
            <h5 className=' mb-3'>Privacy</h5>
            <ul>
              <li className='font-light text-sm mb-2'>Terms of use</li>
              <li className='font-light text-sm mb-2'>Privacy policy</li>
              <li className='font-light text-sm mb-2'>Cookies</li>
            </ul>
          </div>
        </div>

        <div className='mt-8 md:mt-0 md:pr-10 lg:pr-16 xl:pr-24'>
          <h5 className='mb-3 text-center xs:text-left'>Socials</h5>
          <div className='flex gap-6 justify-center items-center text-base mb-3  xs:justify-start'>
            <FaFacebookF />
            <FaXTwitter />
            <FaInstagram />
            <FaYoutube />
            <FaLinkedinIn />
          </div>
        </div>
      </div>

      <div className='py-4 text-primary-foreground bg-primary-dark border-b border-background/20'>
        <p className='max-w-8xl mx-auto text-center text-xs /70 xs:text-left px-4 xs:px-6 md:px-12 xl:px-16 2xl:px-20'>
          &copy; 2024 OneBrew. All rights reserved
        </p>
      </div>
    </footer>
  );
};
