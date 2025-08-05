import ReturnButton from '@/components/return-button';
import SignOutButton from '@/components/sign-out-button';
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import React from 'react'

const Profile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className='max-w-screen-lg container mx-auto px-8 py-16 space-y-8'>
        <h1 className='text-3xl font-bold'>You are not logged in</h1>
      </div>
    );
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
