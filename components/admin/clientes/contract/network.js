const express = require('express');
const router = express.Router();

//Response manager
const {
  successResponse,
  errorResponse,
} = require('../../../../network/response');

//Securing route with secret key
const SECRET_KEY = process.env.SERVER_SECRET_KEY;

router.post('/', async function (req, res) {
  if (req.headers.secret_key === SECRET_KEY) {
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
