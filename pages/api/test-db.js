import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('test');
    const result = await collection.insertOne({ test: 'Hello MongoDB' });
    res.status(200).json({ message: 'Connected to MongoDB', result });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    res.status(500).json({ error: 'Failed to connect to MongoDB' });
  }
}