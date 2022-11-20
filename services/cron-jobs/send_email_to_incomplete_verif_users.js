//Documentation: https://www.npmjs.com/package/cron
//Configure frequency helper: https://crontab.guru/#*_*_*_*_*

const CronJob = require('cron').CronJob;
const {
  sendVerifEmailAndDeleteAcc,
} = require('../../components/unfinished_verif_process_emails/controller');
const { dateToLetterswithOutDay } = require('../../services/dateToLetters');

const send_email_to_incomplete_verif_users = () => {
  let isRunning = false;
  const email_sender = new CronJob(
    process.env.UNCOMPLETED_VERIF_EMAIL_SENDING_FREQUENCY,
    //'*/5 * * * *', //Every 5th min
    // '30 14 * * *' //Every day at 14:30
    async () => {
      console.log(
        'Cron Job - Send email to incomplete verif users ' +
          dateToLetterswithOutDay(new Date())
      );
      //Avoid rerunning the cronjob if a previous one is still executing
      if (!isRunning) {
        isRunning = true;
        await sendVerifEmailAndDeleteAcc();
        isRunning = false;
        //If cronjob executing, show that it is running and can´t run again until previous one finishes
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
