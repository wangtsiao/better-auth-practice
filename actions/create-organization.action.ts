"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createOrganization(formData: FormData) {
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;

    try {
        
    await auth.api.createOrganization({
        body: {
            name,
            slug,
        },
        headers: await headers(),
    });
        return {error: null}
    } catch (err) {
        return {error: err}
    }
}