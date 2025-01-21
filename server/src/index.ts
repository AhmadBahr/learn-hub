import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import * as dynamoose from "dynamoose";

/* Route Imports */

/* Configurations */
dotenv.config();
const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
    dynamoose.aws.ddb.local();
}

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Routes */
app.get("/", (req, res) => {
    res.send("Hello World!");
});

/* Start Server */
const port = process.env.PORT || 3000;
if (!isProduction) {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
};