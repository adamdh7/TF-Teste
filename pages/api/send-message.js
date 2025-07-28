import { connectDB } from '../../lib/db';

export default async function handler(req, res) {
  const { from, to, text } = req.body;
  const db = (await connectDB()).db();

  let conv = await db
    .collection('conversations')
    .findOne({ participants: { $all: [from, to] } });

  if (!conv) {
    const { insertedId } = await db
      .collection('conversations')
      .insertOne({ participants: [from, to], createdAt: new Date() });
    conv = { _id: insertedId };
  }

  await db.collection('messages').insertOne({
    convId: conv._id.toString(),
    from,
    text,
    read: false,
    createdAt: new Date()
  });

  res.status(200).json({ convId: conv._id.toString() });
                                  }
