"use client";

import React from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { signUpEmailAction } from '@/actions/sign-up-email.action';


const SignUpForm = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return await signUpEmailAction(formData);
    },
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success('Registration successful! Welcome aboard!');
        router.push('/profile');
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Registration failed');
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutation.mutate(formData);
  }

  return (
    <form onSubmit={handleSubmit} className='max-w-sm w-full space-y-4'>
      <div className="space-y-2">
        <Label htmlFor='name'>Name</Label>
        <Input id='name' name='name' />
      </div>

      <div className="space-y-2">
        <Label htmlFor='email'>Email</Label>
        <Input id='email' name='email' type='email' />
      </div>

      <div className="space-y-2">
        <Label htmlFor='password'>Password</Label>
        <Input id='password' name='password' type='password' />
      </div>

      <div className="text-muted-foreground">Already have an account? <Link href="/auth/login" className='hover:text-foreground'>Login</Link></div>

      <Button type='submit' className='w-full' disabled={mutation.isPending}>
        {mutation.isPending && <Loader className="w-4 h-4 mr-2 animate-spin" />}Register
      </Button>
    </form>
  )
}

export default SignUpForm;
