const MedicalReport = require('./model');
const queries = require('./queries');

const getReports = async (req, res) => {
    try {
        const reports = await MedicalReport.getAllReports();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getReportById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const report = await MedicalReport.getReportById(id);
        if (!report) {
            res.status(404).send('Medical report not found');
            return;
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createReport = async (req, res) => {
    try {
        const { patientId, doctorId, reportDate, reportContent } = req.body;
        const reportId = await MedicalReport.createReport(patientId, doctorId, reportDate, reportContent);
        res.status(201).json({ id: reportId, message: 'Medical report created successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteReport = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await MedicalReport.deleteReport(id);
        res.status(200).send('Medical report deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateReport = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { patientId, doctorId, reportDate, reportContent } = req.body;
        await MedicalReport.updateReport(id, patientId, doctorId, reportDate, reportContent);
        res.status(200).send('Medical report updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getReports,
    getReportById,
    createReport,
    deleteReport,
    updateReport
};
