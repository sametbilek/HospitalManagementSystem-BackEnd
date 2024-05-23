const pool = require('../../db');
const queries = require('./queries');

const getAllAdmin = (req, res)=> {
    pool.query(queries.getAdmin, (error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};
const getAdmin = (req, res)=> {
    const { username, password } = req.body;
    console.log('username: ', username);
    console.log('passwordd: ', password);
    // Kullanıcı adı ve şifreyle veritabanından admini sorgulama
    pool.query(queries.getAdminByUsernameAndPassword, [username, password], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length > 0) {
            res.status(200).json(results.rows);
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
};

const getAdminById = (req,res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getDoctorById,[id],(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const addAdmin = (req, res) => {
    const { username, password} = req.body;

    pool.query(queries.addAdmin,[username, password], (error,results)=>{
        if(error) throw error;
        res.status(201).send("Admin Created Successfully!");
    })
}
const removeAdmin = (req,res) =>{
    const id= parseInt(req.params.id);

    pool.query(queries.getAdminById, [id], (error, results)=>{
        const noAdminFound = !results.rows.length;
        if(noAdminFound){
            res.send("Admin does not exist in the database");
        }

        pool.query(queries.removeAdmin,[id],(error,results)=>{
            if(error) throw error;
            res.status(200).send("Admin removed successfully");
        })
    });
};

const updateAdmin = (req,res)=>{
    const id = parseInt(req.params.id);
    const {username} = req.body;

    pool.query(queries.getDoctorById, [id], (error, results)=>{
        const noAdminFound = !results.rows.length;
        if(noAdminFound){
            res.send("Admin does not exist in the database");
        }

        pool.query(queries.updateDoctor,[username, id], (error, results)=>{
            if(error) throw error;
            res.status(200).send("Admin updated successfully");
        });
    });
};

module.exports = {
    getAdmin,
    getAdminById,
    addAdmin,
    removeAdmin,
    updateAdmin,
};