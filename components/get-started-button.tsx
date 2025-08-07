"use client"

import { useSession } from '@/lib/auth-client'
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';

const GetStartedButton = () => {
  const { data: session, isPending } = useSession();
  const href = session ? "/profile" : "/auth/login";

  if (isPending) {
    return <Button size='lg' className='opacity-50'>Loading...</Button>
  }

  return (
    <>
      <Button size='lg' asChild>
        <Link href={href}>Get Started</Link>
      </Button>
      {session &&
        <p className='flex items-center gap-2'>
          <span data-role={session.user.role} className='size-4 rounded-full animate-pulse data-[role=USER]:bg-green-500 data-[role=ADMIN]:bg-red-500' />
          Welcome back, {session.user.name} 👋😊!
        </p>
      }
    </>
  )
}

export default GetStartedButton
