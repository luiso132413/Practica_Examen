

const db = require('../config/db.config.js');
const Depart = db.Depart;

exports.create = (req, res) => {
    let depart = {};

    try{
        // Building Song object from upoading request's body
        depart.depart_id = req.body.depart_id;
        depart.description = req.body.description;
    
        // Save to MySQL database
        Depart.create(depart).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Song with id = " + result.id_d,
                customer: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllDepart = (req, res) => {
    // find all Customer information from 
    Depart.findAll()
        .then(departInfos => {
            res.status(200).json({
                message: "Get all Customers' Infos Successfully!",
                depart: departInfos
            });
        })
        . catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

exports.getDepartById = (req, res) => {
  // find all Customer information from 
  let departId = req.params.id_d;
  Depart.findByPk(departId)
      .then(depart => {
          res.status(200).json({
              message: " Successfully Get a Customer with id = " + departId,
              depart: depart
          });
      })
      . catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
      });
}
 

exports.updateById = async (req, res) => {
    try{
        let departId = req.params.id_d;
        let depart = await Depart.findByPk(departId);
    
        if(!depart){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a song with id = " + departId,
                depart: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                depart_id: req.body.depart_id,
                description: req.body.description,

            }
            let result = await Depart.update(updatedObject, {returning: true, where: {id_d: departId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a depart with id = " + req.params.id_d,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a depart with id = " + departId,
                depart: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a depart with id = " + req.params.id_d,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let departId = req.params.id_d;
        let depart = await Depart.findByPk(departId);

        if(!depart){
            res.status(404).json({
                message: "Does Not exist a Song with id = " + departId,
                error: "404",
            });
        } else {
            await depart.destroy();
            res.status(200).json({
                message: "Delete Successfully a Song with id = " + departId,
                depart: depart,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a song with id = " + req.params.id_d,
            error: error.message,
        });
    }
}