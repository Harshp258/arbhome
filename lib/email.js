import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2',
  },
});

export async function sendQuoteRequestEmail(quoteData) {
  // Assuming your website is hosted at example.com, replace with your actual domain
  const logoUrl = 'https://example.com/images/logo.png';

  const mailOptions = {
    from: `"ARB Home Staging" <${process.env.EMAIL_USER}>`,
    to: process.env.COMPANY_EMAIL,
    subject: 'New Quote Request Submitted',
    text: `
A new quote request has been submitted:

Full Name: ${quoteData.fullName}
Email: ${quoteData.email}
Phone Number: ${quoteData.phoneNumber}
Target Staging Date: ${quoteData.targetStagingDate || 'Not specified'}
Property Address: ${quoteData.propertyAddress || 'Not specified'}
Staging Type: ${quoteData.stagingType}
Property Type: ${quoteData.propertyType}
Approximate Square Footage: ${quoteData.approximateSquareFootage || 'Not specified'}
Estimated Listing Price: ${quoteData.estimatedListingPrice || 'Not specified'}
Additional Info: ${quoteData.additionalInfo || 'None provided'}

Please contact this client within 24 hours.
    `,
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <img src="${logoUrl}" alt="Company Logo" style="display: block; margin: 20px auto; max-width: 200px;">
  <h2 style="color: #493A7F; text-align: center;">New Quote Request Submitted</h2>
  <p>A new quote request has been submitted with the following details:</p>
  <ul style="list-style-type: none; padding-left: 0;">
    <li><strong>Full Name:</strong> ${quoteData.fullName}</li>
    <li><strong>Email:</strong> ${quoteData.email}</li>
    <li><strong>Phone Number:</strong> ${quoteData.phoneNumber}</li>
    <li><strong>Target Staging Date:</strong> ${quoteData.targetStagingDate || 'Not specified'}</li>
    <li><strong>Property Address:</strong> ${quoteData.propertyAddress || 'Not specified'}</li>
    <li><strong>Staging Type:</strong> ${quoteData.stagingType}</li>
    <li><strong>Property Type:</strong> ${quoteData.propertyType}</li>
    <li><strong>Approximate Square Footage:</strong> ${quoteData.approximateSquareFootage || 'Not specified'}</li>
    <li><strong>Estimated Listing Price:</strong> ${quoteData.estimatedListingPrice || 'Not specified'}</li>
    <li><strong>Additional Info:</strong> ${quoteData.additionalInfo || 'None provided'}</li>
  </ul>
  <p style="color: #493A7F; font-weight: bold; text-align: center;">Please contact this client within 24 hours.</p>
</div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Quote request email sent successfully');
  } catch (error) {
    console.error('Error sending quote request email:', error);
    throw error;
  }
}