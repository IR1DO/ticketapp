import React from 'react';
import prisma from '@/prisma/db';
import DataTable from './data-table';

const Tickets = async () => {
  const tickets = await prisma.ticket.findMany();

  return (
    <>
      <div>Tickets</div>
      <DataTable tickets={tickets} />
    </>
  );
};

export default Tickets;
