const express = require("express");
require("./db/connect");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());




app.listen(port,()=>{
    console.log(`server is starting at ${port}`);
})

