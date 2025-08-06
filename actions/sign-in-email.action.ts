"use server"

import { auth, ErrCode } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

export async function signInEmailAction(formData: FormData) {

  const email = formData.get('email') as string;
  if (!email) return { error: 'Email is required' }

  const password = formData.get('password') as string;
  if (!password) return { error: 'Password is required' }

  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
    });

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrCode) : "UNKNOWN";
      switch (errCode) {
        default:
          return { error: err.message }
      }
    }

    return { error: "Oops! Something went wrong. Please try again later." };
  }
}