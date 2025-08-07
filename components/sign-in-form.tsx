"use client"

import React from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { signInEmailAction } from '@/actions/sign-in-email.action';
import { SignOauthButton } from '@/components/sign-oauth-button';

const SignInForm = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return await signInEmailAction(formData);
    },
    onSuccess: (data) => {
      console.log("SignIN: data, ", data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success('Login successful! Welcome back!');
        router.push('/profile');
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Login failed');
    },
  });


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutation.mutate(formData);
  }


  return (
    <>
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

        <Button type='submit' className='w-full' disabled={mutation.isPending}>
          {mutation.isPending && <Loader className="w-4 h-4 mr-2 animate-spin" />}{"Login"}
        </Button>
      </form>

      <hr className="max-w-sm" />

      <div className="flex flex-col max-w-sm gap-4">
        <SignOauthButton provider="google" />
        <SignOauthButton provider="github" />
      </div>
    </>
  )
}

export default SignInForm;
