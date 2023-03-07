const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth")

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use("/", authRouter)

const start = async () => {
	try {
		await mongoose.connect("mongodb+srv://Mykola:11october@cluster0.fk1ls.mongodb.net/?retryWrites=true&w=majority");
		app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
	} catch (err) {
		console.log(start);
	}
};

start();
