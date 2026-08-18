const db = require("../config/db.js");

async function getClubs(req, res) {
    try {
        const [clubs] = await db.execute(
           "SELECT * FROM Clubs ORDER BY createdAt DESC"
        );
        
         return res.json(clubs);
    } catch (error) {
        console.error("Get clubs error: ", error);
        return res.status(500).json({
            message: "Error getting clubs",
        });
    }

}

module.exports = getClubs;