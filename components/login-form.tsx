"use client"

import React from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { signIn } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import Link from 'next/link';

const LoginForm = () => {
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
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

    await signIn.email({
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
        toast.success('Login successful! Welcome back!');
        router.push('/profile');
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className='max-w-sm w-full space-y-4'>
      <div className="space-y-4">
        <Label htmlFor='email'>Email</Label>
        <Input id='email' name='email' />
      </div>

      <div className="space-y-4">
        <Label htmlFor='password'>Password</Label>
        <Input id='password' name='password' type='password' />
      </div>

      <div className="text-muted-foreground">Don&apos;t have an account? <Link href="/auth/register" className='hover:text-foreground'>Register</Link></div>

      <Button type='submit' className='w-full' disabled={isPending}>
        {isPending && <Loader className="w-4 h-4 mr-2 animate-spin" />}{"Login"}
      </Button>

    </form>
  )
}

export default LoginForm;
