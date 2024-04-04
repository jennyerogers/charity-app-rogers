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

router.get("/search", async ({ session: { isLoggedIn }, query: {charity} }, res) => { //**I ADDED THIS */
  const charities= await controllers.charity.searchCharity (charity) //the variable "charity" is the data coming from that function
  res.render("index", { isLoggedIn, charities }); //need a templates page, make a new handlebar file and pass in the data
});

module.exports = router;
//this is for the handlebars template