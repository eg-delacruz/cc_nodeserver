const store = require('./store');

//Mailer
const {
  sendIncompleteVerifEmail,
} = require('../../services/mailer/cc_info@gmail');

//This function will be executed everyday by a Cron Job (see cron jobs folder)
const sendVerifEmailAndDeleteAcc = async () => {
  //getting Users
  const unverifAccs = await store.getAll();

  //Sending emails
  //It will only send it if the entry was created more than 24h ago
  const milliseconds_in_a_day = 86400000;
  unverifAccs.map(async (account) => {
    const now = new Date();
    //Value in milliseconds
    const distance_since_creation = now - account.creation_date;
    if (distance_since_creation >= milliseconds_in_a_day) {
      await sendIncompleteVerifEmail(account.email);
      await store.delete(account);
    }
  });
};

module.exports = { sendVerifEmailAndDeleteAcc };
