import mongoose from 'mongoose';

const QuoteRequestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  targetStagingDate: { type: Date },
  propertyAddress: { type: String },
  clientType: { type: String },
  propertyType: { type: String, required: true },
  approximateSquareFootage: { type: Number },
  estimatedListingPrice: { type: Number },
  additionalInfo: { type: String },
  stagingType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.QuoteRequest || mongoose.model('QuoteRequest', QuoteRequestSchema);