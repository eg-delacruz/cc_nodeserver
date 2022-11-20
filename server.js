const express = require('express');
const app = express();
const server = require('http').Server(app);
const config = require('./config');
//Permitirá ver el servidor desde un frontend
const cors = require('cors');
const router = require('./network/routes');
const db = require('./db');

//CronJobs
const {
  send_email_to_incomplete_verif_users,
} = require('./services/cron-jobs/send_email_to_incomplete_verif_users');
const {
  send_notification_if_pending_validations_available,
} = require('./services/cron-jobs/send_pending_stu_id_validation_notification_to_admin');

db(config.dbURL);

//Permitirá ver el servidor desde un frontend
app.use(cors());

//definimos el tipo de datos que irán en el body.
app.use(express.json());
//definimos que podamos enviar URL forms en el body (otro tipo de formato)
//El cliente lo recibe como un objeto json
app.use(express.urlencoded({ extended: true }));

router(app);

//Todas las rutas que pidamos a partir de app/etc, las irá a buscar a la carpeta "public"
//app.use(config.publicRoute, express.static('public'));

//Asignamos un puerto al servidor
server.listen(config.port, () => {
  console.log(
    'La aplicación está escuchando en ' + config.host + ':' + config.port
  );

  //Cron Job: Send email to incomplete verified users
  send_email_to_incomplete_verif_users();

  //Cron Job: Notify admin if any user is awaiting validation by stu id
  send_notification_if_pending_validations_available();
});
