import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/QuoteForm.module.css';

const Modal = ({ message, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <button onClick={onClose} className={styles.thankYouButton}>
          Thank You
        </button>
      </div>
    </div>
  );
};

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    targetStagingDate: '',
    propertyAddress: '',
    stagingType: '',
    propertyType: '',
    approximateSquareFootage: '',
    additionalInfo: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setShowModal(true);
        setErrorMessage('');
      } else {
        throw new Error('Failed to submit quote request');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to submit quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
    <br />
    <br />
    <br />
    <br />
    <br />
    <div className={styles.quoteContainer}>
      <div className={styles.imageSection}>
        <Image
          src="/images/img10.jpg"
          alt="Luxury Interior"
          layout="fill"
          objectFit="cover"
          className={styles.backgroundImage}
        />
        <div className={styles.overlay}>
          <h1>Transform Your Space</h1>
          <p>Get a personalized quote for our premium staging services</p>
        </div>
      </div>
      <div className={styles.formSection}>
        <h2 className={styles.formTitle}>Request a Quote</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name*</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phoneNumber">Phone Number*</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="targetStagingDate">Target Staging Date</label>
            <input
              type="date"
              id="targetStagingDate"
              name="targetStagingDate"
              value={formData.targetStagingDate}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="propertyAddress">Property Address</label>
            <input
              type="text"
              id="propertyAddress"
              name="propertyAddress"
              value={formData.propertyAddress}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="stagingType">Staging Type*</label>
            <select
              id="stagingType"
              name="stagingType"
              value={formData.stagingType}
              onChange={handleChange}
              required
            >
              <option value="">Select Staging Type</option>
              <option value="Real Estate Staging">Real Estate Staging</option>
              <option value="Staging Consultation">Staging Consultation</option>
              <option value="Luxury Home Staging">Luxury Home Staging</option>
              <option value="Occupied Home Staging">Occupied Home Staging</option>
              <option value="Vacant Home Staging">Vacant Home Staging</option>
              <option value="Condo Staging">Condo Staging</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="propertyType">Property Type*</label>
            <input
              type="text"
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="approximateSquareFootage">Approximate Square Footage</label>
            <input
              type="number"
              id="approximateSquareFootage"
              name="approximateSquareFootage"
              value={formData.approximateSquareFootage}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="additionalInfo">Additional Information</label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows="4"
            />
          </div>
          <button 
              type="submit" 
              className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  Submitting
                  <span className={styles.dots}>
                    <span>.</span><span>.</span><span>.</span>
                  </span>
                </>
              ) : (
                'Submit Quote Request'
              )}
            </button>
          </form>
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </div>
        {showModal && (
          <Modal 
            message="Your response is valuable to us. Our company will contact you soon within 24 hours."
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
      <br />
      <br />
    </>
  );
};

export default QuoteForm;