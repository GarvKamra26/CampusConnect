const db = require('../config/db.js');

async function getProfile(req, res) {
    try {
        const userId = req.user.userId;

        const [users] = await db.execute(
            "SELECT id, name, email, branch, year, profilePic, createdAt FROM Users WHERE id = ?",
            [userId]
        );

        if (users.length == 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            user: users[0],
        });

    } catch (error) {
        console.error("Get profile error", error);

        return res.status(500).json({
            message: "Unable to get profile",
        });

    }
}

module.exports = getProfile;