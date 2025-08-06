import ReturnButton from '@/components/return-button';
import SignOutButton from '@/components/sign-out-button';
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation';
import React from 'react'

const Profile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className='max-w-screen-lg container mx-auto px-8 py-16 space-y-8'>

      <div className="space-y-8">
        <ReturnButton href='/' label='home'/>
        <h1 className='text-3xl font-bold'>Profile</h1>
      </div>
      <SignOutButton />
      <pre className='text-sm overflow-clip'>
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  )
}

export default Profile
