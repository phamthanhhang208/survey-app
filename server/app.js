const express = require("express");
const mongoose = require("mongoose");
let port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/survey-app", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const app = express();
app.use(express.json());

app.listen(port, () => {
	console.log("Serving on port 3000");
});
