const contract = require('../components/admin/clientes/contract/network');

const VERSION = process.env.API_URL_VERSION;
//We send the request to the required component,
//according to the URL/route to which the req was made
const routes = (server) => {
  //Each time we call '/contract URL',
  //The req. is sent to the network.js
  //file of contract component

  ////////////////v1///////////////////////
  server.use(`/api/${VERSION}/admin/clientes/contract`, contract);

  ////////////////v2///////////////////////
};

module.exports = routes;
