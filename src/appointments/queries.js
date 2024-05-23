const getAllAppointments = 'SELECT * FROM appointments';
const getAppointmentById = 'SELECT * FROM appointments WHERE id = $1';
const createAppointment = 'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time) VALUES ($1, $2, $3, $4) RETURNING id';
const deleteAppointment = 'DELETE FROM appointments WHERE id = $1';
const updateAppointment = 'UPDATE appointments SET patient_id = $2, doctor_id = $3, appointment_date = $4, appointment_time = $5 WHERE id = $1';

module.exports = {
    getAllAppointments,
    getAppointmentById,
    createAppointment,
    deleteAppointment,
    updateAppointment
};
