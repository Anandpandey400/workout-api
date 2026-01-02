import dotenv from "dotenv";
dotenv.config(); // MUST BE FIRST

import app from "./app";
console.log("DATABASE_URL =", process.env.DATABASE_URL);

app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
