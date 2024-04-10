const { Schema, model, models } = require("mongoose");
const bcrypt = require("bcrypt");

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
      maxLength: 20, 
    },
    favoriteCharities: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Charities'
      }
    ]
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
//so either under the schema, i could have a field for charities and that would nest the information with its own charity schema with charities [charity schema] 
//or if it was a seperate collection, it would be charities, then schema type, object ids...so either the charity objects themselves will be an array here, or an array of IDs of each charity object

//add charities field to link to either another schema for whatever infrmation you wanna save per charity or a list of IDs to link to each charity.
//so either create a whole new charity model OR create just a schema and link the schema after password. examples of both in the m8 homework
 //take the variable and put it inside charity saved: charitySaved
 
//make your own id and nest the schema
//if i were to nest the data, i would have a charity model nested under user to find the user and use find.update... OR find the user and do the javascript that says user.charities.addtoset (example) push
