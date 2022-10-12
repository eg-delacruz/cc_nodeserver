const CronJob = require('cron').CronJob;
const { job } = require('../mailer/cc_info@gmail');

const send_email_to_incomplete_verif_users = () => {
  let isRunning = false;
  const email_sender = new CronJob(
    //TODO: put it in .env file
    //'30 14 * * *', //Every day at 2:30 pm
    '* * * * * *',
    async () => {
      if (!isRunning) {
        isRunning = true;
        await job();
        isRunning = false;
      } else {
        console.log(
          '[CRON-JOBS - send_email_to_incomplete_verif_users.js] Already running'
        );
      }
    }
  );
  email_sender.start();
};

module.exports = {
  send_email_to_incomplete_verif_users,
};
