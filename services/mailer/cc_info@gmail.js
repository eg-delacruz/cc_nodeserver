const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAILER_TRANSPORTER_USER,
    pass: process.env.MAILER_TRANSPORTER_PASSWORD,
  },
});

const sendIncompleteVerifEmail = async (userEmail) => {
  transporter.verify().then(() => {
    console.log('Server is ready to send messages');
  });

  const result = await transporter.sendMail({
    from: 'Campus Canvas <campuscanvas.info@gmail.com>', // sender address
    to: userEmail,
    subject: 'Completa tu registro en Campus Canvas', // Subject line
    html: `
    <h3>¡Estás a muy poco de poder pedir tu <b>Campus Box</b> y acceder a promociones increíbles!</h3>
    <p>Aún no has completado tu verificación como estudiante en Campus Canvas.</p>
    <p>Inicia sesión en nuestra aplicación web, completa la verificación y disfruta de nuestros beneficios: </p>

    <table cellspacing="0" cellpadding="0">
      <tr>
        <td style="border-radius: 2px;" bgcolor="#ad2146">
          <a href="https://www.campuscanvas.net/auth/login" style="padding: 8px 12px; border: 1px solid #ad2146;border-radius: 5px;font-family: Arial, Helvetica, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
            Completar verificación           
          </a>
        </td>
      </tr>
    </table>
    <p>Si tienes alguna duda, estamos siempre disponibles para ti en <a href="https://www.campuscanvas.net/contacto">https://www.campuscanvas.net/contacto</a></p>
    <p>Saludos cordiales,</p>
    <p>El equipo de Campus Canvas</p>
    <p><img src="https://i.imgur.com/FXcN6YI.png"/></p>
    `, // html body
  });
  return result;
};

module.exports = {
  sendIncompleteVerifEmail,
};
