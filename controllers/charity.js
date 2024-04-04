const axios = require('axios');
//const { User } = require("../models");

//do i need to use fetch? what am i setting up wrong? is (charity) wrong? is my api key wrong?
async function searchCharity(charity) { 
  const apiKey = process.env.USER_KEY
  const url = `http://data.orghunter.com/v1/charitysearch?user_key=${apiKey}&searchTerm=${charity}`;
  //API SEARCH ENDPOINT: http://data.orghunter.com/v1/charitysearch 
  //REQUEST URL EXAMPLE: `http://data.orghunter.com/v1/charitysearch?user_key=84ab8e10d8b97314b613fc278e73ebc1&searchTerm=${charity}`; 
  //somewhere? i need to have "searchTerm"
  try {
    const response = await axios.get(url);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { searchCharity };
//crud notes: update doesn't pertain to updating the entire list, just the individual entry. adding a favorited charity/removing chairty/displaying
//adding a note/comment would satisfy update
//do crud in 
//controllers are like the logic of what needs to do what. processes request information to talk to the database to perform updates