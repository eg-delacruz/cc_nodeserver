//This controller handles all pending student validations by
//student ids.
const store = require('./store');

//Mailer
const {
  sendPendingValidationNotification,
} = require('../../services/mailer/cc_info@gmail');

//Notify admin by email if any user is awaiting validation by stu id
//This function will be executed everyday by a Cron Job (see cron jobs folder)
const sendPendingValidationNotificationToAdmin = async () => {
  try {
    //Check if there are pending validatins (returns true/false)
    const validationsAvailable = await store.validationsAvailable();

    //Send notification if validations awaiting
    if (validationsAvailable) {
      const ADMIN_EMAIL = process.env.ADMIN_EMAIL_1;
      await sendPendingValidationNotification(ADMIN_EMAIL);
    }
  } catch (error) {
    console.log(
      '[pending_stu_id_acc_validation controller error]' + error.message
    );
    throw new Error(error.message);
  }
};

module.exports = {
  sendPendingValidationNotificationToAdmin,
};
