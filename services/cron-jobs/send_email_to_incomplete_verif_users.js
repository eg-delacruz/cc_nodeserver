//Documentation: https://www.npmjs.com/package/cron

const CronJob = require('cron').CronJob;
const {
  sendVerifEmailAndDeleteAcc,
} = require('../../components/unfinished_verif_process_emails/controller');

const send_email_to_incomplete_verif_users = () => {
  let isRunning = false;
  const email_sender = new CronJob(
    process.env.UNCOMPLETED_VERIF_EMAIL_SENDING_FREQUENCY,
    //'*/5 * * * *', //Every 5th min
    // '30 14 * * *' //Every day at 14:30
    async () => {
      console.log('Cron Job executed');
      if (!isRunning) {
        isRunning = true;
        await sendVerifEmailAndDeleteAcc();
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
