import jwt from "jsonwebtoken";
import { pool } from "../db";

export const authMiddleware = async (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        const result = await pool.query(
            "SELECT id, email FROM users WHERE id = $1",
            [decoded.userId],
        );

        req.user = result.rows[0];
        next();
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
};
