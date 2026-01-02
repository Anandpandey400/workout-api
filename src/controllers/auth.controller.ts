import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db";

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query("SELECT register_user($1, $2) AS id", [
        email,
        hashed,
    ]);

    res.json({ userId: result.rows[0].id });
};

export const login = async (req: Request, res: Response) => {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM get_user_by_email($1)", [
        email,
    ]);

    console.log("DB RESULT:", result.rows);

    if (result.rowCount === 0) {
        console.log("NO USER FOUND");
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password);
    console.log("PASSWORD VALID:", valid);

    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
    });

    console.log("JWT TOKEN:", token);

    res.json({ token });
};
