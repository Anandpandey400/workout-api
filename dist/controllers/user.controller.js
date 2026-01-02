"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserData = void 0;
const db_1 = require("../db");
const AddUserData = async (req, res) => {
    const { userId, firstName, lastName, gender, height, weight } = req.body;
    const result = await db_1.pool.query("SELECT * FROM insert_user_data($1,$2,$3,$4,$5,$6)", [userId, firstName, lastName, gender, height, weight]);
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
exports.AddUserData = AddUserData;
