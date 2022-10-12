const store = require('./store');

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

  const contract_info = {
    client_name: cliente.nombre.toLowerCase(),
    client_type: cliente.tipo.toLowerCase(),
    client_DNI: cliente.dni.toLowerCase(),
    company: cliente.empresa_representada.toLowerCase(),
    campaign_type: campana.tipo_de_campana.toLowerCase(),
    creation_place: contrato.lugar_de_creacion.toLowerCase(),
    creation_date: new Date(),
  };

  const created_contract = await store.add(contract_info);
};

module.exports = { generateContract };
