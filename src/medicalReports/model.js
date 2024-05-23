const pool = require('../../db');

class MedicalReport {
    constructor(id, patientId, doctorId, reportDate, reportContent) {
        this.id = id;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.reportDate = reportDate;
        this.reportContent = reportContent;
    }

    static async getAllReports() {
        const query = 'SELECT * FROM medical_reports';
        const { rows } = await pool.query(query);
        return rows.map(row => new MedicalReport(row.id, row.patient_id, row.doctor_id, row.report_date, row.report_content));
    }

    static async getReportById(id) {
        const query = 'SELECT * FROM medical_reports WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        if (rows.length === 0) return null;
        const { id: reportId, patient_id, doctor_id, report_date, report_content } = rows[0];
        return new MedicalReport(reportId, patient_id, doctor_id, report_date, report_content);
    }

    static async createReport(patientId, doctorId, reportDate, reportContent) {
        const query = 'INSERT INTO medical_reports (patient_id, doctor_id, report_date, report_content) VALUES ($1, $2, $3, $4) RETURNING id';
        const { rows } = await pool.query(query, [patientId, doctorId, reportDate, reportContent]);
        return rows[0].id;
    }

    static async deleteReport(id) {
        const query = 'DELETE FROM medical_reports WHERE id = $1';
        await pool.query(query, [id]);
    }

    static async updateReport(id, patientId, doctorId, reportDate, reportContent) {
        const query = 'UPDATE medical_reports SET patient_id = $2, doctor_id = $3, report_date = $4, report_content = $5 WHERE id = $1';
        await pool.query(query, [id, patientId, doctorId, reportDate, reportContent]);
    }
}

module.exports = MedicalReport;
