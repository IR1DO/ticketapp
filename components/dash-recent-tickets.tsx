import { Prisma } from '@prisma/client';
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card';
import TicketStatusBadge from './ticket-status-badge';
import Link from 'next/link';
import TicketPriority from './ticket-priority';

type TicketWithUser = Prisma.TicketGetPayload<{
  include: { assignedToUser: true };
}>;

interface Props {
  tickets: TicketWithUser[];
}

const DashRecentTickets = ({ tickets }: Props) => {
  return (
    <Card className='col-span-3'>
      <CardHeader>
        <CardTitle>Recently Updated</CardTitle>
      </CardHeader>

      <CardContent>
        <div className='space-y-4'>
          {tickets
            ? tickets.map((ticket) => (
                <div key={ticket.id} className='flex items-center'>
                  <TicketStatusBadge status={ticket.status} />
                  <div className='ml-4 space-y-2'>
                    <Link
                      href={`tickets/${ticket.id}`}
                      className='hover:underline group hover:text-cyan-500'
                    >
                      <p>{ticket.title}</p>
                      <p className='text-sm text-gray-500 group-hover:text-cyan-500'>
                        {ticket.assignedToUser?.name || 'Unassigned'}
                      </p>
                    </Link>
                  </div>

                  <div className='ml-auto font-medium'>
                    <TicketPriority priority={ticket.priority} />
                  </div>
                </div>
              ))
            : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashRecentTickets;
