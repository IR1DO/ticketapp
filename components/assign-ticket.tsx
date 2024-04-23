'use client';

import { Ticket, User } from '@prisma/client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useToast } from './ui/use-toast';

const AssignTicket = ({ ticket, users }: { ticket: Ticket; users: User[] }) => {
  const [isAssigning, setIsAssigning] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { toast } = useToast();

  const assignTicket = async (userId: string) => {
    setError('');
    setIsAssigning(true);

    await axios
      .patch(`/api/tickets/${ticket.id}`, {
        assignedToUserId: userId === '0' ? null : userId,
      })
      .catch((error) => {
        const err = error as any;
        const errorMessage = err.response?.data?.message;
        setError(`${error}. Error message: ${errorMessage}`);
      });

    if (userId === '0') {
      setSuccessMessage('The assignment of this ticket has been canceled.');
    } else {
      setSuccessMessage(
        `The ticket has been successfully assigned to the user "${
          users.find((user) => user.id === parseInt(userId))?.name
        }".`
      );
    }
    setIsAssigning(false);
  };

  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        description: error,
      });
    } else if (successMessage) {
      toast({
        description: successMessage,
      });
    }
  }, [error, successMessage, toast]);

  return (
    <>
      <Select
        defaultValue={ticket.assignedToUserId?.toString() || '0'}
        onValueChange={assignTicket}
        disabled={isAssigning}
      >
        <SelectTrigger>
          <SelectValue
            placeholder='Select User...'
            defaultValue={ticket.assignedToUserId?.toString() || '0'}
          ></SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value='0'>Unassign</SelectItem>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default AssignTicket;
