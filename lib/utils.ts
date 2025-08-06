import { AuthContext, MiddlewareContext, MiddlewareOptions } from "better-auth";
import { APIError } from "better-auth/api";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


function normalizeName(name: string) {
  return name
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^a-zA-Z'-]/g, "")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const VALID_DOMAINS = () => {
  const domains = ["gmail.com", "yahoo.com", "outlook.com"];

  if (process.env.NODE_ENV === "development") {
    domains.push("example.com");
  }

  return domains;
};


export async function authMiddleware(ctx: MiddlewareContext<MiddlewareOptions, AuthContext & {
  returned?: unknown;
  responseHeaders?: Headers;
}>) {
  if (ctx.path === "/sign-up/email") {
    const email = String(ctx.body.email);
    const domain = email.split("@")[1].toLowerCase();

    if (!VALID_DOMAINS().includes(domain)) {
      throw new APIError("BAD_REQUEST", {
        message: "Invalid domain. Please use a valid email."
      });
    }

    const name = normalizeName(ctx.body.name);

    return {
      context: { ...ctx, body: { ...ctx.body, name } },
    };
  }

  if (ctx.path === "/sign-in/magic-link") {
    const name = normalizeName(ctx.body.name);

    return {
      context: { ...ctx, body: { ...ctx.body, name } },
    };
  }

  if (ctx.path === "/update-user") {
    const name = normalizeName(ctx.body.name);

    return {
      context: { ...ctx, body: { ...ctx.body, name } },
    };
  }
}