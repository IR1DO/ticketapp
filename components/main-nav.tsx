import Link from 'next/link';
import React from 'react';
import ToggleMode from './toggle-mode';
import { getServerSession } from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';

const MainNav = async () => {
  const session = await getServerSession(options);
  // console.log(session);

  return (
    <div className='flex justify-between'>
      <div className='flex items-center gap-4'>
        <Link href='/'>Dashboard</Link>
        <Link href='/tickets'>Tickets</Link>
        <Link href='/users'>Users</Link>
      </div>

      <div className='flex items-center gap-2'>
        {session ? (
          <Link href='/api/auth/signout?callbackUrl=/'>Logout</Link>
        ) : (
          <Link href='/api/auth/signin'>Login</Link>
        )}

        <ToggleMode />
      </div>
    </div>
  );
};

export default MainNav;
