const express = require('express');
const router = express.Router();

//TODO:Erase this
const store = require('../../../unfinished_verif_process_emails/store');

//Response manager
const {
  successResponse,
  errorResponse,
} = require('../../../../network/response');

//Controller
const controller = require('./controller.js');

//Securing route with secret key
const SECRET_KEY = process.env.SERVER_SECRET_KEY;

router.post('/', async function (req, res) {
  if (req.headers.secret_key === SECRET_KEY) {
    //TODO: erase this whole try catch
    try {
      const Acc = {
        email: req.body.email,
        creation_date: new Date(),
      };
      const addedAcc = await store.add(Acc);
      return successResponse(req, res, addedAcc, 201);
    } catch (error) {
      return errorResponse(req, res, 'Hubo un error', 400, 'Hubo un error');
    }
    //TODO: uncomment this response
    //return successResponse(req, res, 'Todo OK', 201);
  } else {
    errorResponse(req, res, 'Forbidden', 403, 'Access denied');
  }
});

// Default method
router.use((req, res) => {
  errorResponse(req, res, 'Método no soportado', 400, 'Método no soportado');
});

module.exports = router;
