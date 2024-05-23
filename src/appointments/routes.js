const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getAppointments);
router.post('/', controller.createAppointment);
router.get('/:id', controller.getAppointmentById);
router.put('/:id', controller.updateAppointment);
router.delete('/:id', controller.deleteAppointment);

module.exports = router;
