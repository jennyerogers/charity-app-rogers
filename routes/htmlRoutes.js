const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");
const { User } = require("../models");

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

router.post("/favorites", checkAuth, controllers.favorite.addFavoriteCharity); //check this

router.get("/favorites", checkAuth, 
async (req, res) =>{
  const {userid, isLoggedIn } = req.session
  const user = await User.findById(userid).populate("favoriteCharities").lean()
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.render("favorite", { isLoggedIn, user})
}
);


router.post("/removeFavoriteCharity", checkAuth, controllers.favorite.removeFavoriteCharity);

module.exports = router;

//When you "add to favorites" you should be using a POST method from your HTML form, 
//and then in the Express route you can use res.redirect("/favorites") 
//to send the user to a different GET route to reload the HTML -->
