const pool = require('../../db');

class Appointment {
    constructor(id, patientId, doctorId, appointmentDate, appointmentTime) {
        this.id = id;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
    }

    static async getAllAppointments() {
        const query = 'SELECT * FROM appointments';
        const { rows } = await pool.query(query);
        return rows.map(row => new Appointment(row.id, row.patient_id, row.doctor_id, row.appointment_date, row.appointment_time));
    }

    static async getAppointmentById(id) {
        const query = 'SELECT * FROM appointments WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        if (rows.length === 0) return null;
        const { id: appointmentId, patient_id, doctor_id, appointment_date, appointment_time } = rows[0];
        return new Appointment(appointmentId, patient_id, doctor_id, appointment_date, appointment_time);
    }

    static async createAppointment(patientId, doctorId, appointmentDate, appointmentTime) {
        const query = 'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time) VALUES ($1, $2, $3, $4) RETURNING id';
        const { rows } = await pool.query(query, [patientId, doctorId, appointmentDate, appointmentTime]);
        return rows[0].id;
    }

    static async deleteAppointment(id) {
        const query = 'DELETE FROM appointments WHERE id = $1';
        await pool.query(query, [id]);
    }

    static async updateAppointment(id, patientId, doctorId, appointmentDate, appointmentTime) {
        const query = 'UPDATE appointments SET patient_id = $2, doctor_id = $3, appointment_date = $4, appointment_time = $5 WHERE id = $1';
        await pool.query(query, [id, patientId, doctorId, appointmentDate, appointmentTime]);
    }
}

module.exports = Appointment;
