//Model
const UnverifAcc = require('./model');

//TODO: delete this, since accounts will be added from main Next.js App
/////////////////////Add UnverifAcc//////////////////////////////
const addUnverifAcc = async (unverifAcc) => {
  return await UnverifAcc.create(unverifAcc);
};

/////////////////////Get UnverifAccs//////////////////////////////
const getAllAccEmails = async () => {
  return await UnverifAcc.find({});
};

/////////////////////Get unverifAcc by email//////////////////////////////

const getUnverifAccByEmail = async (email) => {
  const unverifAcc = await UnverifAcc.findOne({
    email,
  });
  if (!unverifAcc) {
    console.log('[db] Usuario no encontrado');
    throw new Error('Usuario no encontrado');
  }
  return unverifAcc;
};

/////////////////////Eliminate UnverifAcc//////////////////////////////

const deleteUnverifAcc = async (unverifAcc) => {
  const deletedUnverifAcc = await unverifAcc.deleteOne();
  return deletedUnverifAcc;
};

module.exports = {
  add: addUnverifAcc,
  getByEmail: getUnverifAccByEmail,
  getAll: getAllAccEmails,
  delete: deleteUnverifAcc,
};
