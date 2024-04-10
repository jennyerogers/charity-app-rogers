const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

// admin login/logout
router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);


module.exports = router;
//routes handles all the available pages and all the different paths we can go to. but they need to be declared
//all the logic in m3 in the city search data happened inside the route handler. mvc apps pulls out the operations and puts them in their respective spots