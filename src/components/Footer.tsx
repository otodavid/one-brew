import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from 'react-icons/hi';

export const Footer = () => {
  return (
    <footer>
      <div className='bg-[#281E1B] px-6 text-neutral-white grid gap-6 py-12 justify-center text-center my-4'>
        <div>
          <h5 className='text-neutral-white font-bold mb-4 text-xl'>OneBrew</h5>
          <div className='flex gap-6 justify-center items-center text-xl mb-3'>
            <FaFacebookF />
            <FaXTwitter />
            <FaInstagram />
            <FaYoutube />
            <FaLinkedinIn />
          </div>
        </div>

        <div>
          <h5 className='text-neutral-white font-bold mb-3 '>Quick Links</h5>
          <ul>
            <li className='font-light text-sm mb-2'>Home</li>
            <li className='font-light text-sm mb-2'>About</li>
            <li className='font-light text-sm mb-2'>Order</li>
          </ul>
        </div>

        <div>
          <h5 className='text-neutral-white font-bold mb-3 '>Privacy</h5>
          <ul>
            <li className='font-light text-sm mb-2'>Terms of use</li>
            <li className='font-light text-sm mb-2'>Privacy Policy</li>
            <li className='font-light text-sm mb-2'>Cookies</li>
          </ul>
        </div>

        <div>
          <h5 className='text-neutral-white font-bold mb-3 '>Contact Us</h5>
          <ul>
            <li className='font-light text-sm mb-2 flex gap-2 justify-center items-center'>
              <HiOutlineLocationMarker />
              7212 Willa Dale, New Golda, Portugal
            </li>
            <li className='font-light text-sm mb-2 flex gap-2 justify-center items-center'>
              <HiOutlinePhone /> (998) 787-0221
            </li>
            <li className='font-light text-sm mb-2 flex gap-2 justify-center items-center'>
              <HiOutlineMail />
              contact_service@onebrew.coffee
            </li>
          </ul>
        </div>
      </div>

      <div className='bg-[#4B352F] px-6 py-4'>
        <p className='text-neutral-white text-center text-xs'>
          Copyright &copy; 2024, OneBrew
        </p>
      </div>
    </footer>
  );
};
