import React from 'react';
import { useRouter } from 'next/router';

export default function ChatHeader({ title }) {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between p-4 bg-white backdrop-blur-md border-b fixed top-0 w-full z-10">
      <button onClick={() => router.back()} className="p-2">
        {/* SVG codé Retour */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </button>
      <h1 className="text-lg font-medium">{title}</h1>
      <button className="p-2">
        {/* SVG codé Options */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
        </svg>
      </button>
    </header>
  );
}
