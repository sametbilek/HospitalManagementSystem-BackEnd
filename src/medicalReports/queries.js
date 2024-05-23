const getAllReports = 'SELECT * FROM medical_reports';
const getReportById = 'SELECT * FROM medical_reports WHERE id = $1';
const createReport = 'INSERT INTO medical_reports (patient_id, doctor_id, report_date, report_content) VALUES ($1, $2, $3, $4) RETURNING id';
const deleteReport = 'DELETE FROM medical_reports WHERE id = $1';
const updateReport = 'UPDATE medical_reports SET patient_id = $2, doctor_id = $3, report_date = $4, report_content = $5 WHERE id = $1';

module.exports = {
    getAllReports,
    getReportById,
    createReport,
    deleteReport,
    updateReport
};
