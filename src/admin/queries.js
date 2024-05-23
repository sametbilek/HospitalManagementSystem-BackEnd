const getAdmin = "SELECT * FROM admin";
const getAdminById = "SELECT * FROM admin WHERE id = $1";
const addAdmin = "INSERT INTO admin (username,password) VALUES ($1, $2)";
const removeAdmin= "DELETE FROM admin WHERE id = $1";
const updateAdmin="UPDATE admin SET name = $1 WHERE id = $2";
const getAdminByUsernameAndPassword = "SELECT * FROM admin WHERE username = $1 AND password = $2";


module.exports ={
    getAdmin,
    getAdminById,
    addAdmin,
    removeAdmin,
    updateAdmin,
    getAdminByUsernameAndPassword
};