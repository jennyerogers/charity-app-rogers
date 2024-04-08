//maybe put schema for bookmarks here?
const { Schema, model, models } = require("mongoose");
const bcrypt = require("bcrypt");
//so either under the schema, i could have a field for charities and that would nest the information with its own charity schema with charities [charity schema] 
//or if it was a seperate collection, it would be charities, then schema type, object ids...so either the charity objects themselves will be an array here, or an array of IDs of each charity object

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 20, //add charities field to link to either another schema for whatever infrmation you wanna save per charity or a list of IDs to link to each charity.
      //so either create a whole new charity model OR create just a schema and link the schema after password. examples of both in the m8 homework
      //m8 hw has tags (their own model) and posts (seperate collections i think)
    },
    charitySaved: [ { //do i need to include charitySaved somewhere else? //add charitySchema
      charityName: String, 
      url: String,
      city: String, 
//am i writing this right
    }]

  },
  {
    methods: {
      checkPassword(password) {
        return bcrypt.compare(password, this.password);
      },
    },
  }
);

// hashes the password before it's stored in mongo
UserSchema.pre("save", async function (next) {
  // the isNew check prevents mongoose from re-hashing the password when the user is updated for any reason
  if (this.isNew)
    this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = models.User || model("User", UserSchema);