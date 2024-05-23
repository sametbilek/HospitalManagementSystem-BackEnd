const getPatients = "SELECT * FROM patients";
const getPatientById = "SELECT * FROM patients WHERE id = $1";
const addPatient = "INSERT INTO patients (name,surname,dob,gender,adress,phonenumber) VALUES ($1, $2, $3, $4, $5, $6)";
const removePatient= "DELETE FROM patients WHERE id = $1";
const updatePatient = "UPDATE patients SET name = $1, surname = $2, dob = $3, gender = $4, adress = $5, phonenumber = $6 WHERE id = $7";

module.exports ={
    getPatients,
    getPatientById,
    addPatient,
    removePatient,
    updatePatient,
};