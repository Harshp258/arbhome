import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/QuickQuote.module.css';

export default function QuickQuote() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyType: '',
    propertyStatus: '',
    hasPets: '',
    address: '',
    city: '',
    postalCode: '',
    intersection: '',
    sellingPrice: '',
    stagingDate: '',
    squareFootage: '',
    roomsToStage: [],
    bedrooms: '',
    bathrooms: '',
    additionalInfo: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' 
        ? (checked 
          ? [...prevState.roomsToStage, value]
          : prevState.roomsToStage.filter(room => room !== value))
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you would typically send the data to your server or a third-party service
    alert('Quote request submitted!');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Get a Quick Quote - Your Home Staging Company</title>
        <meta name="description" content="Request a quote for our professional home staging services" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Get a Quote</h1>
        <p className={styles.description}>
          Every home we stage is as unique as its owner and we believe that each project should receive a one-of-a-kind makeover. Please fill out the form below to find out how little it will take to stage and sell your home in record time for best price possible:
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First name*</label>
            <input type="text" id="firstName" name="firstName" required onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last name*</label>
            <input type="text" id="lastName" name="lastName" required onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email address*</label>
            <input type="email" id="email" name="email" required onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone number*</label>
            <input type="tel" id="phone" name="phone" required onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="propertyType">Property type*</label>
            <select id="propertyType" name="propertyType" required onChange={handleChange}>
              <option value="">Select...</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="propertyStatus">Is the property*</label>
            <select id="propertyStatus" name="propertyStatus" required onChange={handleChange}>
              <option value="">Select...</option>
              <option value="lived">Lived in / Furnished</option>
              <option value="vacant">Vacant / Empty</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="hasPets">Does the property have pets?*</label>
            <select id="hasPets" name="hasPets" required onChange={handleChange}>
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Street address*</label>
            <input type="text" id="address" name="address" required onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="city">City*</label>
            <input type="text" id="city" name="city" required onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="postalCode">Postal Code*</label>
            <input type="text" id="postalCode" name="postalCode" required onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="intersection">Area / Main Intersection*</label>
            <input type="text" id="intersection" name="intersection" required onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="sellingPrice">Approximate selling price of the property*</label>
            <input type="text" id="sellingPrice" name="sellingPrice" required onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="stagingDate">When will you need the property staged?*</label>
            <input type="date" id="stagingDate" name="stagingDate" required onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="squareFootage">Approximate square footage of the property*</label>
            <input type="number" id="squareFootage" name="squareFootage" required onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Rooms you would like to stage*</label>
            <div className={styles.checkboxGroup}>
              {['Living Room', 'Dining Room', 'Family Room', 'Kitchen', 'Rec Room', 'Bedrooms', 'Bathrooms'].map((room) => (
                <label key={room}>
                  <input
                    type="checkbox"
                    name="roomsToStage"
                    value={room}
                    onChange={handleChange}
                  /> {room}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="bedrooms"># of bedrooms in property*</label>
            <input type="number" id="bedrooms" name="bedrooms" required onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="bathrooms"># of bathrooms in property*</label>
            <input type="number" id="bathrooms" name="bathrooms" required onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="additionalInfo">Is there anything else we should know?</label>
            <textarea id="additionalInfo" name="additionalInfo" rows="4" onChange={handleChange}></textarea>
          </div>

          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
      </main>
    </div>
  );
}