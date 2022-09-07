//Aquí gestionamos la conexión y configuración de la base de datos

const db = require('mongoose');

//Le decimos a Mongoose que cuando quiera utilizar cualquier promesa, que utilice esta
//la cual es la nativa, pero podemos usar otras librerías para promesas
db.Promise = global.Promise;

const connect = async (url) => {
  //URL de base de datos de MongoDB y config de MongoDB. Es una promesa
  await db
    .connect(
      url,
      //Evitar problemas de compatibilidad en caso de que server sea más nuevo o antiguo:
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log('[db] Conectada con éxito');
    })
    .catch((err) => {
      console.error('[db]', err);
    });
};

module.exports = connect;
