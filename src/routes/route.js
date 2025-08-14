let express=require("express");
let imctrl=require("../controllers/imctrl.js");
let upload= require("../middleware/uploadmiddleware.js");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware.js");

let router= express.Router();

router.get("/", imctrl.homepage)
router.get("/login", imctrl.loginpage);
router.get("/register",imctrl.registerpage);
router.post("/saveReg",upload.single("profile"), imctrl.saveReg);
router.post("/validate",imctrl.validate);
router.get("/getLoginUserProfile", verifyToken, imctrl.getLoginUserProfile);
//router.get("/getLoginUserProfile",imctrl.getLoginUserProfile);
//router.get("/admindashboard",);

module.exports=router;


//route-controller-model;