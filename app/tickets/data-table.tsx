import TicketPriority from '@/components/ticket-priority';
import TicketStatusBadge from '@/components/ticket-status-badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Ticket } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { SearchParams } from './page';

interface Props {
  tickets: Ticket[];
  searchParams: SearchParams;
}

const DataTable = ({ tickets, searchParams }: Props) => {
  return (
    <div className='w-full mt-4'>
      <div className='rounded-md sm:border'>
        <Table className='text-center'>
          <TableHeader>
            <TableRow className='bg-secondary hover:bg-secondary'>
              <TableHead className='text-left'>
                <Link href={{ query: { ...searchParams, orderBy: 'title' } }}>
                  Title
                </Link>
                {searchParams.orderBy === 'title' && (
                  <ArrowDown className='inline p-1' />
                )}
              </TableHead>
              <TableHead className='text-center'>
                <Link href={{ query: { ...searchParams, orderBy: 'status' } }}>
                  Status
                </Link>
                {searchParams.orderBy === 'status' && (
                  <ArrowDown className='inline p-1' />
                )}
              </TableHead>
              <TableHead className='text-center'>
                <Link
                  href={{ query: { ...searchParams, orderBy: 'priority' } }}
                >
                  Priority
                </Link>
                {searchParams.orderBy === 'priority' && (
                  <ArrowDown className='inline p-1' />
                )}
              </TableHead>
              <TableHead className='text-center'>
                <Link
                  href={{ query: { ...searchParams, orderBy: 'createdAt' } }}
                >
                  Created At
                </Link>
                {searchParams.orderBy === 'createdAt' && (
                  <ArrowDown className={'inline p-1'} />
                )}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tickets ? (
              tickets.map((ticket) => (
                <TableRow key={ticket.id} data-href='/'>
                  <TableCell className='text-left'>
                    <Link
                      href={`/tickets/${ticket.id}`}
                      className='hover:underline hover:text-cyan-500'
                    >
                      {ticket.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <TicketStatusBadge status={ticket.status} />
                  </TableCell>
                  <TableCell>
                    <div className='flex justify-center'>
                      <TicketPriority priority={ticket.priority} />
                    </div>
                  </TableCell>
                  <TableCell>
                    {ticket.createdAt.toLocaleDateString('en-US', {
                      year: '2-digit',
                      month: '2-digit',
                      day: '2-digit',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div></div>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
