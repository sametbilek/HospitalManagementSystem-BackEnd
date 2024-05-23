const pool = require('../../db');
const queries = require('./queries');

const getPatients = (req, res)=> {
    pool.query(queries.getPatients, (error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getPatientById = (req,res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getPatientById,[id],(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });

};

const addPatient = (req, res) => {
    const { name, surname, dob, gender, adress, phonenumber } = req.body;

    pool.query(queries.addPatient,[name, surname, dob, gender, adress, phonenumber], (error,results)=>{
        if(error) throw error;
        res.status(201).send("Patient Created Successfully!");
    })
}
const removePatient = (req,res) =>{
    const id= parseInt(req.params.id);

    pool.query(queries.getPatientById, [id], (error, results)=>{
        const noPatientFound = !results.rows.length;
        if(noPatientFound){
            res.send("Patient does not exist in the database");
        }

        pool.query(queries.removePatient,[id],(error,results)=>{
            if(error) throw error;
            res.status(200).send("Patient removed successfully");
        })
    });
};

const updatePatient = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, surname, dob, gender, adress, phonenumber } = req.body;

    pool.query(queries.getPatientById, [id], (error, results) => {
        const noPatientFound = !results.rows.length;
        if (noPatientFound) {
            return res.send("Patient does not exist in the database");
        }

        pool.query(queries.updatePatient, [name, surname, dob, gender, adress, phonenumber, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Patient updated successfully");
        });
    });
};


module.exports = {
    getPatients,
    getPatientById,
    addPatient,
    removePatient,
    updatePatient,
};