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

router.post("/favorites", checkAuth, controllers.favorite.addFavoriteCharity);

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



router.post("/favorites", checkAuth, async (req, res) => {
  try {
    const { ein } = req.body;
    const { userid, isLoggedIn } = req.session;
    if (!ein) {
      return res.status(400).json({ error: "EIN field is required" });
    }
    const user = await User.findByIdAndUpdate(userid, { $pull: { favoriteCharities: ein } }, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "Charity removed from favorites successfully" });
  } catch (error) {
    console.error("Error removing charity from favorites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//i wanted to create a post request to remove charities by their id from the user's list of favorites but idk why it's not working

module.exports = router;

