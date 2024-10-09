import mongoose from 'mongoose';

const QuoteRequestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  targetStagingDate: Date,
  propertyAddress: String,
  clientType: { type: String, enum: ['Realtor', 'HomeOwner'], required: true },
  propertyType: { type: String, required: true },
  approximateSquareFootage: Number,
  estimatedListingPrice: Number,
  additionalInfo: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.QuoteRequest || mongoose.model('QuoteRequest', QuoteRequestSchema);