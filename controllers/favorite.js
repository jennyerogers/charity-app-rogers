const { User, Charity }= require("../models");
async function addFavoriteCharity(req, res) {
    try {
      const { ein, charityName, donationUrl, city, state } = req.body;
      const {userid} = req.session
      const user = await User.findById(userid);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      let charity = await Charity.findOne({ein});
      if (!charity) {
        charity= await Charity.create({ ein, charityName, donationUrl, city, state })
      }
      if (user.favoriteCharities.includes(charity._id)){
        return res.status(400).json({ error: "Cannot duplicate charities" });
      }
      user.favoriteCharities.push(charity._id);
      await user.save();
      res.status(204).send();
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

async function removeFavoriteCharity(req, res) {
  try {
    const { ein } = req.body; 
    const {userid} =req.session;
    const user =await User.findById(userid);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await User.updateOne({ $pull: { favoriteCharities: { ein } } });
    res.status(204).send(); 
  } catch (err) {
    res.status(500).send(err.message); 
  }
}
//removes favorite charity, checks if user exits, removes charity by ein, send response
module.exports = {
  addFavoriteCharity,removeFavoriteCharity
};