/**
 * Author : Karnasinh Gohil
 */

//This is global configuration objerct where all details stored as in key-value pair.
const configurations = {
  //This is connection string.
  db: "mongodb+srv://mongodb01:Mamak%40281129@cluster0.6mm8hsh.mongodb.net/library",
  //This nested object contains github login information.
  //You can get this details from github developer's settings.
  github: {
    clientId: "bb778f386d6d3ceaba88",
    clientSecret: "56b8674aec75418a07f0ed002fe25d8cd2716730",
    callbackUrl:
      "http://localhost:3000/https://knowledgecitylibrary.herokuapp.com//github/callback",
  },
};

//Exporting module.
module.exports = configurations;
