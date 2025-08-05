import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Button >Hello World!</Button>
      {session && <p className="ml-4">Welcome back, {session.user.email}!</p>}
      {!session && <p className="ml-4">You are not logged in.</p>}
      {session && <Button size={"sm"} asChild><Link href='/profile'>Profile</Link></Button>}
    </div>
  );
}
