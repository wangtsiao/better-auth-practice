import SignInForm from '@/components/sign-in-form'
import ReturnButton from '@/components/return-button'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Link from 'next/link'
import React from 'react'

const Login = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className='max-w-screen-lg container mx-auto px-8 py-16 space-y-8'>
      <div className="space-y-8">
        <ReturnButton href='/' label='home' />
        <h1 className='text-3xl font-bold'>Login</h1>
      </div>
      <SignInForm />

    </div>
  )
}

export default Login
