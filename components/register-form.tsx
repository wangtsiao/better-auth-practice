"use client";

import React from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { signUp } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import Link from 'next/link';

const RegisterForm = () => {
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    if (!name) {
      toast.error('Name is required');
      return;
    }
    const email = formData.get('email') as string;
    if (!email) {
      toast.error('Email is required');
      return;
    }
    const password = formData.get('password') as string;
    if (!password) {
      toast.error('Password is required');
      return;
    }

    await signUp.email({
      name,
      email,
      password,
    }, {
      onRequest: () => {
        setIsPending(true);
      },
      onResponse: () => {
        setIsPending(false);
      },
      onError: (ctx) => {
        setIsPending(false);
        toast.error(ctx.error.message);
      },
      onSuccess: () => {
        toast.success('Registration successful! Whelcome aboard!');
        router.push('/profile');
      },
    })
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

      <Button type='submit' className='w-full' disabled={isPending}>
        {isPending && <Loader className="w-4 h-4 mr-2 animate-spin" />}{"Register"}
      </Button>
    </form>
  )
}

export default RegisterForm;
