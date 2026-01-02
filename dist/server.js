"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // MUST BE FIRST
const app_1 = __importDefault(require("./app"));
console.log("DATABASE_URL =", process.env.DATABASE_URL);
app_1.default.get("/health", (req, res) => {
    res.status(200).send("OK");
});
app_1.default.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
