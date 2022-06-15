const express = require("express");
const app = express();
const jobs = require(`./routes/jobs`);
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/err-handler");
// middleware
app.use(express.static(`./public`));
app.use(express.json());

// routes
app.use("/api/v1/jobs", jobs);
app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, console.log(`Server is listening on port: ${port}`));
    } catch (err) {
        console.log(err);
    }
};
start();
