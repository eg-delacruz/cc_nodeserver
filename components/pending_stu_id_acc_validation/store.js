//Model
const pendingStuIdAccValidation = require('./model');

//////////////////Check if pending validations available///////////////////////////
const validationsAvailable = async () => {
  try {
    const validationsAvailable =
      await pendingStuIdAccValidation.estimatedDocumentCount();

    if (validationsAvailable == 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log('[Pending validation store error]', error);
    throw new Error(error);
  }
};

module.exports = {
  validationsAvailable,
};
