const {Router} = require('express');
const controller = require('./controller');


const router = Router();

//router.get("/", controller.getAdmin);
router.post("/", controller.getAdmin);
router.get("/:id",controller.getAdminById);
router.put("/:id",controller.updateAdmin);
router.delete("/:id",controller.removeAdmin);

module.exports = router; 