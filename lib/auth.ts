import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { prisma } from '@/lib/prisma';
import { hashPassword, verifyPassword } from "@/lib/argon2";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware } from "better-auth/api";
import { authMiddleware } from "@/lib/utils";
import { UserRole } from "@/lib/generated/prisma";
import { ac, roles } from "@/lib/permission";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    }
  },
  advanced: {
    database: {
      generateId: false,
    }
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60, // 30 days
  },
  hooks: {
    before: createAuthMiddleware(authMiddleware),
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(";") ?? [];

          if (ADMIN_EMAILS.includes(user.email)) {
            return { data: { ...user, role: UserRole.ADMIN } };
          }

          return { data: user };
        }
      }
    }
  },
  plugins: [
    nextCookies(),
    admin({
      defaultRole: UserRole.USER,
      adminRoles: [UserRole.ADMIN],
      ac,
      roles,
    })
  ],
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN"] as Array<UserRole>,
        input: false,
      }
    }
  }
});

export type ErrCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
