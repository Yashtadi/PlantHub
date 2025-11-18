import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  try {
    // Create transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email options
    const mailOptions = {
      from: `PlantHub <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.html
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent to:', options.email);
  } catch (error) {
    console.error('Email error:', error);
    throw new Error('Could not send email. Please contact support.');
  }
};

export default sendEmail;