import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, adminClient, organizationClient } from "better-auth/client/plugins"; 
import { auth } from "@/lib/auth";
import { ac, roles } from "@/lib/permission";


const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_URL,
    plugins: [
        inferAdditionalFields<typeof auth>(), 
        adminClient({ac, roles}),
        organizationClient(),
    ]
});

export const { signUp, signOut, signIn, useSession, admin } = authClient;