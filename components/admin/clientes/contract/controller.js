const store = require('./store');
const {
  createPublicityContract,
} = require('../../../../services/createPublicityContract');
//https://openbase.com/js/html-pdf/documentation
const pdf = require('html-pdf');
const path = require('path');
const fs = require('fs');

const generateContract = async ({ cliente, campana, contrato }) => {
  if (
    !(
      cliente.nombre ||
      cliente.tipo ||
      cliente.dni ||
      campana.tipo_de_campana ||
      contrato.lugar_de_creacion
    )
  ) {
    throw new Error(
      '[Client/contract controller] Información insuficiente para generar contrato'
    );
  }

  const client_copy = JSON.parse(JSON.stringify(cliente));
  const campaign_copy = JSON.parse(JSON.stringify(campana));
  const contract_info_copy = JSON.parse(JSON.stringify(contrato));

  try {
    const contract_info = {
      client_name: client_copy.nombre.toLowerCase(),
      client_type: client_copy.tipo.toLowerCase(),
      client_DNI: client_copy.dni.toLowerCase(),
      company: client_copy.empresa_representada.toLowerCase(),
      campaign_type: campaign_copy.tipo_de_campana.toLowerCase(),
      creation_place: contract_info_copy.lugar_de_creacion.toLowerCase(),
      creation_date: new Date(),
    };

    const created_contract = await store.add(contract_info);

    const contractNumber = created_contract.number;

    //PDF options
    const options = {
      format: 'A4',
      paginationOffset: 2,
      timeout: 30000,
      phantomPath: path.resolve(
        process.cwd(),
        'node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs'
      ),
      header: {
        height: '20mm',
        contents: `<div style="font-family: 'Open Sans', sans-serif; padding-right: 52px; padding-top: 10px; font-size: 12px; text-align: right;"><strong>No. Contrato: </strong>${contractNumber}<br><br><br></div>`,
      },
      footer: {
        height: '20mm',
      },
    };

    pdf
      .create(
        createPublicityContract(contractNumber, cliente, campana, contrato),
        options
      )
      .toBuffer((error, buffer) => {
        if (error) {
          throw new Error('[Client/contract controller]' + error);
        }
        fs.writeFile('contrato.pdf', buffer, function (error) {
          if (error) {
            console.error('[contract/controller, generateContract]', error);
          }
          console.log(
            '[contract/controller, generateContract] File created succesfully'
          );
        });
      });
  } catch (error) {
    throw new Error('[Client/contract controller]' + error);
  }
};

module.exports = { generateContract };
