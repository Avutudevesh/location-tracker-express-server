require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const bodyParser = require("body-parser");
const requireAuth = require("./middlewares/requireAuth");

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
	"mongodb+srv://deveshavutu:Devesh123@emaily-9mpn9.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
	console.log("Connected to mongoose");
});

mongoose.connection.on("error", (err) => {
	console.error(err);
});

app.get("/", requireAuth, (req, res) => {
	res.send(`Your email:` + req.user.email);
});
app.listen(3000, () => {
	console.log("Server started on port 3000");
});
