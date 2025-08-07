"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'
import { useMutation } from '@tanstack/react-query';
import { DeleteUserAction } from '@/actions/delete-user.action';
import { toast } from 'sonner';

interface DeleteUserButtonProp {
    userId: string
}

export function DeleteUserButton({ userId }: DeleteUserButtonProp) {
    const mutation = useMutation({
        mutationFn: async (userId: string) => {
            return await DeleteUserAction({ userId });
        },
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error);
                return;
            }
            toast.success("User deleted successfully");
        },
        onError: () => {
            toast.error("Network failed, please try again later");
        }
    });

    function handleClick() {
        mutation.mutate(userId);
    }

    return (
        <Button size={"icon"} variant={"destructive"} onClick={handleClick} disabled={mutation.isPending} className="size-7 rounded-sm">
            <span className="sr-only">Delete User</span>
            <Trash2Icon />
        </Button>
    )
}

export const PlaceholderDeleteUserButton = () => {
  return (
    <Button
      size="icon"
      variant="destructive"
      className="size-7 rounded-sm"
      disabled
    >
      <span className="sr-only">Delete User</span>
      <Trash2Icon />
    </Button>
  );
};