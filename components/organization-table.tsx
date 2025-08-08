"use client"

import { useListOrganizations, useSession } from '@/lib/auth-client'
import React from 'react'
import CreateOrganizationButton from './create-organization-button';

function OrganizationTable() {
    const { data: organizations, refetch: refetchOrg } = useListOrganizations();
    const { data, refetch: refetchSession } = useSession();

    return (
        <>
            <h2 className="text-2xl font-bold">Organization</h2>
            <CreateOrganizationButton refetch={() => {
                refetchOrg();
                refetchSession();
            }}/>
            <div className="w-full overflow-x-auto">
                <table className="table-auto min-w-full whitespace-nowrap">
                    <thead>
                        <tr className="border-b text-sm text-left">
                            <th className='px-2 py-2'>ID</th>
                            <th className='px-2 py-2'>Name</th>
                            <th className='px-2 py-2 text-center'>Active</th>
                            <th className='px-2 py-2 text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {organizations?.map((org) => (
                            <tr key={org.id} className="border-b text-sm">
                                <td className='px-2 py-2'>{org.id.slice(0, 8)}</td>
                                <td className='px-2 py-2'>{org.name}</td>
                                <td className='px-2 py-2 text-center'>{
                                    data?.session.activeOrganizationId == org.id ? "Yes" : "No"
                                }</td>
                                <td className='px-2 py-2 text-center'>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default OrganizationTable