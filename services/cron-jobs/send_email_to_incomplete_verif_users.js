import CronJob from 'cron';
CronJob.CronJob;

const send_email_to_incomplete_verif_users = new CronJob(
  //'30 14 * * *', //Every day at 2:30 pm
  '* * * * *',
  function () {
    console.log('You will see this message every second');
  }
);

send_email_to_incomplete_verif_users.start();
