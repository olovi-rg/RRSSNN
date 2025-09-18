"use client";

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (res.ok) {
        setStatus(data.message);
        setEmail('');
      } else {
        setStatus(data.error || 'Subscription failed');
      }
    } catch {
      setStatus('Network error. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        placeholder="Email Address*"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="py-2 px-4 rounded border border-gray-300 text-black"
      />
      <button
        type="submit"
        className="bg-orange-500 text-white font-semibold rounded py-2 px-5 hover:bg-orange-600"
      >
        Submit
      </button>
      {status && <p className="mt-2 text-sm text-white">{status}</p>}
    </form>
  );
}
