// scheduler.js
const cron = require('node-cron');
const User = require('./model'); // Adjust the path as necessary

// Schedule a task to run every hour
cron.schedule('0 * * * *', async () => {
  try {
    const now = Date.now();
    await User.updateMany(
      { resetPasswordExpires: { $lt: now } },
      { $unset: { resetPasswordToken: '', resetPasswordExpires: '' } }
    );
    console.log('Expired tokens cleaned up');
  } catch (err) {
    console.error('Error cleaning up expired tokens:', err);
  }
});
