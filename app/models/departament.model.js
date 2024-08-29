
module.exports = (sequelize, Sequelize) => {
	const Depart = sequelize.define('depart', {	
	  id_d: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  depart_id:{
		type: Sequelize.INTEGER,
	  },
	  description:{
		type: Sequelize.STRING,
	  },
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return Depart;
}