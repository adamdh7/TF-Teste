import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import ChatHeader from '../../components/ChatHeader';
import MessageBubble from '../../components/MessageBubble';
import MessageInputBar from '../../components/MessageInputBar';

const fetcher = url => fetch(url).then(r => r.json());

export default function ChatPage() {
  const router = useRouter();
  const { convId, user } = router.query;
  const { data: messages, mutate } = useSWR(
    convId ? `/api/get-messages?convId=${convId}` : null,
    fetcher,
    { refreshInterval: 2000 }
  );
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async text => {
    await fetch('/api/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: user, to: messages[0]?.participants.find(p => p !== user), text })
    });
    mutate();
  };

  const other = messages?.[0]?.participants.find(p => p !== user) || '---';

  return (
    <div className="flex flex-col h-screen bg-white">
      <ChatHeader title={`TF-${other}`} />
      <div className="flex-1 pt-16 pb-24 px-4 overflow-auto flex flex-col">
        {messages?.length
          ? messages.map((m, i) => (
              <MessageBubble key={i} text={m.text} isOwn={m.from === user} />
            ))
          : <p className="text-center text-gray-500 mt-8">Aucun message</p>
        }
        <div ref={bottomRef} />
      </div>
      <MessageInputBar onSend={handleSend} />
    </div>
  );
}
