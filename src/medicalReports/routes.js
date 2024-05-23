const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getReports);
router.post('/', controller.createReport);
router.get('/:id', controller.getReportById);
router.put('/:id', controller.updateReport);
router.delete('/:id', controller.deleteReport);

module.exports = router;
