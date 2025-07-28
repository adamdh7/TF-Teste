import React, { useState } from 'react';

export default function MessageInputBar({ onSend }) {
  const [text, setText] = useState('');
  return (
    <div className="fixed bottom-0 w-full p-4 bg-white border-t flex items-center z-10">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Écrire un message..."
        className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none"
      />
      <button
        onClick={() => {
          if (text.trim()) {
            onSend(text.trim());
            setText('');
          }
        }}
        className="p-2 rounded-full hover:bg-gray-200"
      >
        {/* SVG Send */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M2 21L23 12 2 3v7l15 2-15 2v7z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  );
}
