import React, { useState } from 'react';

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    targetStagingDate: '',
    propertyAddress: '',
    clientType: '',
    propertyType: '',
    approximateSquareFootage: '',
    estimatedListingPrice: '',
    additionalInfo: '',
    stagingType: '', // Add stagingType to state
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSubmitted(true);
        setErrorMessage('');
      } else {
        throw new Error('Failed to submit quote request');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to submit quote request. Please try again.');
      setIsSubmitted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name*"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email*"
        required
      />
      <input
        type="tel"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number*"
        required
      />
      <input
        type="date"
        name="targetStagingDate"
        value={formData.targetStagingDate}
        onChange={handleChange}
      />
      <input
        type="text"
        name="propertyAddress"
        value={formData.propertyAddress}
        onChange={handleChange}
        placeholder="Property Address"
      />
      
      <select
        name="stagingType" // Name for the dropdown
        value={formData.stagingType} // Bind the value to the state
        onChange={handleChange} // Handle change event
        required
      >
        <option value="">Select Staging Type*</option>
        <option value="Real Estate Staging">Real Estate Staging</option>
        <option value="Staging Consultation">Staging Consultation</option>
        <option value="Luxury Home Staging">Luxury Home Staging</option>
        <option value="Occupied Home Staging">Occupied Home Staging</option>
        <option value="Vacant Home Staging">Vacant Home Staging</option>
        <option value="Condo Staging">Condo Staging</option>
      </select>

      <input
        type="text"
        name="propertyType"
        value={formData.propertyType}
        onChange={handleChange}
        placeholder="Property Type*"
        required
      />
      <input
        type="number"
        name="approximateSquareFootage"
        value={formData.approximateSquareFootage}
        onChange={handleChange}
        placeholder="Approximate Square Footage"
      />
      <input
        type="number"
        name="estimatedListingPrice"
        value={formData.estimatedListingPrice}
        onChange={handleChange}
        placeholder="Estimated Listing Price"
      />
      <textarea
        name="additionalInfo"
        value={formData.additionalInfo}
        onChange={handleChange}
        placeholder="Additional Information"
      />

      <button type="submit">Submit Quote Request</button>

      {/* Success Message */}
      {isSubmitted && (
          <p style={{ color: 'green', marginTop: '10px' }}>
            Your response is valuable to us. Our company will contact you soon within 24 hours.
          </p>
      )}

      {/* Error Message */}
      {errorMessage && (
          <p style={{ color: 'red', marginTop: '10px' }}>
            {errorMessage}
          </p>
      )}
    </form>
  );
};

export default QuoteForm;