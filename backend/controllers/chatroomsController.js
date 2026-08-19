const db = require("../config/db.js");

async function getChatrooms(req, res) {
    try {
        const [chatrooms] = await db.execute(
           "SELECT * FROM Chatrooms ORDER BY type, block, floor"
        );
        
         return res.json(chatrooms);
    } catch (error) {
        console.error("Get chatrooms error: ", error);
        return res.status(500).json({
            message: "Error getting chatrooms",
        });
    }

}

module.exports = getChatrooms;