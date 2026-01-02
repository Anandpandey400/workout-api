"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const register = async (req, res) => {
    const { email, password, name } = req.body;
    const hashed = await bcrypt_1.default.hash(password, 10);
    const result = await db_1.pool.query("SELECT register_user($1, $2, $3) AS id", [
        email,
        hashed,
        name,
    ]);
    res.json({ userId: result.rows[0].id, name: result.rows[0].name });
};
exports.register = register;
const login = async (req, res) => {
    console.log("LOGIN BODY:", req.body);
    const { email, password } = req.body;
    const result = await db_1.pool.query("SELECT * FROM get_user_by_email($1)", [
        email,
    ]);
    console.log("DB RESULT:", result.rows);
    if (result.rowCount === 0) {
        console.log("NO USER FOUND");
        return res.status(401).json({ error: "Invalid credentials" });
    }
    const user = result.rows[0];
    const valid = await bcrypt_1.default.compare(password, user.password);
    console.log("PASSWORD VALID:", valid);
    if (!valid)
        return res.status(401).json({ error: "Invalid credentials" });
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    console.log("JWT TOKEN:", token);
    res.json({ token });
};
exports.login = login;
