const express = require('express');
const router = express.Router();

//Response manager
const {
  successResponse,
  errorResponse,
} = require('../../../../network/response');

//Controller
const controller = require('./controller.js');

//Securing route with secret key
const SECRET_KEY = process.env.SERVER_SECRET_KEY;

//PDF Contract - Generation and fetching of the data
router.post('/', async function (req, res) {
  if (req.headers.secret_key === SECRET_KEY) {
    // const cliente = req.body.cliente;
    // const campana = req.body.campana;
    // const contrato = req.body.contrato;

    await controller.generateContract(req.body);
    return successResponse(req, res, 'Todo OK', 201);
  } else {
    errorResponse(req, res, 'Forbidden', 403, 'Access denied');
  }
});

// Default method
router.use((req, res) => {
  errorResponse(req, res, 'Método no soportado', 400, 'Método no soportado');
});

module.exports = router;
