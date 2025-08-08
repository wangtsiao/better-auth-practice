"use server"

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
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

        revalidatePath("/profile");
        return { error: null }
    } catch (err) {
        if (err instanceof Error) {
            console.log("err: ", err.message);
            return { error: "Oops, something went wrong." }
        }
        return { error: "Server Internal Error" }
    }
}