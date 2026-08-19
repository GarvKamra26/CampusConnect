const db = require("../config/db.js");

async function getMessages(req, res) {
    try {
        const {roomId} = req.params;

        const [messages] = await db.execute(
            `SELECT
                Messages.id,
                Messages.message,
                Messages.createdAt,
                Users.id AS userId,
                Users.name AS userName
             FROM Messages
             JOIN Users ON Messages.userId = Users.id
             WHERE Messages.roomId = ?
             ORDER BY Messages.createdAt ASC`,
             [roomId]
        );

        res.json(messages);
    } catch (error) {
        console.error("Error fetching messages", error);

        res.status(500).json({
            message: "Failed to get messages",
        });
    }
}

async function postMessages(req,res) {
    try {
        const {roomId} = req.params;
        const {message} = req.body;

        if (!message || message.trim() == "") {
            return res.status(400).json({
                message: "Message cannot be empty",
            });
        }

        const userId = req.user.userId;

        const [result] = await db.execute(
            `INSERT INTO Messages
            (roomId, userId, message)
            VALUES (?,?,?)`,
            [roomId, userId, message.trim()]
        );

        res.status(201).json({
            message: "Message sent",
            messageId: result.insertId
        });
    } catch (error) {
        console.error("Post message error: ", error);

        res.status(500).json({
            message: "Couldn't send message",
        });
    }
}

module.exports = {
    getMessages,
    postMessages
};