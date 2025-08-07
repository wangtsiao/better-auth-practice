"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { toast } from "sonner";

interface SignOauthButtonProps {
  provider: "google" | "github";
  signUp?: boolean;
}

export const SignOauthButton = ({
  provider,
  signUp,
}: SignOauthButtonProps) => {

  const mutation = useMutation({
    mutationFn: async () => {
      return await signIn.social({
        provider,
        callbackURL: "/profile",
        errorCallbackURL: "/auth/login/error",
      });
    },
    onError: (error: any) => {
      toast.error(error?.message || "OAuth sign-in failed");
    },
  });

  function handleClick() {
    mutation.mutate();
  }

  const action = signUp ? "Up" : "In";
  const providerName = provider === "google" ? "Google" : "GitHub";

  return (
    <Button onClick={handleClick} disabled={mutation.isPending}>
      {mutation.isPending && <Loader className="w-4 h-4 mr-2 animate-spin" />} Sign {action} with {providerName}
    </Button>
  );
};