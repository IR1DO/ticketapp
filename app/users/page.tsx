import UserForm from '@/components/user-form';
import React from 'react';
import DataTableSimple from './data-table-simple';
import prisma from '@/prisma/db';
import options from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

const Users = async () => {
  const session = await getServerSession(options);
  if (session?.user.role != 'ADMIN') {
    return <p className='text-destructive'>Admin access required.</p>;
  }

  const users = await prisma.user.findMany();

  return (
    <div>
      <UserForm />
      <DataTableSimple users={users} />
    </div>
  );
};

export default Users;
