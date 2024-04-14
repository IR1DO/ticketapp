import dynamic from 'next/dynamic';
import React from 'react';

const TicketForm = dynamic(() => import('@/components/ticket-form'), {
  ssr: false,
});

const NewTicket = () => {
  return <TicketForm />;
};

export default NewTicket;
