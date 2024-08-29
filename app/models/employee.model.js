module.exports = (sequelize, Sequelize) => {
	const Employee = sequelize.define('employee', {	
	  id_em: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  emp_id:{
		type: Sequelize.INTEGER,
	  },
	  fname:{
		type: Sequelize.STRING,
	  },
      sname:{
        type: Sequelize.STRING,
      },
      flastname:{
        type: Sequelize.STRING,
      },
      slastname: {
        type: Sequelize.STRING,
      },
      nit:{
        type: Sequelize.STRING,
      },
      salary: {
        type: Sequelize.NUMERIC
      },
      estatus:{
        type: Sequelize.NUMERIC
      },
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return Employee;
}