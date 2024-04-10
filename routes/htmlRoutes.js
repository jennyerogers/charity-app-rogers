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
//maybe add /favorites
router.get("/private", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("protected", { isLoggedIn });
});
//display search

router.get("/search", checkAuth, async ({ session: { isLoggedIn }, query: { charity } }, res) => {
  try {
    const charitiesData = await controllers.charity.searchCharity(charity);
    const charities = [];

    charitiesData.data.forEach(charityObject => {
      charities.push({
        charityName: charityObject.charityName,
        ein: charityObject.ein,
        url: charityObject.url,
        donationUrl: charityObject.donationUrl,
        city: charityObject.city,
        state: charityObject.state,
        category: charityObject.category,
        data: JSON.stringify(charityObject)
      });
    });

    res.render("index", { isLoggedIn, charities });
  } catch (error) {
    console.error("error in rendering search page:", error);
    res.status(500).send("server error");
  }
});

router.post("/addFavoriteCharity", checkAuth, controllers.favorite.addFavoriteCharity);

router.post("/removeFavoriteCharity", checkAuth, controllers.favorite.removeFavoriteCharity)


module.exports = router;

