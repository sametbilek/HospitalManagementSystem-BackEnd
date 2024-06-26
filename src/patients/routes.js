const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get("/", controller.getPatients);
router.post("/", controller.addPatient);
router.get("/:id",controller.getPatientById);
router.put("/:id",controller.updatePatient);
router.delete("/:id",controller.removePatient);


module.exports = router; 