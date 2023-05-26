const express = require("express");
const api = require("./routes/register-api.js");
const app = express();
const cors = require("cors");
const port = 9000;
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(api);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
