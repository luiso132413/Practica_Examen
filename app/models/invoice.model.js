module.exports = (sequelize, Sequelize) => {
	const Invoice = sequelize.define('invoice', {	
	  id_In: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  No_In:{
        //numero de la factura
		type: Sequelize.INTEGER,
	  },
	  serilanum:{
        //numero de seria de la factura
		type: Sequelize.STRING,
	  },
      In_date:{
        //fecha de la factura
        type: Sequelize.DATE,
      },
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return Invoice;
}