const express = require("express");
const mongoose = require("mongoose");
const route = require("./router/form.router");
let port = process.env.PORT || 8080;

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

app.use("/", route);

app.listen(port, () => {
	console.log("Serving on port", port);
});
