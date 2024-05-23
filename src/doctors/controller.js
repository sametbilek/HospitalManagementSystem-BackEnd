const pool = require('../../db');
const queries = require('./queries');

const getDoctors = (req, res)=> {
    pool.query(queries.getDoctors, (error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getDoctorById = (req,res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getDoctorById,[id],(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });

};

const addDoctor = (req, res) => {
    const { name, surname, profession, workplace } = req.body;

    pool.query(queries.addDoctor,[name, surname, profession, workplace], (error,results)=>{
        if(error) throw error;
        res.status(201).send("Doctor Created Successfully!");
    })
}
const removeDoctor = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const { rows } = await pool.query(queries.getDoctorById, [id]);
        const noDoctorFound = !rows.length;
        if (noDoctorFound) {
            return res.status(404).send("Doctor does not exist in the database");
        }

        await pool.query(queries.removeDoctor, [id]);
        res.status(200).send("Doctor removed successfully");
    } catch (error) {
        if (error.code === '23503') { // Foreign key violation error code
            res.status(400).send("This doctor cannot be deleted because there are appointments linked to this doctor.");
        } else {
            res.status(500).send(error.message);
        }
    }
};

const updateDoctor = (req,res)=>{
    const id = parseInt(req.params.id);
    const {name,surname,workplace,profession} = req.body;

    pool.query(queries.getDoctorById, [id], (error, results)=>{
        const noDoctorFound = !results.rows.length;
        if(noDoctorFound){
        return res.send("Doctor does not exist in the database");
        }

        pool.query(queries.updateDoctor, [name, surname, workplace, profession, id], (error, results)=>{
            if(error) throw error;
            res.status(200).send("Doctor updated successfully");
        });
    });
};

module.exports = {
    getDoctors,
    getDoctorById,
    addDoctor,
    removeDoctor,
    updateDoctor,
};