'use client';

import * as React from 'react';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';

type ContactFormProps = {
  email?: string | null;
};

export function ContactForm({ email }: ContactFormProps) {
  const [status, setStatus] = React.useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = React.useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? '')
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      form.reset();
      setStatus('success');
      setMessage('Thanks! Your message has been sent.');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <form
      className="mx-auto w-full max-w-2xl space-y-4 rounded-2xl border border-border bg-card p-6"
      onSubmit={onSubmit}
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
      <div className="space-y-2 text-sm text-muted-foreground">
        {message ? <p>{message}</p> : null}
        {!message && !email ? <p>Email is not configured yet.</p> : null}
        <Button
          type="submit"
          disabled={!email || status === 'loading'}
          className="w-full"
          size="lg"
        >
          {status === 'loading' ? 'Sending…' : 'Send message'}
        </Button>
      </div>
    </form>
  );
}
