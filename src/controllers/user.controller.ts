import { Request, Response } from "express";
import { pool } from "../db";

export const AddUserData = async (req: Request, res: Response) => {
    const { userId, firstName, lastName, gender, height, weight } = req.body;

    const result = await pool.query(
        "SELECT * FROM insert_user_data($1,$2,$3,$4,$5,$6)",
        [userId, firstName, lastName, gender, height, weight],
    );

    res.json({
        Message: "User data added successfully",
        data: {
            userId: result.rows[0].id,
            firstName,
            lastName,
            gender,
            height,
            weight,
        },
    });
};
