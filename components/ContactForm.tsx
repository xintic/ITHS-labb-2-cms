'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type ContactFormProps = {
  email?: string | null;
};

export function ContactForm({ email }: ContactFormProps) {
  const action = email ? `mailto:${email}` : undefined;

  return (
    <form
      className="mx-auto w-full max-w-2xl space-y-4 rounded-2xl border border-border bg-card p-6"
      action={action}
      method="post"
      encType="text/plain"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            required
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>
      </div>
      <div className="space-y-3">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          className="resize-none"
          id="contact-message"
          name="message"
          placeholder="Tell me about your project..."
          required
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <Button type="submit" disabled={!email} className="w-full" size="lg">
          Send message
        </Button>
      </div>
    </form>
  );
}
