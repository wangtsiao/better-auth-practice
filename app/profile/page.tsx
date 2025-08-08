import OrganizationTable from '@/components/organization-table';
import ReturnButton from '@/components/return-button';
import SignOutButton from '@/components/sign-out-button';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const Profile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const FULL_POST_ACCESS = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions: {
        posts: ["update", "delete"],
      },
    },
  });

  return (
    <div className='max-w-screen-lg container mx-auto px-8 py-16 space-y-8'>

      <div className="space-y-8">
        <ReturnButton href='/' label='home' />
        <h1 className='text-3xl font-bold'>Profile</h1>
      </div>
      <div className="flex gap-2 items-center">
        {session.user.role === "ADMIN" && (
          <Button variant={"default"} asChild>
            <Link href="/admin/dashboard">Dashboard</Link>
          </Button>
        )}
        <SignOutButton />
      </div>

      <OrganizationTable />

      <h2 className="text-2xl font-bold">Permissions</h2>

      <div className="space-x-4">
        <Button size="sm">MANAGE OWN POSTS</Button>
        <Button size="sm" disabled={!FULL_POST_ACCESS.success}>
          MANAGE ALL POSTS
        </Button>
      </div>

      <pre className='text-sm overflow-clip'>
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  )
}

export default Profile
