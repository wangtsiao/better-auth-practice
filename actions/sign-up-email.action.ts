"use server"

import { auth, ErrCode } from "@/lib/auth";
import { APIError } from "better-auth/api";

export async function signUpEmailAction(formData: FormData) {
  const name = formData.get('name') as string;
  if (!name) return { error: 'Name is required' }

  const email = formData.get('email') as string;
  if (!email) return { error: 'Email is required' }

  const password = formData.get('password') as string;
  if (!password) return { error: 'Password is required' }

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      }
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