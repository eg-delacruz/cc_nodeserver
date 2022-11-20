//Documentation: https://www.npmjs.com/package/cron
//Configure frequency helper: https://crontab.guru/#*_*_*_*_*

const CronJob = require('cron').CronJob;
const {
  sendPendingValidationNotificationToAdmin,
} = require('../../components/pending_stu_id_acc_validation/controller');
const { dateToLetterswithOutDay } = require('../../services/dateToLetters');

const send_notification_if_pending_validations_available = () => {
  let isRunning = false;
  const notification_sender = new CronJob(
    process.env.PENDING_VALIDATIONS_NOTIFICATION_FREQUENCY,
    async () => {
      console.log(
        'Cron Job - Send notification to admin of available pending validations ' +
          dateToLetterswithOutDay(new Date())
      );
      //Avoid rerunning the cronjob if a previous one is still executing
      if (!isRunning) {
        isRunning = true;
        await sendPendingValidationNotificationToAdmin();
        isRunning = false;
        //If cronjob executing, show that it is running and can´t run again until previous one finishes
      } else {
        console.log(
          '[CRON-JOBS - send_pending_stu_id_validation_to_admin.js] Already running'
        );
      }
    }
  );
  notification_sender.start();
};

module.exports = {
  send_notification_if_pending_validations_available,
};
