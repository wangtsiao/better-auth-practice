import ReturnButton from '@/components/return-button'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import React from 'react'
import { prisma } from '@/lib/prisma'


const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) redirect("/auth/login");

    if (session.user.role !== "ADMIN") {
        return (
            <div className='max-w-screen-lg container mx-auto px-8 py-16 space-y-8'>
                <div className="space-y-8">
                    <ReturnButton href='/profile' label='profile' />
                    <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
                </div>
                <p className='rounded-md p-2 text-lg bg-red-500 font-semibold text-secondary'>You are not authorized to view this page</p>
            </div>
        )
    }

    const users = await prisma.user.findMany({
        orderBy: {
            name: "asc"
        }
    });

    return (
        <div className='max-w-screen-lg container mx-auto px-8 py-16 space-y-8'>
            <div className="space-y-8">
                <ReturnButton href='/profile' label='profile' />
                <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
            </div>
            <p className='rounded-md p-2 text-lg bg-green-500 font-semibold text-secondary'>Acess Granted</p>

            <div className="w-full overflow-x-auto">
            <table className="table-auto min-w-full whitespace-nowrap">
                <thead>
                    <tr className="border-b text-sm text-left">
                        <th className='px-2 py-2'>ID</th>
                        <th className='px-2 py-2'>Name</th>
                        <th className='px-2 py-2'>Email</th>
                        <th className='px-2 py-2 text-center'>Role</th>
                        <th className='px-2 py-2 text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr className="boder-b text-sm text-left" key={user.id}>
                            <td className="px-2 py-2">{user.id.slice(0, 8)}</td>
                            <td className="px-2 py-2">{user.name}</td>
                            <td className="px-2 py-2">{user.email}</td>
                            <td className="px-2 py-2 text-center">{user.role}</td>
                            <td className="px-2 py-2 text-center">Delete</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Page
