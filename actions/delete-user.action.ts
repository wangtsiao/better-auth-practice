"use server"

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { headers } from "next/headers"
import { revalidatePath } from "next/cache";
import { APIError } from "better-auth/api";

export async function DeleteUserAction({ userId }: { userId: string }) {
    if (!userId) {
        return { error: "should provide userId" }
    }
    const headersList = await headers();

    const session = await auth.api.getSession({
        headers: headersList,
    });

    if (!session) return { error: "you are not sign in" }

    const hasPermission = await auth.api.userHasPermission({
        body: {
            userId: session.user.id,
            permissions: {
                user: ["delete"]
            }
        }
    });

    if (!hasPermission.success) return { error: "you are not authorized" }

    try {
        await prisma.user.delete({
            where: {
                id: userId,
                role: "USER"
            }
        });

        if (userId === session.user.id) {
            await auth.api.signOut({
                headers: headersList,
            });
            redirect("/auth/login");
        }

        revalidatePath("/admin/dashboard");

        return { error: null }
    } catch (err) {
        if (err instanceof APIError) {
            return { success: false, error: err.message };
        }
        return { success: false, error: "Internal Server Error" };
    }
}