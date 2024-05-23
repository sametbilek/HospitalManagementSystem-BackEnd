const getDoctors = "SELECT * FROM doctors";
const getDoctorById = "SELECT * FROM doctors WHERE id = $1";
const addDoctor = "INSERT INTO doctors (name,surname,profession,workplace) VALUES ($1, $2, $3, $4)";
const removeDoctor= "DELETE FROM doctors WHERE id = $1";
const updateDoctor="UPDATE doctors SET name = $1, surname = $2, workplace = $3, profession = $4 WHERE id = $5";

module.exports ={
    getDoctors,
    getDoctorById,
    addDoctor,
    removeDoctor,
    updateDoctor,
};