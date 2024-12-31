module.exports = (app) => {
    const gpservices = require("../controllers/gp.controller");
  
    var router = require("express").Router();
  
    // Create a new GP
   // router.post("/", gpservices.create);
  
    // Retrieve all GPs
    router.get("/", gpservices.findAll);
  
   // Retrieve a single GP with id
   router.get("/:id", gpservices.findOne);
  
    // Update a GP with id
    // router.put("/:id", gpservices.update);
  
    // // Delete a GP with id
    // router.delete("/:id", gpservices.delete);
  
    // // Delete all GPs
    // router.delete("/", gpservices.deleteAll);
  
    app.use('/api/gpservices', router);
  }