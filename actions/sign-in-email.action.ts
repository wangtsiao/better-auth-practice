"use server"

import { auth } from "@/lib/auth";
import { cookies, headers } from "next/headers";

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
      asResponse: true,
    });

    return {error: null};
  } catch (err) {
    if (err instanceof Error) {
      return {error: "Oops! Something went wrong. Please try again later."};
    }
  }
}