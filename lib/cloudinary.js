require('dotenv').config();

var cloudinary = require('cloudinary');

cloudinary.uploader.upload("http://i179.photobucket.com/albums/w298/Brakjones/cat-watermelon-helmet-img129d.jpg", function(result) {
  console.log(result)
});
