const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendOrderConfirmation = async (userEmail, orderData) => {
  try {
    const msg = {
      to: userEmail,
      from: process.env.EMAIL_FROM || 'noreply@veganfresh.com',
      subject: `Order Confirmation - #${orderData.orderNumber}`,
      html: `
        <h2>Order Confirmed! ✅</h2>
        <p>Thank you for your order!</p>
        <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
        <p><strong>Total Amount:</strong> Rs. ${orderData.totalAmount}</p>
        <p><strong>Status:</strong> ${orderData.orderStatus}</p>
        <p><strong>Estimated Delivery:</strong> ${new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toDateString()}</p>
        <p>Track your order at: http://localhost:3000/orders/${orderData._id}</p>
        <p>Thank you for choosing Vegan Fresh!</p>
      `,
    };
    
    await sgMail.send(msg);
    console.log(`✅ Order confirmation email sent to ${userEmail}`);
  } catch (error) {
    console.error('❌ Email error:', error.message);
  }
};

const sendOrderStatusUpdate = async (userEmail, orderStatus, orderNumber) => {
  try {
    const msg = {
      to: userEmail,
      from: process.env.EMAIL_FROM || 'noreply@veganfresh.com',
      subject: `Order Update - #${orderNumber}`,
      html: `
        <h2>Your Order Status Updated 📦</h2>
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>New Status:</strong> ${orderStatus}</p>
        <p>Track your order: http://localhost:3000/orders</p>
      `,
    };
    
    await sgMail.send(msg);
    console.log(`✅ Status update email sent to ${userEmail}`);
  } catch (error) {
    console.error('❌ Email error:', error.message);
  }
};

const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const msg = {
      to: userEmail,
      from: process.env.EMAIL_FROM || 'noreply@veganfresh.com',
      subject: 'Welcome to Vegan Fresh!',
      html: `
        <h2>Welcome to Vegan Fresh! 🥬</h2>
        <p>Hi ${userName},</p>
        <p>We're excited to have you on board!</p>
        <p>Start shopping fresh organic vegetables today.</p>
        <p>Happy shopping!</p>
      `,
    };
    
    await sgMail.send(msg);
    console.log(`✅ Welcome email sent to ${userEmail}`);
  } catch (error) {
    console.error('❌ Email error:', error.message);
  }
};

module.exports = { sendOrderConfirmation, sendOrderStatusUpdate, sendWelcomeEmail };