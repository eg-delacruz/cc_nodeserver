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
  unverifAccs.map(async (account) => {
    console.log(account.email);
    await sendIncompleteVerifEmail(account.email);
    await store.delete(account);
  });
};

module.exports = { sendVerifEmailAndDeleteAcc };
