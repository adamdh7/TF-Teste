import React from 'react';

export default function MessageBubble({ text, isOwn }) {
  const base = "max-w-[80%] p-3 rounded-2xl mb-2 inline-block break-words";
  const style = isOwn
    ? `${base} bg-blue-200 self-end rounded-br-none`
    : `${base} bg-gray-200 self-start rounded-bl-none`;
  return <div className={style}>{text}</div>;
}
