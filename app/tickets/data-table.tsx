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
import { Divide } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
  tickets: Ticket[];
}

const DataTable = ({ tickets }: Props) => {
  return (
    <div className='w-full mt-5'>
      <div className='rounded-md sm:border'>
        <Table className='text-center'>
          <TableHeader>
            <TableRow>
              <TableHead className='text-left'>Title</TableHead>
              <TableHead className='text-center'>Status</TableHead>
              <TableHead className='text-center'>Priority</TableHead>
              <TableHead className='text-center'>Created At</TableHead>
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
