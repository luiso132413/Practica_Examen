module.exports = (sequelize, Sequelize) => {
    const InvoDetail = sequelize.define('invodeta', {
      id_factura: {
        type: Sequelize.NUMERIC,
        primaryKey: true
      },
      id_linea: {
        type: Sequelize.NUMERIC,
      },
      id_producto: {
        type: Sequelize.NUMERIC
      },
      cantidad: {
        type: Sequelize.NUMERIC
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      copyrightby: {
        type: Sequelize.STRING,
        defaultValue: 'UMG Antigua'
      }
    });
  
    return InvoDetail;
  }
  