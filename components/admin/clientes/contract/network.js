const express = require('express');
const router = express.Router();

//Response manager
const {
  successResponse,
  errorResponse,
} = require('../../../../network/response');

//Controller
const controller = require('./controller.js');

const path = require('path');
const fileSystem = require('fs');

//TODO: Secure route with JWT and user roles

//PDF Contract - Generation and fetching of the data
router.post('/', async function (req, res) {
  try {
    console.log(process.cwd());
    //This saves the pdf in the server. If the name does never change
    //when a new contract is created, the previous file is erased
    await controller.generateContract(req.body);

    successResponse(req, res, 'Contrato generado', 200);
  } catch (error) {
    errorResponse(req, res, 'Hubo un error al generar el contato', 400, error);
  }
});

//Send generated PDF to the client
router.get('/', async function (req, res) {
  try {
    //See: https://www.youtube.com/watch?v=bt1tOhUYxvM&t=1392s
    const dir_name = process.cwd('/nextcampuscanvas/');
    const filePath = path.join(dir_name, 'contrato.pdf');
    const stat = fileSystem.statSync(filePath);

    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Length': stat.size,
    });

    const readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    await new Promise(function (resolve) {
      readStream.pipe(res);
      readStream.on('end', resolve);
    });
    console.log('[Response] Contrato enviado');
  } catch (error) {
    errorResponse(req, res, 'Ha habido un problema', 400, error);
  }
});

// Default method
router.use((req, res) => {
  errorResponse(req, res, 'Método no soportado', 400, 'Método no soportado');
});

module.exports = router;
