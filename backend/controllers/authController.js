const db = require("../config/db.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function signup(req , res) {
    try {
        const {name, email, password, branch, year} = req.body;

        if (!name || !email || !password || !branch || !year ) {
            return res.status(400).json({
                message: "All fields are required",
            })
        };

        const userYear = Number(year);
        const normalizedEmail = email.trim().toLowerCase();



        if (password.length < 8) {
            return res.status(400).json({
                message: "password must be atleast 8 digit long",
            })
        };

        if (!Number.isInteger(userYear) || userYear < 1 || userYear > 4) {
            return res.status(400).json({
                message: "Year should be between 1 and 4",
            })
        };

        const [existingUsers] = await db.execute(
            "SELECT id FROM Users WHERE email = ?", [normalizedEmail]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({
                message: "An account already exists with this email",
            })
        };

        const passwordHash = await bcrypt.hash(password, 12);

        const [result] = await db.execute(
        "INSERT INTO Users (name, email, passwordHash, branch, year) VALUES (?, ?, ?, ?, ?)",
        [name.trim(), normalizedEmail, passwordHash, branch.trim(), userYear]
      );

      res.status(201).json({
        message: "Account created successfully.",
        user: {
          id: result.insertId,
          name: name.trim(),
          email: normalizedEmail,
          branch: branch.trim(),
          year: userYear,
        },
      });
       
    } catch (error) {
        console.error("Signup error: ", error);

        res.status(500).json({
            message: "Unable to create account",
        })
    }
}

async function login(req, res) {
    try {
        const {email , password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter all fields",
            })
        }

        const normalizedEmail = email.trim().toLowerCase();
        const [userDet] = await db.execute(
            "SELECT * FROM Users WHERE email = ?", [normalizedEmail] 
        )

       if (userDet.length == 0) {
            return res.status(401).json({
                message: "Wrong password or email",
            })
        }

        const isMatch = await bcrypt.compare(password, userDet[0].passwordHash);

        if (isMatch) {
            const token = jwt.sign(
                {userId: userDet[0].id},
                process.env.JWT_SECRET,
                {expiresIn: "7d"}
            )

            return res.status(200).json({
                "message": "Logged in successfully",
                "token": token
            })
        }
        else {
            return res.status(401).json({
                message: "Wrong password or email",
            })
        }
    } catch (error) {
        console.error("Login error: ", error);

        return res.status(500).json({
            message: "unable to login",
        })
    }
}

module.exports = {
    signup,
    login
};
