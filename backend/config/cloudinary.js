const cloudinary = require("cloudinary");

cloudinary.config({ 
    cloud_name: "dtfaeklpq", 
    api_key: "923487252345468", 
    api_secret: "42z9-T_6nfkg2L2frarB0utNFro"
    // cloud_name: process.env.CLOUD_NAME, 
    // api_key: process.env.CLOUD_KEY, 
    // api_secret: process.env.CLOUD_SECRET
});

module.exports = {cloudinary};