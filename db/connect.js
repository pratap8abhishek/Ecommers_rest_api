const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Ecommerse").then(()=>{
    console.log("DB is Connected and Created Now");
}).catch(()=>{
    console.log("DB is Not Connected");
})