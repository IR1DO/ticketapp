import { Ticket } from '@prisma/client';
import React from 'react';

interface Props {
  ticket: Ticket;
}

const TicketDetail = ({ ticket }: Props) => {
  return (
    <div>
      <p>{ticket.title}</p>
      <p>{ticket.description}</p>
      <p className='text-sm text-red-300'>{ticket.status}</p>
    </div>
  );
};

export default TicketDetail;
