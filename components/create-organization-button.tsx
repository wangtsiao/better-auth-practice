"use client"

import React, { useState } from 'react'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useMutation } from '@tanstack/react-query'
import { createOrganization } from '@/actions/create-organization.action'
import { toast } from 'sonner'


interface CreateOrganizationButtonProps {
    refetch: () => void;
}

function CreateOrganizationButton({ refetch }: CreateOrganizationButtonProps) {
    const [open, setOpen] = useState(false);

    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
            return await createOrganization(formData);
        },
        onSuccess: (res) => {
            if (!res.error) {
                toast.success("Organization created successfully!");
                setOpen(false);
                refetch();
            } else {
                console.log(res.error);
                toast.error(res.error as string);
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        mutation.mutate(formData);
        
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create Organization</Button>
            </DialogTrigger>
            <DialogContent className='max-w-sm'>
                <DialogHeader>
                    <DialogTitle>Create Organization</DialogTitle>
                    <DialogDescription>
                        Create a new organization.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="slug">Slug</Label>
                            <Input id="slug" name="slug" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={mutation.isPending}>Confirm</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateOrganizationButton