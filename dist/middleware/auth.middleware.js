"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token)
        return res.status(401).json({ error: "Unauthorized" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const result = await db_1.pool.query("SELECT id, email FROM users WHERE id = $1", [decoded.userId]);
        req.user = result.rows[0];
        next();
    }
    catch {
        res.status(401).json({ error: "Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
