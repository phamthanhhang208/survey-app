if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const CronJob = require("cron").CronJob;
const formRoute = require("./router/form.router");
const cors = require("cors");
const questionRoute = require("./router/question.router");
const responseRoute = require("./router/response.router");
const deleteImages = require("./helper/schedule-clear-cloud");
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
app.use(cors());
app.options("*", cors());

//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/forms", formRoute);
app.use("/forms/:id/questions", questionRoute);
app.use("/forms/:id/responses", responseRoute);

// Remove unused images on cloud at 11:59 PM every day.
const job = new CronJob("59 23 * * * *", deleteImages, null, true, 0);

app.listen(port, () => {
	console.log("Serving on port", port);
});
