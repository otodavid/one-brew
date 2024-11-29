'use client';

import Image from 'next/image';
import loader from '/public/loader.svg';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className='min-h-[90vh] w-screen flex flex-col justify-center items-center gap-4 pb-10'>
      <motion.div
        className='w-20 relative aspect-square'
        animate={{ opacity: 0 }}
        transition={{ repeatType: 'reverse', duration: 0.5, repeat: Infinity }}
      >
        <Image
          src={loader}
          alt='coffee machine loader'
          fill={true}
          unoptimized={true}
        />
      </motion.div>

      <p className='italic text-sm text-center max-w-60'>
        Good things take time, just like a perfect brew.
      </p>
    </div>
  );
}
