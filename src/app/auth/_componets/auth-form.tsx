'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from '@/components/ui/use-toast'

export function AuthForm() {
  const form = useForm();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn("email", { email: data.email, redirect: false });

      toast({
        title: 'Magic Link Sent',
        description: 'Check your email for the magic link to login',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
      })
    }
  });

  return (
    <div className="max-auto max-w-sm space-y-8">
      <div className="space-y2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your email below to login to your account
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="m@example.com" required type="email" {...form.register('email')} />
        </div>
        {/* <div>
          <label htmlFor="password" className="block">
            Password
          </label>
          <input type="password" id="password" className="w-full" />
        </div> */}
        <Button className="w-full">Send Magic Link</Button>
      </form>
    </div>
  );
}
