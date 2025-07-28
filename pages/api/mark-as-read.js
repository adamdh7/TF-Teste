import { connectDB } from '../../lib/db';

export default async function handler(req, res) {
  const { convId, user } = req.body;
  const db = (await connectDB()).db();

  await db.collection('messages').updateMany(
    { convId, from: { $ne: user }, read: false },
    { $set: { read: true } }
  );

  res.status(200).json({ ok: true });
}
