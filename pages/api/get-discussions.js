import { connectDB } from '../../lib/db';

export default async function handler(req, res) {
  const { user } = req.query;
  const db = (await connectDB()).db();

  const convs = await db
    .collection('conversations')
    .find({ participants: user })
    .toArray();

  const data = await Promise.all(
    convs.map(async conv => {
      const last = await db
        .collection('messages')
        .find({ convId: conv._id.toString() })
        .sort({ createdAt: -1 })
        .limit(1)
        .toArray();

      const lastMsg = last[0] || null;
      return {
        _id: conv._id.toString(),
        participants: conv.participants,
        lastMsg,
        hasUnread: !!lastMsg && lastMsg.from !== user && !lastMsg.read
      };
    })
  );

  res.status(200).json(data);
              }
