import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from '@/lib/prisma';
import { hashPassword, verifyPassword } from "@/lib/argon2";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware } from "better-auth/api";
import { authMiddleware } from "@/lib/utils";


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
            return { data: { ...user, role: "ADMIN" } };
          }

          return { data: user };
        }
      }
    }
  },
  plugins: [nextCookies()],
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN"],
        input: false,
      }
    }
  }
});

export type ErrCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
