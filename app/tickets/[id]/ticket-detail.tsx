import { Ticket } from '@prisma/client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import TicketStatusBadge from '@/components/ticket-status-badge';
import TicketPriority from '@/components/ticket-priority';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import ReactMarkDown from 'react-markdown';

interface Props {
  ticket: Ticket;
}

const TicketDetail = ({ ticket }: Props) => {
  return (
    <div className='lg:grid lg:grid-cols-5 mx-4'>
      <Card className='mx-auto mb-4 lg:col-span-4 lg:mr-4 lg:mb-0'>
        <CardHeader>
          <div className='flex gap-2 mb-1'>
            <TicketStatusBadge status={ticket.status} />
            <CardTitle>{ticket.title}</CardTitle>
          </div>

          <CardDescription>
            <div className='flex flex-row justify-between items-end'>
              <div>
                Created:{' '}
                {ticket.createdAt.toLocaleDateString('en-US', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: false,
                })}
              </div>

              <div className='flex'>
                <TicketPriority priority={ticket.priority} />
              </div>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className='prose dark:prose-invert'>
          <ReactMarkDown>{ticket.description}</ReactMarkDown>
        </CardContent>

        <CardFooter>
          <div className='text-teal-500 dark:text-teal-200'>
            Updated:{' '}
            {ticket.updatedAt.toLocaleDateString('en-US', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
              hour: 'numeric',
              minute: '2-digit',
              hour12: false,
            })}
          </div>
        </CardFooter>
      </Card>

      <div className='flex flex-col gap-2 lg:flex-row '>
        <Link
          href={`/tickets/edit/${ticket.id}`}
          className={`${buttonVariants({
            variant: 'default',
          })} lg:h-full lg:flex-1 dark:text-white`}
        >
          Edit
        </Link>

        <Link
          href={`/tickets/edit/${ticket.id}`}
          className={`${buttonVariants({
            variant: 'default',
          })} lg:h-full lg:flex-1 bg-red-500 hover:bg-red-400 dark:text-white`}
        >
          Delete
        </Link>
      </div>
    </div>
  );
};

export default TicketDetail;
