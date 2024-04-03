const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

router.get("/", ({ session: { isLoggedIn } }, res) => {
  res.render("index", { isLoggedIn });
});

router.get("/login", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("login", { error: req.query.error });
});

router.get("/signup", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("signup", { error: req.query.error });
});

router.get("/private", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("protected", { isLoggedIn });
});
//display search
// router.post("/search", controllers.charity.searchCharity);


router.get("/search", async ({ session: { isLoggedIn, }, query: {charity} }, res) => { //**I ADDED THIS */
  const charities= await controllers.charity.searchCharity (charity)
  res.render("index", { isLoggedIn, charities });
});

module.exports = router;
