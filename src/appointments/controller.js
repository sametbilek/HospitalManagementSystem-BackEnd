const Appointment = require('./model');
const queries = require('./queries');

const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.getAllAppointments();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getAppointmentById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const appointment = await Appointment.getAppointmentById(id);
        if (!appointment) {
            res.status(404).send('Appointment not found');
            return;
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createAppointment = async (req, res) => {
    try {
        const { patientId, doctorId, appointmentDate, appointmentTime } = req.body;
        const appointmentId = await Appointment.createAppointment(patientId, doctorId, appointmentDate, appointmentTime);
        res.status(201).json({ id: appointmentId, message: 'Appointment created successfully' });
    } catch (error) {
        if (error.code === '23505') { // PostgreSQL unique violation error code
            res.status(400).send('An appointment already exists for this doctor at the specified date and time.');
        } else {
            res.status(500).send(error.message);
        }
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await Appointment.deleteAppointment(id);
        res.status(200).send('Appointment deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateAppointment = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { patientId, doctorId, appointmentDate, appointmentTime } = req.body;
        await Appointment.updateAppointment(id, patientId, doctorId, appointmentDate, appointmentTime);
        res.status(200).send('Appointment updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAppointments,
    getAppointmentById,
    createAppointment,
    deleteAppointment,
    updateAppointment
};
