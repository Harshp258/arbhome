import clientPromise from '../../lib/mongodb';
import QuoteRequest from '../../models/QuoteRequest';
import { sendQuoteRequestEmail } from '../../lib/email';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db();

      const quoteRequest = new QuoteRequest(req.body);
      await db.collection('quoteRequests').insertOne(quoteRequest);

      // Send email notification
      try {
        await sendQuoteRequestEmail(quoteRequest);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Continue execution even if email fails
      }

      res.status(201).json({ success: true, data: quoteRequest });
    } catch (error) {
      console.error('Error processing quote request:', error);
      res.status(400).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}