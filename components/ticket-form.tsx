'use client';

import { useEffect, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { ticketSchema } from '@/validation/schema/ticket';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Ticket } from '@prisma/client';
import { AlertDestructive } from './alert-destructive';
import { useToast } from './ui/use-toast';

type TicketFormData = z.infer<typeof ticketSchema>;

interface Props {
  ticket?: Ticket;
}

const TicketForm = ({ ticket }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<TicketFormData>({ resolver: zodResolver(ticketSchema) });

  async function onSubmit(values: z.infer<typeof ticketSchema>) {
    try {
      setError('');
      setIsSubmitting(true);

      if (ticket) {
        await axios.patch('/api/tickets/' + ticket.id, values);
      } else {
        await axios.post('/api/tickets', values);
      }

      router.push('/tickets');
      router.refresh();
      // setIsSubmitting(false);
    } catch (error) {
      setError(`${error}`);
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        description: error,
      });
    }
  }, [error, toast]);

  return (
    <div className='rounded-md border w-full p-4'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <FormField
            name='title'
            control={form.control}
            defaultValue={ticket?.title}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Title</FormLabel>
                <FormControl>
                  <Input placeholder='Ticket Title...' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Controller
            name='description'
            control={form.control}
            defaultValue={ticket?.description}
            render={({ field }) => (
              <SimpleMDE placeholder='Description' {...field} />
            )}
          />

          <div className='flex w-full space-x-4'>
            <FormField
              name='status'
              control={form.control}
              defaultValue={ticket?.status}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder='Status...'
                          defaultValue={ticket?.status}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='OPEN'>Open</SelectItem>
                      <SelectItem value='STARTED'>Started</SelectItem>
                      <SelectItem value='CLOSED'>Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              name='priority'
              control={form.control}
              defaultValue={ticket?.priority}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder='Priority...'
                          defaultValue={ticket?.priority}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='LOW'>Low</SelectItem>
                      <SelectItem value='MEDIUM'>Medium</SelectItem>
                      <SelectItem value='HIGH'>High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' disabled={isSubmitting}>
            {ticket ? 'Update Ticket' : 'Create Ticket'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TicketForm;
