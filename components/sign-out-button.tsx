"use client";

import React from 'react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth-client';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';


const SignOutButton = () => {
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();
  async function handleClick() {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => { 
          setIsPending(false);
        },
        onSuccess: () => {
          router.push("/auth/login");
        },
        onError: (ctx) => {
          setIsPending(false);
          toast.error(ctx.error.message);
        }
      }
    })
  }
  return (
    <Button onClick={handleClick} className='text-sm' variant={"destructive"} disabled={isPending}>
      {isPending && <Loader className="w-4 h-4 mr-2 animate-spin" />}{"Sign Out"}
    </Button>
  )
}

export default SignOutButton
