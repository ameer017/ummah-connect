require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const exphbs = require('express-handlebars');
const connectDB = require("./config/DBConnect");
const webhookRoute = require("./routes/webhookRoute");
const path = require('path');
const CertEventsController = require("./controllers/contractEventsController");

const app = express();

// Configure CORS
app.use(cors({
	origin: [
		"http://localhost:5173",
		"https://console.cloudinary.com",
		"https://api.cloudinary.com",
		"https://ummah-connect.vercel.app",
		"https://checkout-v3-ui-prod.f4b-flutterwave.com",
		"https://flw-events-ge.myflutterwave.com/event/create",
		"https:pexels.com"

	],
	credentials: true,
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	optionSuccessStatus: 200,
}));

// Stripe webhook parsing middleware
app.use((req, res, next) => {
	if (req.originalUrl === "/api/webhook") {
		express.raw({ type: "application/json" })(req, res, next);
	} else {
		express.json()(req, res, next);
	}
});

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(cookieParser());

// Set Handlebars as the view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.create().engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
	res.send("UmmahConnect Page");
});

// Define routes
app.use("/auth", require("./routes/authRoute"));
app.use("/content", require("./routes/contentRoute"));
app.use("/certificates", require("./routes/certificateRoute"));
app.use("/api", webhookRoute);
app.use("/discussion", require("./routes/forumRoute"));
app.use("/events", require("./routes/eventRoute"));
app.use("/mentorship", require("./routes/mentorship"));
app.use("/subscribe", require("./routes/subscriptionRoute"));
app.use("/courses", require("./routes/courseRoute"));
app.use("/payments", require("./routes/paymentRoute"));
// app.use("/enrollments", require("./routes/enrollmentRoute"));
// app.use("/progress", require("./routes/progressRoute"));
app.use("/webinars", require("./routes/webinarRoute"));

CertEventsController.initializeWebSocket()

// Connect to the database and start the server
const PORT = process.env.PORT || 5000;
connectDB();
mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
	app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
});
