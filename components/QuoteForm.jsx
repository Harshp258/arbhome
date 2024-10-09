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
    additionalInfo: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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
        name="clientType"
        value={formData.clientType}
        onChange={handleChange}
        required
      >
        <option value="">I am a*</option>
        <option value="Realtor">Realtor</option>
        <option value="HomeOwner">Home Owner</option>
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
      {isSubmitted && (
        <p style={{ color: 'green', marginTop: '10px' }}>
          Your response is valuable to us. Our company will contact you soon within 24 hours.
        </p>
      )}
      {errorMessage && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          {errorMessage}
        </p>
      )}
    </form>
  );
};

export default QuoteForm;