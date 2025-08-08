"use client"

import { useListOrganizations } from '@/lib/auth-client'
import React from 'react'
import CreateOrganizationButton from './create-organization-button';

function OrganizationTable() {
    const { data: organizations } = useListOrganizations();

    return (
        <>
            <h2 className="text-2xl font-bold">Organization</h2>
            <CreateOrganizationButton />
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
                </table>
            </div>
        </>
    )
}

export default OrganizationTable