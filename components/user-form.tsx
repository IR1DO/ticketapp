'use client';

import { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { userSchema } from '@/validation/schema/users';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';
import { useToast } from './ui/use-toast';

type UserFormData = z.infer<typeof userSchema>;

interface Props {
  user?: User;
}

const UserForm = ({ user }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<UserFormData>({ resolver: zodResolver(userSchema) });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    try {
      setError('');
      setIsSubmitting(true);

      if (user) {
        await axios.patch('/api/users/' + user.id, values);
      } else {
        await axios.post('/api/users', values);
      }

      router.push('/users');
      router.refresh();
      // setIsSubmitting(false);
    } catch (error) {
      const err = error as any;
      const errorMessage = err.response?.data?.message;
      setError(`${error}. ${errorMessage}`);
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
            name='name'
            control={form.control}
            defaultValue={user?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter User Full Name...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='username'
            control={form.control}
            defaultValue={user?.username}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='Enter Username...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* form body always has a password field which is an empty string */}
          <FormField
            name='password'
            control={form.control}
            defaultValue=''
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    required={user ? false : true}
                    placeholder='Enter Password...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex w-full space-x-4'>
            <FormField
              name='role'
              control={form.control}
              defaultValue={user?.role}
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
                          placeholder='Role...'
                          defaultValue={user?.role}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='USER'>User</SelectItem>
                      <SelectItem value='TECH'>Tech</SelectItem>
                      <SelectItem value='ADMIN'>Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' disabled={isSubmitting}>
            {user ? 'Update User' : 'Create User'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserForm;
