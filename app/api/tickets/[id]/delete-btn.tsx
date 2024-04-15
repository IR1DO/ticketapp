'use client';
import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { AlertDestructive } from '@/components/alert-destructive';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  ticketId: number;
}

const DeleteBtn = ({ ticketId }: Props) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const deleteTicket = async () => {
    try {
      setError('');
      setIsDeleting(true);

      await axios.delete('/api/tickets/' + ticketId);

      router.push('/tickets');
      router.refresh();
      // setIsDeleting(false);
    } catch (error) {
      setError(`${error}`);
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        description: error,
      });
    }
  }, [error, toast]);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger
          className={`${buttonVariants({
            variant: 'default',
          })} lg:h-full lg:flex-1 bg-red-500 hover:bg-red-400 dark:text-white`}
          disabled={isDeleting}
        >
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              ticket and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className='bg-red-500 hover:bg-red-400 dark:text-white'
              disabled={isDeleting}
              onClick={deleteTicket}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteBtn;
