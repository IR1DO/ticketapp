import React from 'react';
import prisma from '@/prisma/db';
import DataTable from './data-table';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/pagination';
import StatusFilter from '@/components/status-filter';
import { Status, Ticket } from '@prisma/client';

export interface SearchParams {
  status: Status;
  page: string;
  orderBy: keyof Ticket;
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 7;
  const page = parseInt(searchParams.page) || 1;

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  let where = {};
  if (status) {
    where = { status };
  } else {
    where = {
      NOT: [{ status: 'CLOSED' as Status }],
    };
  }

  const orderBy: keyof Ticket = searchParams.orderBy;
  const orderQuery = orderBy ? { [orderBy]: 'desc' } : undefined;

  const ticketCount = await prisma.ticket.count({ where });

  const tickets = await prisma.ticket.findMany({
    where,
    take: pageSize,
    skip: (page - 1) * pageSize,
    orderBy: orderQuery,
  });

  return (
    <div className='flex flex-col gap-4'>
      <div>
        <Link
          href='/tickets/new'
          className={buttonVariants({ variant: 'default' })}
        >
          New Ticket
        </Link>
      </div>

      <StatusFilter />
      <DataTable tickets={tickets} searchParams={searchParams} />

      <Pagination
        itemCount={ticketCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export default Tickets;
