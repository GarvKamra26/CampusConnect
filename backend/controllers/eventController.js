const db = require("../config/db.js");

async function getEvents(req, res) {
    try {
        const [events] = await db.execute(
           "SELECT * FROM Events ORDER BY eventDate ASC"
        );
        
         return res.json(events);
    } catch (error) {
        console.error("Get events error: ", error);
        return res.status(500).json({
            message: "Error getting events",
        });
    }

}

module.exports = getEvents;