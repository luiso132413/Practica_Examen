module.exports = (sequelize, Sequelize) => {
	const Product = sequelize.define('prod', {	
	  id_P: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  Pdescription:{
		type: Sequelize.STRING,
	  },
      Stock: {
        type: Sequelize.INTEGER,
      },
      MinStock: {
        type: Sequelize.INTEGER,
      },
      Pprice: {
        type: Sequelize.FLOAT,
      },
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return Product;
}