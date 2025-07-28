import { connectDB } from '../../lib/db';

export default async function handler(req, res) {
  const { convId } = req.query;
  const msgs = await (await connectDB())
    .db()
    .collection('messages')
    .find({ convId })
    .sort({ createdAt: 1 })
    .toArray();

  res.status(200).json(msgs);
}
