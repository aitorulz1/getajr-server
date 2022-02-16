const Project = require("../models/project");
const { validationResult } = require("express-validator");

// Create Project

exports.crearProject = async(req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req); // req -> request para retornar si hay algún error y lo genera como un array
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    const {
        name,
        linkto,
        github,
        category,
        lenguage,
        techs,
        user,
        projectImage,
      } = req.body;
    
      try {
        const project = new Project(req.body);
        
        // Guardar el creador via JWT
        project.user = req.user.id
        // Guardar proyecto
        project.save();
        res.json(project);
        res.json(user);
        console.log(project);
      } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
      }
}
